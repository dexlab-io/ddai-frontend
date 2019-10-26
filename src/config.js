export default {
    selectedNetwork: 'kovan',
    kovan: {
        daiAddress: "0xC4375B7De8af5a38a93548eb8453a498222C4fF2",
        ddaiAddress: "0x9ee09f6564a5241508029f9451558dd58d3b957b",
        recipes: {
            DAI: {
                title: "Earn DAI",
                description: "Start earning {interestRate}% on DAI. Your interest is automatically accrued in your wallet",
                img: "../../images/actionCardDAI.png",
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
                        "0xdd7abc70d52032ec0960cac6e7d9acf42f9acbfb"
                    ],
                    data: [
                        "0x000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee000000000000000000000000{userAddress}"
                    ],
                    ratios: [
                        "100"
                    ],
                }
            },
            ETH4X: {
                title: "Long ETH x4",
                description: "Start earning {interestRate}% on DAI while automatically converting your gains to a X4 Long position on Fulcrum",
                img: "../../images/actionCardEth.png",
                recipeData: {
                    receivers: [
                        "0xfa60c27d0f894df8f1cf3b919be49099b09e6cac"
                    ],
                    data: [
                        "0x0000000000000000000000000E5f87BDcD6285F930b6bbcC3E21CA9d985e12fE"
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
                        "0xdd7abc70d52032ec0960cac6e7d9acf42f9acbfb"
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
                        "0xdd7abc70d52032ec0960cac6e7d9acf42f9acbfb",
                        "0xdd7abc70d52032ec0960cac6e7d9acf42f9acbfb"
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
                img: "../../images/actionCardKNC.png",
                recipeData: {
                    receivers: [
                        "0xdd7abc70d52032ec0960cac6e7d9acf42f9acbfb"
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
                img: "../../images/actionCardCompoundLoan.png",
                // TODO setup data
                recipeData: {
                    receivers: [
                        "0xdd7abc70d52032ec0960cac6e7d9acf42f9acbfb"
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
                img: "../../images/actionCardFulcrum.png",
                // TODO setup data
                recipeData: {
                    receivers: [
                        "0xdd7abc70d52032ec0960cac6e7d9acf42f9acbfb"
                    ],
                    data: [
                        "0x000000000000000000000000aaf64bfcc32d0f15873a02163e7e500671a4ffcd000000000000000000000000{userAddress}"
                    ],
                    ratios: [
                        "100"
                    ],
                }
            },
            XTZ : {
                title: "Earn sXTZ(Tezos)",
                description: "Start earning {interestRate}% on DAI while automatically converting your gains to sXTZ on Syntetix",
                img: "../../images/actionCardCompoundLoan.png",
                recipeData: {
                    receivers: [
                        "0x12e9dab2980635b0037751679cd364b93b969de3"
                    ],
                    data: [
                        "0x7358545a00000000000000000000000000000000000000000000000000000000000000000000000000000000{userAddress}"
                    ],
                    ratios: [
                        "100"
                    ],
                }
            }
        }
    }
}