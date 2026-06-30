export default async function handler(req, res) {
  try {
    const path = req.query.path;
    if (!path) return res.status(400).json({ error: "No path provided" });

    const decodedPath = decodeURIComponent(path);
    const url = `https://www.reddit.com/${decodedPath}`;

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; NZCFLBot/1.0)",
        "Accept": "application/json",
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: `Reddit returned ${response.status}` });
    }

    const data = await response.json();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
