// pages/api/encode.js
export default async function handler(req, res) {
    if (req.method === 'POST') {
      const text = req.body.text;
  
      const headers = {
        "Authorization": `Bearer ${process.env.HF_API_KEY}`,
      };
  
      const API_URL = "https://api-inference.huggingface.co/models/BAAI/bge-large-en-v1.5";
  
      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(text),
        });
  
        const data = await response.json();
        res.status(200).json(data);
      } catch (error) {
        console.error("Error encoding text:", error);
        res.status(500).json({ error: "Error encoding text" });
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  