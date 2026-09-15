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

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Autoriser les requêtes CORS du site GitHub Pages
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

    // Création de site
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

        // Création d'un identifiant simple pour le site
        const siteId =
          businessName
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "") +
          "-" +
          Date.now();

        // Données du site à sauvegarder
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

        // Enregistrement dans R2
        await env.SITE_STORAGE.put(
          `sites/${siteId}.json`,
          JSON.stringify(siteData, null, 2),
          {
            httpMetadata: {
              contentType: "application/json"
            }
          }
        );

        return jsonResponse({
          success: true,
          message: "Site enregistré avec succès dans SiteFacile",
          site: siteData
        });
      } catch (error) {
        console.error("Erreur création site :", error);

        return jsonResponse(
          {
            success: false,
            error: "Impossible d'enregistrer le site."
          },
          500
        );
      }
    }

    // Les autres requêtes continuent vers les fichiers du site
    return env.ASSETS.fetch(request);
  }
};
