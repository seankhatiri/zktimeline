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

export default function Timeline() {
  const [allTweets, setAllTweets] = useState('');
  const [userTweets, setUserTweets] = useState('');
  const [topK, setTopK] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRanker = async () => {
    setLoading(true);
    console.log("generating ranking...");
    try {
      const response = await fetch('/api/ranker', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({allTweets: JSON.parse(allTweets), userTweets: JSON.parse(userTweets)}),
      });
      const data = await response.json();
      setTopK(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("Failed to rank tweets:", error);
      setTopK("Error in ranking tweets.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Header />
    <VStack>
        <Box paddingTop="40px" width="70%">
            <Textarea 
            height="200px"
            placeholder="Write the list of all tweets like: [{'tag': 'news', 'body': 'When is US election?'}, 
                ..., {'tag': 'sport', 'body': 'Who won the final Grand Slam men's tennis'}]" 
            value={allTweets} 
            onChange={(e) => setAllTweets(e.target.value)}
            />
        </Box>
        <Box paddingTop="10px" width="70%">
            <Textarea 
            height="100px"
            placeholder="Write the list of your tweets like: [{}, ..., {}]" 
            value={userTweets} 
            onChange={(e) => setUserTweets(e.target.value)}
            />
            <Button colorScheme="purple" onClick={handleRanker} marginTop="20px">
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
            height="500px"
        >
            {topK ? topK : "Your timeline (top-k relevant tweets) will be shown here..."}
        </Box>
    </VStack>
  </>
  );
}
