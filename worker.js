const corsHeaders = {
  "Access-Control-Allow-Origin": "https://basseraphael62000-oss.github.io",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...corsHeaders
    }
  });
}

// Génération du site HTML
function generateSiteHTML(site) {
  const servicesHTML = site.services
    .map(service => {
      const name =
        typeof service === "object"
          ? service.name || ""
          : service;

      const price =
        typeof service === "object"
          ? service.price || ""
          : "";

      return `
        <li>
          <strong>${name}</strong>
          ${price ? ` — ${price} €` : ""}
        </li>
      `;
    })
    .join("");

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>${site.businessName} - ${site.city}</title>

  <style>
    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      font-family: Arial, sans-serif;
      background: #f7f7f7;
      color: #222;
    }

    header {
      background: #111;
      color: white;
      padding: 70px 20px;
      text-align: center;
    }

    header h1 {
      margin: 0 0 15px;
      font-size: 42px;
    }

    header p {
      font-size: 20px;
      opacity: 0.85;
    }

    section {
      max-width: 900px;
      margin: 40px auto;
      padding: 30px 20px;
      background: white;
      border-radius: 16px;
    }

    h2 {
      margin-top: 0;
    }

    ul {
      padding-left: 20px;
    }

    li {
      margin: 15px 0;
    }

    .contact {
      text-align: center;
    }

    .contact a {
      display: inline-block;
      margin: 8px;
      padding: 12px 20px;
      background: #111;
      color: white;
      text-decoration: none;
      border-radius: 8px;
    }

    footer {
      text-align: center;
      padding: 30px;
      color: #777;
    }
  </style>
</head>

<body>

  <header>
    <h1>${site.businessName}</h1>

    <p>
      ${site.activity || "Bienvenue sur notre site"}
      · ${site.city}
    </p>
  </header>

  <section>
    <h2>Nos prestations</h2>

    <ul>
      ${servicesHTML}
    </ul>
  </section>

  <section>
    <h2>À propos</h2>

    <p>
      Bienvenue chez ${site.businessName}.
      Retrouvez-nous à ${site.city}.
    </p>
  </section>

  <section class="contact">

    <h2>Contact</h2>

    ${
      site.phone
        ? `<a href="tel:${site.phone}">
             📞 ${site.phone}
           </a>`
        : ""
    }

    ${
      site.email
        ? `<a href="mailto:${site.email}">
             ✉️ ${site.email}
           </a>`
        : ""
    }

    <p>
      ${site.address || site.city}
    </p>

  </section>

  <footer>
    Créé avec SiteFacile
  </footer>

</body>
</html>`;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // CORS
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders
      });
    }

    // Test de l'API
    if (url.pathname === "/api/test") {
      return new Response("API SiteFacile OK", {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          ...corsHeaders
        }
      });
    }

    // Création du site
    if (url.pathname === "/api/create-site") {

      if (request.method !== "POST") {
        return jsonResponse(
          {
            success: false,
            error: "Méthode POST requise"
          },
          405
        );
      }

      try {
        const data = await request.json();

        const businessName = data.businessName?.trim();
        const city = data.city?.trim();

        const services = Array.isArray(data.services)
          ? data.services
          : [];

        // Vérification des champs obligatoires
        if (!businessName || !city || services.length === 0) {
          return jsonResponse(
            {
              success: false,
              error:
                "Le nom de l'entreprise, la ville et au moins une prestation sont obligatoires."
            },
            400
          );
        }

        // Création de l'identifiant
        const siteId =
          businessName
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "") +
          "-" +
          Date.now();

        // Données du site
        const siteData = {
          id: siteId,
          businessName,
          city,
          services,
          activity: data.activity || "",
          address: data.address || "",
          phone: data.phone || "",
          email: data.email || "",
          social: data.social || "",
          style: data.style || "",
          images: data.images || [],
          createdAt: new Date().toISOString()
        };

        // Enregistrement JSON dans R2
        await env.SITE_STORAGE.put(
          `sites/${siteId}.json`,
          JSON.stringify(siteData, null, 2),
          {
            httpMetadata: {
              contentType: "application/json"
            }
          }
        );

        // Génération du site HTML
        const siteHTML = generateSiteHTML(siteData);

        // Enregistrement du HTML dans R2
        await env.SITE_STORAGE.put(
          `sites/${siteId}/index.html`,
          siteHTML,
          {
            httpMetadata: {
              contentType: "text/html; charset=utf-8"
            }
          }
        );

        // Réponse
        return jsonResponse({
          success: true,
          message: "Site enregistré avec succès dans SiteFacile",
          site: siteData,
          url: `/site/${siteId}`
        });

      } catch (error) {

        console.error(
          "Erreur création site :",
          error
        );

        return jsonResponse(
          {
            success: false,
            error:
              error.message ||
              "Impossible d'enregistrer le site."
          },
          500
        );
      }
    }

    // Affichage d'un site généré depuis R2
    if (url.pathname.startsWith("/site/")) {

      const sitePath =
        url.pathname
          .replace("/site/", "")
          .replace(/\/$/, "");

      if (!sitePath) {
        return new Response(
          "Identifiant du site manquant",
          {
            status: 400,
            headers: corsHeaders
          }
        );
      }

      const object =
        await env.SITE_STORAGE.get(
          `sites/${sitePath}/index.html`
        );

      if (!object) {
        return new Response(
          "Site introuvable",
          {
            status: 404,
            headers: corsHeaders
          }
        );
      }

      return new Response(
        object.body,
        {
          headers: {
            "Content-Type":
              "text/html; charset=utf-8",
            ...corsHeaders
          }
        }
      );
    }

    // Les autres requêtes continuent vers les fichiers du site
    return env.ASSETS.fetch(request);
  }
};
