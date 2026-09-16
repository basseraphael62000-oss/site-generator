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
