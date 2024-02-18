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
  Select
} from "@chakra-ui/react";
import Header from "../components/Header";

export default function Timeline() {
  const [allTweets, setAllTweets] = useState('');
  const [userTweets, setUserTweets] = useState('');
  const [topK, setTopK] = useState(null);
  const [rankerType, setRankerType] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRanker = async () => {
    setLoading(true);
    console.log("generating ranking...");
    try {
      const response = await fetch(`/api/${rankerType}`, {
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
      setTopK("Error in ranking tweets, please weight for 50 seconds, we are laoding AI models behind the scnene ...");
    } finally {
      setLoading(false);
    }
  };

  const handleRankerType = (e) => {
    setRankerType(e.target.value);
  }

  return (
    <>
    <Header />
    <VStack>
        <Box paddingTop="40px" width="70%">
        <Select placeholder='Select Ranker' paddingBottom="10px" onChange={handleRankerType} defaultValue='simple_ranker'>
            <option value='simple_rank_v2'>Simple Ranker</option>
            <option value='cosine_rank'>scroll AI Ranker</option>
            <option value='cosine_rank_temp'>centralized AI Ranker</option>
        </Select>
            <Textarea 
            height="200px"
            placeholder="Write the list of all tweets like: [{'id': 0, 'category': 1, 'body': 'When is US election?'}, 
                ..., {'id': 1, 'category': '2', 'body': 'Who won the final Grand Slam men's tennis'}]. 
                make sure to use double quote instead of single qoute" 
            value={allTweets} 
            onChange={(e) => setAllTweets(e.target.value)}
            />
        </Box>
        <Box paddingTop="10px" width="70%">
            <Textarea 
            height="100px"
            placeholder="Write the list of your tweets with the same data structure as above" 
            value={userTweets} 
            onChange={(e) => setUserTweets(e.target.value)}
            />
            <Button colorScheme="purple" onClick={handleRanker} marginTop="20px" isLoading={loading}>
            Rank tweets
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
