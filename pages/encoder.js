// pages/index.js
import React, { useState } from 'react';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Container,
  Spinner,
  Flex,
  Textarea,
  Button,
  VStack,
} from "@chakra-ui/react";
import Header from "../components/Header";

export default function Encoder() {
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
        body: JSON.stringify({text: text}),
      });

      const data = await response.json();
      setEncodedText(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("Failed to encode text:", error);
      setEncodedText("Error in encoding text, please weight for 50 seconds, we are laoding AI models behind the scnene ...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Header />
    <VStack spacing={10}>
        <Box paddingTop="40px" width="70%">
            <Textarea 
            height="200px"
            placeholder="Write your text here to be encoded..." 
            value={text} 
            onChange={(e) => setText(e.target.value)}
            />
            <Button colorScheme="purple" onClick={handleEncodeText} marginTop="10px" isLoading={loading}>
            Encode text
            </Button>
        </Box>
        <Box 
            border="1px solid purple" 
            margin="20px"
            padding="20px" 
            width="70%" 
            overflowY="auto" 
            maxHeight="900px"
            height="700px"
        >
            {encodedText ? encodedText : "Your encoded text will be shown here..."}
        </Box>
    </VStack>
  </>
  );
}
