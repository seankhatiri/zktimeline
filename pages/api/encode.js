// pages/api/encode.js
export async function encodeText(text) {
  const API_URL = "https://api-inference.huggingface.co/models/BAAI/bge-large-en-v1.5";
  const headers = {
    "Authorization": `Bearer ${process.env.HF_API_KEY}`,
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error(`Error from encoding service: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error encoding text:", error);
    throw error;
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { text } = req.body;

  try {
    const encodedData = await encodeText(text);
    res.status(200).json(encodedData);
  } catch (error) {
    res.status(500).json({ error: "Error encoding text" });
  }
}

  