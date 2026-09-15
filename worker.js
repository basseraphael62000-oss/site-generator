export default {
  async fetch(request, env) {
    return new Response("API SiteFacile OK", {
      headers: {
        "Content-Type": "text/plain; charset=utf-8"
      }
    });
  }
};
