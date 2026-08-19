export default async function handler(req, res) {
  // Ta vraie URL ngrok (remplace par la tienne)
  const TARGET_URL = 'https://metamerically-excusive-freddy.ngrok-free.dev';

  try {
    // Construire l'URL avec les paramètres de la requête
    const url = new URL(TARGET_URL + req.url);
    
    // Forward la méthode (GET, POST, etc.)
    const response = await fetch(url, {
      method: req.method,
      headers: {
        'ngrok-skip-browser-warning': 'true', // ← SKIP LA PAGE !
        'Content-Type': req.headers['content-type'] || 'application/json',
      },
      body: ['GET', 'HEAD'].includes(req.method) ? undefined : JSON.stringify(req.body),
    });

    // Récupérer les données
    const data = await response.json();

    // Renvoyer la réponse
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Proxy error', message: error.message });
  }
}
