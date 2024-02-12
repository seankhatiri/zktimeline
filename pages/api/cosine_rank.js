// pages/api/cosine_rank.js
import { ethers, JsonRpcProvider } from "ethers";
import { cosine_ranker_abi } from "@/utils/ranker_contracts";
import { cosine_ranker_contract_address } from "@/utils/ranker_contracts";
import { encodeText } from "./encode";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end('Method Not Allowed');
    }

    const provider = new JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);
    const signer = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY, provider);
    const contractAddress = cosine_ranker_contract_address();
    const contractABI = cosine_ranker_abi();
    const ranker = new ethers.Contract(contractAddress, contractABI, signer);

    const { userTweets, allTweets } = req.body;
    const userTweetsConcat = userTweets.map(tweet => tweet.body).join(" ");
    const encodedUserTweets = await encodeText(userTweetsConcat);

    const encodedAllTweets = await Promise.all(allTweets.map(async (tweet) => {
        const encodedAllTweet = await encodeText(tweet.body);
        return encodedAllTweet;
    }));
    

    const k = 2; // top-k
    const topKTweetIdxs = await ranker.findTopKSimilar(encodedAllTweets, encodedUserTweets, k);
    const topTweets = topKTweetIdxs.map(idx => allTweets[idx]);

    res.status(200).json(topTweets.slice(0, k));
}
