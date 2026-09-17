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

/* =========================================================
   SÉCURITÉ
========================================================= */

function escapeHTML(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


/* =========================================================
   GÉNÉRATION DU SITE
========================================================= */

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
  const social = escapeHTML(site.social);

  /* =======================================================
     STYLE
  ======================================================= */

  const selectedStyle =
    String(site.style || "Moderne")
      .toLowerCase()
      .trim();


  let theme = {
    background: "#f6f6f7",
    surface: "#ffffff",
    text: "#151515",
    muted: "#777777",
    primary: "#111111",
    primaryText: "#ffffff",
    border: "#e7e7e7",
    hero: "linear-gradient(135deg, #111111, #2c2c2c)",
    radius: "20px",
    font: "Arial, Helvetica, sans-serif"
  };


  /* =======================================================
     MODERNE
  ======================================================= */

  if (selectedStyle === "moderne") {

    theme = {
      background: "#f6f6f7",
      surface: "#ffffff",
      text: "#151515",
      muted: "#777777",
      primary: "#111111",
      primaryText: "#ffffff",
      border: "#e7e7e7",
      hero: "linear-gradient(135deg, #111111, #303030)",
      radius: "20px",
      font: "Inter, Arial, sans-serif"
    };

  }


  /* =======================================================
     ÉLÉGANT
  ======================================================= */

  else if (selectedStyle === "élégant") {

    theme = {
      background: "#f5f1eb",
      surface: "#fffdf9",
      text: "#2a2520",
      muted: "#766e65",
      primary: "#6d5140",
      primaryText: "#ffffff",
      border: "#e6ddd3",
      hero: "linear-gradient(135deg, #2c211b, #735641)",
      radius: "12px",
      font: "Georgia, 'Times New Roman', serif"
    };

  }


  /* =======================================================
     MINIMALISTE
  ======================================================= */

  else if (selectedStyle === "minimaliste") {

    theme = {
      background: "#ffffff",
      surface: "#ffffff",
      text: "#222222",
      muted: "#888888",
      primary: "#222222",
      primaryText: "#ffffff",
      border: "#eeeeee",
      hero: "#ffffff",
      radius: "8px",
      font: "Arial, Helvetica, sans-serif"
    };

  }


  /* =======================================================
     COLORÉ
  ======================================================= */

  else if (selectedStyle === "coloré") {

    theme = {
      background: "#f5f3ff",
      surface: "#ffffff",
      text: "#222222",
      muted: "#68627a",
      primary: "#6c4cff",
      primaryText: "#ffffff",
      border: "#e5defc",
      hero: "linear-gradient(135deg, #6c4cff, #d84cff)",
      radius: "24px",
      font: "Arial, Helvetica, sans-serif"
    };

  }


  /* =======================================================
     PRESTATIONS
  ======================================================= */

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

          <div class="service-info">

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


  /* =======================================================
     GALERIE
  ======================================================= */

  const images =
    Array.isArray(site.images)
      ? site.images
      : [];


  const galleryHTML =
    images.length > 0

      ? `
        <section class="section gallery-section">

          <div class="section-heading">

            <span>
              Galerie
            </span>

            <h2>
              Découvrez notre univers
            </h2>

          </div>

          <div class="gallery">

            ${images
              .map(image => {

                const imageURL =
                  typeof image === "string"
                    ? image
                    : image?.url || "";

                if (!imageURL) {
                  return "";
                }

                return `
                  <div class="gallery-item">

                    <img
                      src="${escapeHTML(imageURL)}"
                      alt="${businessName}"
                      loading="lazy"
                    >

                  </div>
                `;

              })
              .join("")}

          </div>

        </section>
      `

      : "";


  /* =======================================================
     RÉSEAUX SOCIAUX
  ======================================================= */

  const socialHTML =
    social

      ? `
        <a
          class="contact-button secondary"
          href="${social}"
          target="_blank"
          rel="noopener noreferrer"
        >
          🌐 Réseaux sociaux
        </a>
      `

      : "";


  /* =======================================================
     HTML FINAL
  ======================================================= */

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

  <meta
    name="theme-color"
    content="${theme.primary}"
  >

  <title>
    ${businessName} - ${city}
  </title>

  <style>

    :root {
      --background: ${theme.background};
      --surface: ${theme.surface};
      --text: ${theme.text};
      --muted: ${theme.muted};
      --primary: ${theme.primary};
      --primary-text: ${theme.primaryText};
      --border: ${theme.border};
      --hero: ${theme.hero};
      --radius: ${theme.radius};
      --font: ${theme.font};
    }

    * {
      box-sizing: border-box;
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      margin: 0;
      background: var(--background);
      color: var(--text);
      font-family: var(--font);
      line-height: 1.6;
    }

    a {
      color: inherit;
    }

    /* NAVIGATION */

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
      padding: 9px 18px;
      border: 1px solid rgba(255,255,255,0.35);
      border-radius: 999px;
      font-size: 14px;
      transition: 0.2s;
    }

    .nav-button:hover {
      background: white;
      color: #111;
    }

    /* HERO */

    header {
      min-height: 82vh;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 100px 20px 80px;
      color: white;
      background: var(--hero);
      position: relative;
      overflow: hidden;
    }

    header::after {
      content: "";
      position: absolute;
      width: 520px;
      height: 520px;
      border-radius: 50%;
      background: rgba(255,255,255,0.06);
      right: -180px;
      bottom: -230px;
    }

    .hero {
      max-width: 850px;
      position: relative;
      z-index: 2;
    }

    .hero-label {
      display: inline-block;
      margin-bottom: 22px;
      padding: 7px 16px;
      border-radius: 999px;
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.18);
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 2px;
    }

    .hero h1 {
      margin: 0;
      font-size: clamp(45px, 9vw, 88px);
      line-height: 0.98;
      letter-spacing: -4px;
      font-weight: 800;
    }

    .hero-location {
      margin: 25px 0 0;
      font-size: 20px;
      opacity: 0.75;
    }

    .hero-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-top: 38px;
      padding: 15px 27px;
      border-radius: 999px;
      background: white;
      color: #111;
      text-decoration: none;
      font-weight: 700;
      transition: 0.2s;
    }

    .hero-button:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 30px rgba(0,0,0,0.25);
    }

    /* CONTENU */

    main {
      max-width: 1100px;
      margin: 0 auto;
      padding: 90px 20px;
    }

    .section {
      margin-bottom: 90px;
    }

    .section-heading {
      margin-bottom: 35px;
    }

    .section-heading span {
      display: block;
      margin-bottom: 8px;
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: var(--muted);
      font-weight: 700;
    }

    .section-heading h2 {
      margin: 0;
      font-size: 38px;
      line-height: 1.1;
      letter-spacing: -1.5px;
    }

    .section-heading p {
      margin: 12px 0 0;
      color: var(--muted);
      font-size: 17px;
    }

    /* SERVICES */

    .services {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 20px;
    }

    .service-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 28px;
      min-height: 125px;
      display: flex;
      align-items: center;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .service-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 40px rgba(0,0,0,0.08);
    }

    .service-info {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
    }

    .service-card h3 {
      margin: 0;
      font-size: 19px;
    }

    .service-price {
      white-space: nowrap;
      font-weight: 700;
      color: var(--primary);
      font-size: 18px;
    }

    /* À PROPOS */

    .about {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 45px;
      color: var(--muted);
      font-size: 18px;
    }

    .about strong {
      color: var(--text);
    }

    /* GALERIE */

    .gallery {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 18px;
    }

    .gallery-item {
      overflow: hidden;
      border-radius: var(--radius);
      background: var(--surface);
      border: 1px solid var(--border);
      aspect-ratio: 4 / 3;
    }

    .gallery-item img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.3s;
    }

    .gallery-item:hover img {
      transform: scale(1.04);
    }

    /* CONTACT */

    .contact {
      background: var(--primary);
      color: var(--primary-text);
      border-radius: calc(var(--radius) + 8px);
      padding: 65px 35px;
      text-align: center;
    }

    .contact h2 {
      margin: 0;
      font-size: 40px;
    }

    .contact-subtitle {
      margin: 12px 0 30px;
      opacity: 0.65;
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
      box-shadow: 0 10px 25px rgba(0,0,0,0.3);
    }

    .contact-button.secondary {
      background: transparent;
      color: white;
      border: 1px solid rgba(255,255,255,0.35);
    }

    .contact-address {
      margin-top: 28px;
      opacity: 0.6;
      font-size: 15px;
    }

    /* FOOTER */

    footer {
      text-align: center;
      padding: 35px 20px;
      color: var(--muted);
      font-size: 14px;
    }

    footer strong {
      color: var(--text);
    }

    /* MOBILE */

    @media (max-width: 700px) {

      nav {
        padding: 18px;
      }

      .nav-button {
        display: none;
      }

      header {
        min-height: 75vh;
        padding: 90px 20px 60px;
      }

      .hero h1 {
        font-size: clamp(42px, 14vw, 65px);
        letter-spacing: -2px;
      }

      .hero-location {
        font-size: 17px;
      }

      main {
        padding: 60px 15px;
      }

      .section {
        margin-bottom: 65px;
      }

      .section-heading h2 {
        font-size: 30px;
      }

      .services {
        grid-template-columns: 1fr;
      }

      .service-info {
        align-items: flex-start;
        flex-direction: column;
        gap: 10px;
      }

      .about {
        padding: 28px;
        font-size: 16px;
      }

      .gallery {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 10px;
      }

      .gallery-item {
        border-radius: 11px;
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


  <header>

    <div class="hero">

      <span class="hero-label">
        ${activity}
      </span>

      <h1>
        ${businessName}
      </h1>

      ${
        city
          ? `
            <p class="hero-location">
              📍 ${city}
            </p>
          `
          : ""
      }

      <a
        class="hero-button"
        href="#prestations"
      >
        Découvrir nos prestations
      </a>

    </div>

  </header>


  <main>

    <section
      id="prestations"
      class="section"
    >

      <div class="section-heading">

        <span>
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


    <section class="section">

      <div class="section-heading">

        <span>
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
          et nous mettons notre
          savoir-faire à votre service.
        </p>

      </div>

    </section>


    ${galleryHTML}


    <section
      id="contact"
      class="section"
    >

      <div class="contact">

        <h2>
          Contact
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

          ${socialHTML}

        </div>

        ${
          address
            ? `
              <p class="contact-address">
                📍 ${address}
              </p>
            `
            : ""
        }

      </div>

    </section>

  </main>


  <footer>

    Créé avec
    <strong>
      SiteFacile
    </strong>

  </footer>

</body>

</html>`;
}




/* =========================================================
   WORKER
========================================================= */

export default {

  async fetch(request, env) {

    const url =
      new URL(request.url);


    /* =====================================================
       CORS
    ===================================================== */

    if (
      request.method === "OPTIONS"
    ) {

      return new Response(
        null,
        {
          status: 204,
          headers: corsHeaders
        }
      );

    }


    /* =====================================================
       TEST API
    ===================================================== */

    if (
      url.pathname === "/api/test"
    ) {

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


    /* =====================================================
       CRÉATION DU SITE
    ===================================================== */

    if (
      url.pathname ===
      "/api/create-site"
    ) {


      if (
        request.method !== "POST"
      ) {

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
          Array.isArray(
            data.services
          )
            ? data.services
            : [];


        /* =================================================
           VALIDATION
        ================================================= */

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


        /* =================================================
           IDENTIFIANT
        ================================================= */

        const cleanName =
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
            );


        const siteId =
          cleanName +
          "-" +
          Date.now();


        /* =================================================
           DONNÉES
        ================================================= */

        const siteData = {

          id:
            siteId,

          businessName:
            businessName,

          city:
            city,

          services:
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
            data.style || "Moderne",

          images:
            Array.isArray(data.images)
              ? data.images
              : [],

          createdAt:
            new Date().toISOString()

        };


        /* =================================================
           R2 : JSON
        ================================================= */

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


        /* =================================================
           GÉNÉRATION HTML
        ================================================= */

        const siteHTML =
          generateSiteHTML(
            siteData
          );


        /* =================================================
           R2 : HTML
        ================================================= */

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


        /* =================================================
           RÉPONSE
        ================================================= */

        return jsonResponse({

          success:
            true,

          message:
            "Site enregistré avec succès dans SiteFacile",

          site:
            siteData,

          url:
            `/site/${siteId}`

        });


      }

      catch (error) {

        console.error(
          "Erreur création site :",
          error
        );


        return jsonResponse(

          {

            success:
              false,

            error:
              error.message ||
              "Impossible d'enregistrer le site."

          },

          500

        );

      }

    }


    /* =====================================================
       AFFICHAGE DU SITE
    ===================================================== */

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

            status:
              400,

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

            status:
              404,

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


    /* =====================================================
       AUTRES REQUÊTES
    ===================================================== */

    return env.ASSETS.fetch(
      request
    );

  }

};
