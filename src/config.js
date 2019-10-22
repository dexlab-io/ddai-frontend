export default {
    selectedNetwork: 'kovan',
    kovan: {
        // allowedOutputTokens: [
        //     { label: "ETH", outputToken: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"},
        //     { label: "MKR", outputToken: "0xAaF64BFCC32d0F15873a02163e7E500671a4ffcD"}
        // ],
        recipes: {
            // "0x930B42BaAfe936fB827bd1efd3383d700989F6B8": {
            //     label: 'BuyTokenRecipe',
            //     signature: ['address','address'],
            // }
            DAI: {
                title: "Earn DAI",
                description: "Start earning {interestRate}% on DAI. Your interest is automatically accrued in your wallet",
                img: "../../images/actionCardEth.png",
                recipeData: {
                    receivers: [
                        
                    ],
                    data: [
                        
                    ],
                    ratios: [
                        
                    ],
                }
            },
            ETH: {
                title: "Earn Ether",
                description: "Start earning {interestRate}% on DAI while automatically converting your gains to ETH",
                img: "../../images/actionCardEth.png",
                recipeData: {
                    receivers: [
                        "0x2714aa3d3c2507569655b6609475e569911cc333"
                    ],
                    data: [
                        "0x000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee000000000000000000000000{userAddress}"
                    ],
                    ratios: [
                        "100"
                    ],
                }
            },
            WBTC: {
                title: "Earn WBTC",
                description: "Start earning {interestRate}% on DAI while automatically converting your gains to WBTC",
                img: "../../images/actionCardWbtc.png",
                recipeData: {
                    receivers: [
                        "0x2714aa3d3c2507569655b6609475e569911cc333"
                    ],
                    data: [
                        // This is actually MKR, WBTC is not supported on kovan
                        "0x000000000000000000000000aaf64bfcc32d0f15873a02163e7e500671a4ffcd000000000000000000000000{userAddress}"
                    ],
                    ratios: [
                        "100"
                    ],
                }
            },
            WBTCETH: {
                title: "Earn Ether & WBTC",
                description: "Start earning {interestRate}% on DAI while automatically converting your gains to WBTC and ETH",
                img: "../../images/actionCardEthWbtc.png",
                recipeData: {
                    receivers: [
                        "0x2714aa3d3c2507569655b6609475e569911cc333",
                        "0x2714aa3d3c2507569655b6609475e569911cc333"
                    ],
                    data: [
                        "0x000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee000000000000000000000000{userAddress}",
                        // This is actually MKR, WBTC is not supported on kovan
                        "0x000000000000000000000000aaf64bfcc32d0f15873a02163e7e500671a4ffcd000000000000000000000000{userAddress}"
                    ],
                    ratios: [
                        "50",
                        "50"
                    ],
                }
            },
            KNC: {
                title: "Earn KNC",
                description: "Start earning {interestRate}% on DAI while automatically converting your gains to KNC",
                // TODO update image
                img: "../../images/actionCardWbtc.png",
                recipeData: {
                    receivers: [
                        "0x2714aa3d3c2507569655b6609475e569911cc333"
                    ],
                    data: [
                        // TODO set KNC address
                        "0x000000000000000000000000aaf64bfcc32d0f15873a02163e7e500671a4ffcd000000000000000000000000{userAddress}"
                    ],
                    ratios: [
                        "100"
                    ],
                }
            },
            COMPOUNDREPAYDAI: {
                title: "Repay Compound DAI Loan",
                description: "Start earning {interestRate}% on DAI while automatically repaying your DAI loan on compound",
                // TODO update image
                img: "../../images/actionCardWbtc.png",
                // TODO setup data
                recipeData: {
                    receivers: [
                        "0x2714aa3d3c2507569655b6609475e569911cc333"
                    ],
                    data: [
                        "0x000000000000000000000000aaf64bfcc32d0f15873a02163e7e500671a4ffcd000000000000000000000000{userAddress}"
                    ],
                    ratios: [
                        "100"
                    ],
                }
            },
            FULCRUMREPAYDAI: {
                title: "Repay Fulcrum DAI loan",
                description: "Start earning {interestRate}% on DAI while automatically repaying your DAI loan on Fulcrum",
                // TODO update image
                img: "../../images/actionCardWbtc.png",
                // TODO setup data
                recipeData: {
                    receivers: [
                        "0x2714aa3d3c2507569655b6609475e569911cc333"
                    ],
                    data: [
                        "0x000000000000000000000000aaf64bfcc32d0f15873a02163e7e500671a4ffcd000000000000000000000000{userAddress}"
                    ],
                    ratios: [
                        "100"
                    ],
                }
            },
        }
    }
}