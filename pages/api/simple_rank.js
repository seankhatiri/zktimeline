// pages/api/simple_rank.js
import { ethers, JsonRpcProvider } from "ethers";
import { simple_ranker_abi } from "@/utils/ranker_contracts";
import { simple_ranker_contract_address } from "@/utils/ranker_contracts";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end('Method Not Allowed');
    }

    const provider = new JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);
    const signer = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY, provider);
    const contractAddress = simple_ranker_contract_address();
    const contractABI = simple_ranker_abi();
    const ranker = new ethers.Contract(contractAddress, contractABI, signer);

    const { userTweets, allTweets } = req.body;
    const userTweetsSimple = userTweets.map(tweet => ({
        id: tweet.id,
        category: tweet.category
    }))
    const allTweetsSimple = allTweets.map(tweet => ({
        id: tweet.id,
        category: tweet.category
    }))

    const k = 2; // top-k
    try {
        const topKTweetIds = await ranker.rankTweets(userTweetsSimple, allTweetsSimple, k);
        const topKTweets = topKTweetIds.map(id => allTweets.find(tweet => tweet.id === Number(id)));
        res.status(200).json(topKTweets);
    } 
    catch (e) {
        console.log(e)
        res.status(500).json({ error: "Error in contract call" });
    }
}