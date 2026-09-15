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

// Protection des contenus affichés dans le HTML
function escapeHTML(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Génération du site HTML
function generateSiteHTML(site) {

  const businessName = escapeHTML(site.businessName);
  const city = escapeHTML(site.city);
  const activity = escapeHTML(
    site.activity || "Bienvenue"
  );

  const address = escapeHTML(
    site.address || site.city
  );

  const phone = escapeHTML(site.phone);
  const email = escapeHTML(site.email);

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
        <article class="service-card">

          <div class="service-content">

            <h3>
              ${escapeHTML(name)}
            </h3>

            ${
              price
                ? `
                  <span class="service-price">
                    ${escapeHTML(price)} €
                  </span>
                `
                : ""
            }

          </div>

        </article>
      `;
    })
    .join("");

  return `<!DOCTYPE html>

<html lang="fr">

<head>

  <meta charset="UTF-8">

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  >

  <meta
    name="description"
    content="${businessName} à ${city}"
  >

  <title>
    ${businessName} - ${city}
  </title>

  <style>

    * {
      box-sizing: border-box;
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      margin: 0;
      font-family:
        Inter,
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        Arial,
        sans-serif;

      background: #f7f7f8;
      color: #171717;

      line-height: 1.6;
    }

    /* =========================
       NAVIGATION
    ========================= */

    nav {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;

      padding: 22px 30px;

      display: flex;
      justify-content: space-between;
      align-items: center;

      z-index: 10;
    }

    .logo {
      color: white;
      text-decoration: none;

      font-size: 20px;
      font-weight: 700;

      letter-spacing: -0.5px;
    }

    .nav-button {
      color: white;
      text-decoration: none;

      padding: 9px 17px;

      border: 1px solid rgba(255,255,255,0.35);

      border-radius: 999px;

      font-size: 14px;

      transition: 0.2s;
    }

    .nav-button:hover {
      background: white;
      color: #111;
    }

    /* =========================
       HERO
    ========================= */

    header {
      min-height: 82vh;

      display: flex;
      align-items: center;
      justify-content: center;

      text-align: center;

      padding: 100px 20px 80px;

      color: white;

      background:
        radial-gradient(
          circle at top left,
          #3b3b3b,
          #111 55%
        );

      position: relative;

      overflow: hidden;
    }

    header::after {
      content: "";

      position: absolute;

      width: 500px;
      height: 500px;

      border-radius: 50%;

      background: rgba(255,255,255,0.04);

      right: -180px;
      bottom: -220px;
    }

    .hero {
      max-width: 850px;

      position: relative;
      z-index: 2;
    }

    .hero-label {
      display: inline-block;

      margin-bottom: 22px;

      padding: 7px 15px;

      border-radius: 999px;

      background: rgba(255,255,255,0.1);

      border: 1px solid rgba(255,255,255,0.15);

      font-size: 13px;

      text-transform: uppercase;

      letter-spacing: 2px;

      opacity: 0.9;
    }

    .hero h1 {
      margin: 0;

      font-size: clamp(
        45px,
        9vw,
        88px
      );

      line-height: 0.98;

      letter-spacing: -4px;

      font-weight: 800;
    }

    .hero-location {
      margin: 25px 0 0;

      font-size: 20px;

      color: rgba(255,255,255,0.75);
    }

    .hero-button {
      display: inline-flex;

      align-items: center;
      justify-content: center;

      margin-top: 38px;

      padding: 15px 25px;

      border-radius: 999px;

      background: white;

      color: #111;

      text-decoration: none;

      font-weight: 700;

      transition:
        transform 0.2s,
        box-shadow 0.2s;
    }

    .hero-button:hover {
      transform: translateY(-3px);

      box-shadow:
        0 10px 30px
        rgba(0,0,0,0.25);
    }

    /* =========================
       CONTENU
    ========================= */

    main {
      max-width: 1100px;

      margin: 0 auto;

      padding: 90px 20px;
    }

    section {
      margin-bottom: 90px;
    }

    .section-header {
      margin-bottom: 35px;
    }

    .section-label {
      display: block;

      margin-bottom: 8px;

      font-size: 13px;

      text-transform: uppercase;

      letter-spacing: 2px;

      color: #777;

      font-weight: 700;
    }

    .section-header h2 {
      margin: 0;

      font-size: 38px;

      line-height: 1.1;

      letter-spacing: -1.5px;
    }

    .section-header p {
      margin: 12px 0 0;

      color: #777;

      font-size: 17px;
    }

    /* =========================
       SERVICES
    ========================= */

    .services {
      display: grid;

      grid-template-columns:
        repeat(
          auto-fit,
          minmax(260px, 1fr)
        );

      gap: 20px;
    }

    .service-card {
      background: white;

      border: 1px solid #e8e8e8;

      border-radius: 20px;

      padding: 28px;

      min-height: 130px;

      display: flex;

      align-items: center;

      transition:
        transform 0.2s,
        box-shadow 0.2s;
    }

    .service-card:hover {
      transform: translateY(-5px);

      box-shadow:
        0 15px 40px
        rgba(0,0,0,0.08);
    }

    .service-content {
      width: 100%;

      display: flex;

      align-items: center;

      justify-content: space-between;

      gap: 20px;
    }

    .service-card h3 {
      margin: 0;

      font-size: 19px;

      font-weight: 700;
    }

    .service-price {
      white-space: nowrap;

      font-weight: 700;

      font-size: 18px;
    }

    /* =========================
       ABOUT
    ========================= */

    .about {
      background: white;

      border: 1px solid #e8e8e8;

      border-radius: 24px;

      padding: 45px;

      font-size: 18px;

      color: #555;
    }

    .about strong {
      color: #111;
    }

    /* =========================
       CONTACT
    ========================= */

    .contact {
      position: relative;

      overflow: hidden;

      background: #111;

      color: white;

      border-radius: 28px;

      padding: 65px 35px;

      text-align: center;
    }

    .contact::before {
      content: "";

      position: absolute;

      width: 300px;
      height: 300px;

      border-radius: 50%;

      background: rgba(255,255,255,0.05);

      top: -150px;
      right: -100px;
    }

    .contact-content {
      position: relative;
      z-index: 2;
    }

    .contact h2 {
      margin: 0;

      font-size: 40px;

      letter-spacing: -1px;
    }

    .contact-subtitle {
      margin: 12px 0 30px;

      color: rgba(255,255,255,0.65);

      font-size: 17px;
    }

    .contact-buttons {
      display: flex;

      flex-wrap: wrap;

      justify-content: center;

      gap: 10px;
    }

    .contact-button {
      display: inline-flex;

      align-items: center;
      justify-content: center;

      padding: 14px 22px;

      border-radius: 999px;

      background: white;

      color: #111;

      text-decoration: none;

      font-weight: 700;

      transition: 0.2s;
    }

    .contact-button:hover {
      transform: translateY(-3px);

      box-shadow:
        0 10px 25px
        rgba(0,0,0,0.3);
    }

    .contact-address {
      margin-top: 28px;

      color: rgba(255,255,255,0.55);

      font-size: 15px;
    }

    /* =========================
       FOOTER
    ========================= */

    footer {
      text-align: center;

      padding: 35px 20px;

      color: #888;

      font-size: 14px;
    }

    footer strong {
      color: #555;
    }

    /* =========================
       MOBILE
    ========================= */

    @media (max-width: 700px) {

      nav {
        padding: 18px 18px;
      }

      .nav-button {
        display: none;
      }

      header {
        min-height: 75vh;

        padding: 90px 20px 60px;
      }

      .hero h1 {
        letter-spacing: -2px;
      }

      .hero-location {
        font-size: 17px;
      }

      main {
        padding: 60px 15px;
      }

      section {
        margin-bottom: 65px;
      }

      .section-header h2 {
        font-size: 30px;
      }

      .service-content {
        align-items: flex-start;

        flex-direction: column;

        gap: 12px;
      }

      .about {
        padding: 28px;

        font-size: 16px;
      }

      .contact {
        padding: 45px 20px;
      }

      .contact h2 {
        font-size: 31px;
      }

      .contact-button {
        width: 100%;
      }
    }

  </style>

</head>

<body>

  <!-- NAVIGATION -->

  <nav>

    <a
      class="logo"
      href="#"
    >
      ${businessName}
    </a>

    <a
      class="nav-button"
      href="#contact"
    >
      Contact
    </a>

  </nav>


  <!-- HERO -->

  <header>

    <div class="hero">

      <span class="hero-label">
        ${activity}
      </span>

      <h1>
        ${businessName}
      </h1>

      <p class="hero-location">
        📍 ${city}
      </p>

      <a
        class="hero-button"
        href="#prestations"
      >
        Découvrir nos prestations
      </a>

    </div>

  </header>


  <!-- CONTENU -->

  <main>

    <!-- SERVICES -->

    <section id="prestations">

      <div class="section-header">

        <span class="section-label">
          Nos services
        </span>

        <h2>
          Des prestations adaptées à vos besoins
        </h2>

        <p>
          Découvrez nos services et nos tarifs.
        </p>

      </div>

      <div class="services">

        ${servicesHTML}

      </div>

    </section>


    <!-- À PROPOS -->

    <section>

      <div class="section-header">

        <span class="section-label">
          À propos
        </span>

        <h2>
          Bienvenue chez ${businessName}
        </h2>

      </div>

      <div class="about">

        <p>
          Nous vous accueillons à
          <strong>${city}</strong>
          et nous mettons notre savoir-faire
          à votre service.
        </p>

      </div>

    </section>


    <!-- CONTACT -->

    <section id="contact">

      <div class="contact">

        <div class="contact-content">

          <h2>
            Parlons de votre projet
          </h2>

          <p class="contact-subtitle">
            Une question ? Contactez-nous directement.
          </p>

          <div class="contact-buttons">

            ${
              site.phone
                ? `
                  <a
                    class="contact-button"
                    href="tel:${phone}"
                  >
                    📞 Appeler
                  </a>
                `
                : ""
            }

            ${
              site.email
                ? `
                  <a
                    class="contact-button"
                    href="mailto:${email}"
                  >
                    ✉️ Envoyer un email
                  </a>
                `
                : ""
            }

          </div>

          <p class="contact-address">
            📍 ${address}
          </p>

        </div>

      </div>

    </section>

  </main>


  <!-- FOOTER -->

  <footer>

    Créé avec
    <strong>SiteFacile</strong>

  </footer>

</body>

</html>`;
}


export default {

  async fetch(request, env) {

    const url = new URL(request.url);


    // =========================
    // CORS
    // =========================

    if (request.method === "OPTIONS") {

      return new Response(null, {

        status: 204,

        headers: corsHeaders

      });

    }


    // =========================
    // TEST API
    // =========================

    if (url.pathname === "/api/test") {

      return new Response(
        "API SiteFacile OK",
        {
          headers: {
            "Content-Type":
              "text/plain; charset=utf-8",

            ...corsHeaders
          }
        }
      );

    }


    // =========================
    // CRÉATION DU SITE
    // =========================

    if (url.pathname === "/api/create-site") {

      if (request.method !== "POST") {

        return jsonResponse(
          {
            success: false,

            error:
              "Méthode POST requise"
          },

          405
        );

      }


      try {

        const data =
          await request.json();


        const businessName =
          data.businessName?.trim();

        const city =
          data.city?.trim();


        const services =
          Array.isArray(data.services)
            ? data.services
            : [];


        // Vérification
        // des champs obligatoires

        if (
          !businessName ||
          !city ||
          services.length === 0
        ) {

          return jsonResponse(
            {
              success: false,

              error:
                "Le nom de l'entreprise, la ville et au moins une prestation sont obligatoires."
            },

            400
          );

        }


        // =========================
        // IDENTIFIANT DU SITE
        // =========================

        const siteId =
          businessName

            .toLowerCase()

            .normalize("NFD")

            .replace(
              /[\u0300-\u036f]/g,
              ""
            )

            .replace(
              /[^a-z0-9]+/g,
              "-"
            )

            .replace(
              /^-+|-+$/g,
              ""
            )

          + "-" +
          Date.now();


        // =========================
        // DONNÉES DU SITE
        // =========================

        const siteData = {

          id: siteId,

          businessName,

          city,

          services,

          activity:
            data.activity || "",

          address:
            data.address || "",

          phone:
            data.phone || "",

          email:
            data.email || "",

          social:
            data.social || "",

          style:
            data.style || "",

          images:
            data.images || [],

          createdAt:
            new Date().toISOString()

        };


        // =========================
        // ENREGISTREMENT JSON
        // =========================

        await env.SITE_STORAGE.put(

          `sites/${siteId}.json`,

          JSON.stringify(
            siteData,
            null,
            2
          ),

          {
            httpMetadata: {

              contentType:
                "application/json"

            }

          }

        );


        // =========================
        // GÉNÉRATION HTML
        // =========================

        const siteHTML =
          generateSiteHTML(
            siteData
          );


        // =========================
        // ENREGISTREMENT HTML
        // =========================

        await env.SITE_STORAGE.put(

          `sites/${siteId}/index.html`,

          siteHTML,

          {

            httpMetadata: {

              contentType:
                "text/html; charset=utf-8"

            }

          }

        );


        // =========================
        // RÉPONSE
        // =========================

        return jsonResponse({

          success: true,

          message:
            "Site enregistré avec succès dans SiteFacile",

          site: siteData,

          url:
            `/site/${siteId}`

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


    // =========================
    // AFFICHAGE DU SITE
    // =========================

    if (
      url.pathname.startsWith(
        "/site/"
      )
    ) {

      const sitePath =
        url.pathname

          .replace(
            "/site/",
            ""
          )

          .replace(
            /\/$/,
            ""
          );


      if (!sitePath) {

        return new Response(

          "Identifiant du site manquant",

          {

            status: 400,

            headers:
              corsHeaders

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

            headers:
              corsHeaders

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


    // =========================
    // AUTRES FICHIERS
    // =========================

    return env.ASSETS.fetch(request);

  }

};
