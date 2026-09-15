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

    // Création de site - étape de test
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

        return jsonResponse({
          success: true,
          message: "Données reçues par SiteFacile",
          site: {
            businessName,
            city,
            services,
            activity: data.activity || "",
            address: data.address || "",
            phone: data.phone || "",
            email: data.email || "",
            social: data.social || "",
            style: data.style || "",
            images: data.images || []
          }
        });
      } catch (error) {
        return jsonResponse(
          {
            success: false,
            error: "JSON invalide"
          },
          400
        );
      }
    }

    // Les autres requêtes continuent vers les fichiers du site
    return env.ASSETS.fetch(request);
  }
};
