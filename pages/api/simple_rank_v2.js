// pages/api/simple_rank.js
import { ethers, JsonRpcProvider } from "ethers";
import { simple_ranker_v2_abi } from "@/utils/ranker_contracts";
import { simple_ranker_v2_contract_address } from "@/utils/ranker_contracts";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end('Method Not Allowed');
    }

    const provider = new JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);
    const signer = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY, provider);
    const contractAddress = simple_ranker_v2_contract_address();
    const contractABI = simple_ranker_v2_abi();
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

        ranker.on("RankedTweets", (rankedTweetIds) => {
            console.log("Ranked Tweet IDs:", rankedTweetIds.map(id => id.toString()));
        });

        const tx = await ranker.rankTweets(userTweetsSimple, allTweetsSimple, k);
        const receipt = await tx.wait(); // Ensures the transaction is mined

        // const topKTweetIds = await new Promise((resolve, reject) => {
        //     ranker.once("RankedTweets", (rankedTweetIds) => {
        //         resolve(rankedTweetIds.map(id => id.toString()));
        //     });
            
        //     ranker.rankTweets(userTweetsSimple, allTweetsSimple, k)
        //         .then(tx => tx.wait()) // Ensure the transaction is mined
        //         .catch(reject); // Reject the promise if there's an error
        // });

        console.log(`Transaction hash: ${receipt.hash}`);
        console.log(`Transaction explorer URL: https://sepolia.scrollscan.com/tx/${receipt.hash}`);
        console.log("Events:", receipt.events?.filter(e => e.event === "RankedTweets"));
        ranker.removeAllListeners("RankedTweets");

        // await new Promise(resolve => setTimeout(resolve, 5000));

        // const topKTweets = topKTweetIds.map(id => allTweets.find(tweet => tweet.id === Number(id)));
        // res.status(200).json({
        //     transactionHash: receipt.transactionHash,
        //     explorerURL: `https://sepolia.scrollscan.com/tx/${receipt.transactionHash}`,
        //     topK: topKTweets
        // })

        res.status(200).json('hi');
    } 
    catch (e) {
        console.error(e);
        res.status(500).json({ error: "Error in contract call" });
    }
}


// // pages/api/simple_rank.js
// const {Web3} = require('web3');
// const { simple_ranker_v2_abi } = require('@/utils/ranker_contracts');
// const { simple_ranker_v2_contract_address } = require('@/utils/ranker_contracts');

// export default async function handler(req, res) {
//   if (req.method !== 'POST') {
//     return res.status(405).end('Method Not Allowed');
//   }

//   // Connect to the blockchain
//   const web3 = new Web3(new Web3.providers.HttpProvider(process.env.NEXT_PUBLIC_RPC_URL));
//   const privateKey = process.env.WALLET_PRIVATE_KEY.startsWith('0x') ? process.env.WALLET_PRIVATE_KEY : `0x${process.env.WALLET_PRIVATE_KEY}`;
//   const account = web3.eth.accounts.privateKeyToAccount(privateKey);
//   web3.eth.accounts.wallet.add(account);
//   web3.eth.defaultAccount = account.address;

//   const contractAddress = simple_ranker_v2_contract_address();
//   const contract = new web3.eth.Contract(simple_ranker_v2_abi(), contractAddress);

//   const { userTweets, allTweets } = req.body;
//   const userTweetsSimple = userTweets.map(tweet => ({
//     id: tweet.id,
//     category: tweet.category
//   }));
//   const allTweetsSimple = allTweets.map(tweet => ({
//     id: tweet.id,
//     category: tweet.category
//   }));

//   const k = 2; // top-k
//   try {
//     const gas = await contract.methods.rankTweets(userTweetsSimple, allTweetsSimple, k).estimateGas({ from: account.address });
//     const tx = await contract.methods.rankTweets(userTweetsSimple, allTweetsSimple, k)
//       .send({ from: account.address, gas });
    
//     console.log(`Transaction hash: ${tx.transactionHash}`);
//     console.log(`Transaction explorer URL: https://sepolia.scrollscan.com/tx/${tx.transactionHash}`);
    
//     // Since web3.js does not support event listening in the same way as ethers, you might need to fetch the transaction receipt
//     // to get the event logs if necessary, or handle events in a different manner

//     res.status(200).json('Transaction successful');
//   } 
//   catch (e) {
//     console.error(e);
//     res.status(500).json({ error: "Error in contract call" });
//   }
// }
