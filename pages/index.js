// pages/index.js
import { useState } from 'react';

export default function Home() {
  const [text, setText] = useState('');
  const [encodedText, setEncodedText] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleEncodeText = async () => {
    setLoading(true);
    console.log("Encoding text...");
    try {
      const response = await fetch('/api/encode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(text),
      });

      const data = await response.json();
      setEncodedText(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("Failed to encode text:", error);
      setEncodedText("Error in encoding text.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to encode"
      />
      <button onClick={handleEncodeText} disabled={loading}>
        {loading ? 'Encoding...' : 'Encode Text'}
      </button>
      <pre>{encodedText}</pre>
    </div>
  );
}
