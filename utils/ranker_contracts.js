
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

export function simple_ranker_contract_address() {
    return "0x797A4EE4BC42B5b360E8C0fE05997a1514e3974e"
}

export function cosine_ranker_abi() {
    return []
}

export function cosine_ranker_contract_address() {
    return "0x7254f6ce08b444205F48AcF1e741afDcecd13929"
}