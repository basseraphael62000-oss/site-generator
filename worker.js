export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Test de l'API
    if (url.pathname === "/api/test") {
      return new Response("API SiteFacile OK", {
        headers: {
          "Content-Type": "text/plain; charset=utf-8"
        }
      });
    }

    // Création de site - étape de test
    if (url.pathname === "/api/create-site") {
      if (request.method !== "POST") {
        return new Response(
          JSON.stringify({
            success: false,
            error: "Méthode POST requise"
          }),
          {
            status: 405,
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
      }

      try {
        const data = await request.json();

        const name = data.name?.trim();
        const city = data.city?.trim();
        const service = data.service?.trim();

        if (!name || !city || !service) {
          return new Response(
            JSON.stringify({
              success: false,
              error: "Nom, ville et prestation sont obligatoires"
            }),
            {
              status: 400,
              headers: {
                "Content-Type": "application/json"
              }
            }
          );
        }

        return new Response(
          JSON.stringify({
            success: true,
            message: "Données reçues par SiteFacile",
            site: {
              name,
              city,
              service
            }
          }),
          {
            status: 200,
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
      } catch (error) {
        return new Response(
          JSON.stringify({
            success: false,
            error: "JSON invalide"
          }),
          {
            status: 400,
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
      }
    }

    // Toutes les autres requêtes continuent vers les fichiers du site
    return env.ASSETS.fetch(request);
  }
};
