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
    // TODO: Update contract considering 1024 as len of encoded tweets
    const encodedUserTweets = await encodeText(userTweetsConcat);
    // TODO: we need to consider float type in the contract
    const encodedUserTweetsInt = encodedUserTweets.map(x => Math.abs(parseInt(x*1000)));

    const encodedTweetsInt = await Promise.all(allTweets.map(async (tweet) => {
        const encodedTweet = await encodeText(tweet.body);
        const encodedTweetInt = encodedTweet.map(x => Math.abs(parseInt(x*1000)));
        return encodedTweetInt.slice(0, 768);
    }));
    
    // const encodedUserTweetsInt = [Array(768).fill(1)]
    // const encodedTweetsInt = [Array(768).fill(1), Array(768).fill(1)]

    const k = 2; // top-k
    const topKTweetIdxs = await ranker.findTopKSimilar(encodedTweetsInt, [encodedUserTweetsInt.slice(0, 768)], k);
    console.log(topKTweetIdxs);
    const topTweets = topKTweetIdxs.map(idx => allTweets[idx]);

    res.status(200).json(topTweets.slice(0, k));
    // res.status(200).json("hello");
}
