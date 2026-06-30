export default async function handler(req, res) {
  const { path } = req.query;
  if (!path) return res.status(400).json({ error: "No path provided" });

  const url = `https://www.reddit.com/${path}`;
  const response = await fetch(url, {
    headers: {
      "User-Agent": "NZCFL-Tracker/1.0",
      "Accept": "application/json",
    },
  });

  const data = await response.json();
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).json(data);
}
