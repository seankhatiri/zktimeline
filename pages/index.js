import { useEffect, useRef, useState, useCallback } from "react";
import NavBar from "../components/Header";
import {
  Box,
  VStack,
  Textarea,
  Button,

} from "@chakra-ui/react";
import Header from "../components/Header";

const Home = () => {
    const [text, setText] = useState('');

    return (
        <>
          <Header />
          <VStack spacing={10}>
            <Box paddingTop="40px" width="70%">
                <Textarea 
                height="200px"
                placeholder="Start writing to see the magic ..., then go to Text Encoding, finally go to the Timeline from top menu" 
                value={text} 
                onChange={(e) => setText(e.target.value)}
                />
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
                {text}
            </Box>
        </VStack>
        </>
    );
};

export default Home;