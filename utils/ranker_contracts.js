
export function simple_ranker_abi() {
    return [
        {
            "inputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "id",
                            "type": "uint256"
                        },
                        {
                            "internalType": "enum CategoryRanker.Category",
                            "name": "category",
                            "type": "uint8"
                        }
                    ],
                    "internalType": "struct CategoryRanker.Tweet[]",
                    "name": "userTweets",
                    "type": "tuple[]"
                },
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "id",
                            "type": "uint256"
                        },
                        {
                            "internalType": "enum CategoryRanker.Category",
                            "name": "category",
                            "type": "uint8"
                        }
                    ],
                    "internalType": "struct CategoryRanker.Tweet[]",
                    "name": "currentTweets",
                    "type": "tuple[]"
                },
                {
                    "internalType": "uint256",
                    "name": "k",
                    "type": "uint256"
                }
            ],
            "name": "rankTweets",
            "outputs": [
                {
                    "internalType": "uint256[]",
                    "name": "",
                    "type": "uint256[]"
                }
            ],
            "stateMutability": "pure",
            "type": "function"
        }
    ]
}

export function simple_ranker_v2_abi() {
    return [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256[]",
                    "name": "rankedTweetIds",
                    "type": "uint256[]"
                }
            ],
            "name": "RankedTweets",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "id",
                            "type": "uint256"
                        },
                        {
                            "internalType": "enum CategoryRanker.Category",
                            "name": "category",
                            "type": "uint8"
                        }
                    ],
                    "internalType": "struct CategoryRanker.Tweet[]",
                    "name": "userTweets",
                    "type": "tuple[]"
                },
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "id",
                            "type": "uint256"
                        },
                        {
                            "internalType": "enum CategoryRanker.Category",
                            "name": "category",
                            "type": "uint8"
                        }
                    ],
                    "internalType": "struct CategoryRanker.Tweet[]",
                    "name": "currentTweets",
                    "type": "tuple[]"
                },
                {
                    "internalType": "uint256",
                    "name": "k",
                    "type": "uint256"
                }
            ],
            "name": "rankTweets",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]
}

export function simple_ranker_contract_address() {
    return "0x5050Bc76Cf130Efd0B0186eca8B0b75F4CcEC62d"
}

export function simple_ranker_v2_contract_address() {
    return "0x27BBFa4f8CA9048D2e4f8B1A532477A03ac24958"
}

export function cosine_ranker_abi() {
    return [
        {
            "inputs": [
                {
                    "internalType": "int256[768][]",
                    "name": "allTweets",
                    "type": "int256[768][]"
                },
                {
                    "internalType": "int256[768][]",
                    "name": "userTweets",
                    "type": "int256[768][]"
                },
                {
                    "internalType": "uint256",
                    "name": "k",
                    "type": "uint256"
                }
            ],
            "name": "findTopKSimilar",
            "outputs": [
                {
                    "internalType": "uint256[]",
                    "name": "",
                    "type": "uint256[]"
                }
            ],
            "stateMutability": "pure",
            "type": "function"
        }
    ]
}

export function cosine_ranker_contract_address() {
    // return "0x7254f6ce08b444205F48AcF1e741afDcecd13929"
    return "0x5E575884eb3cB7a3fBA2107eaA7993A7711d2452"
}