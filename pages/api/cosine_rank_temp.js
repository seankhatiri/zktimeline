// pages/api/cosine_rank.js
import { encodeText } from "./encode";

function cosineSimilarity(vecA, vecB) {
    const dotProduct = vecA.reduce((acc, cur, i) => acc + cur * vecB[i], 0);
    const magA = Math.sqrt(vecA.reduce((acc, cur) => acc + cur ** 2, 0));
    const magB = Math.sqrt(vecB.reduce((acc, cur) => acc + cur ** 2, 0));
    return dotProduct / (magA * magB);
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end('Method Not Allowed');
    }

    const { userTweets, allTweets } = req.body;
    const userTweetsConcat = userTweets.map(tweet => tweet.body).join(" ");
    const encodedUserTweets = await encodeText(userTweetsConcat);


    const tweetScores = await Promise.all(allTweets.map(async (tweet) => {
        const encodedTweet = await encodeText(tweet.body);
        const similarity = cosineSimilarity(encodedUserTweets, encodedTweet);
        return { ...tweet, similarity };
    }));

    const topTweets = tweetScores.sort((a, b) => b.similarity - a.similarity).slice(0, 5); // Top 5
    res.status(200).json(topTweets);
}
