export default {
    selectedNetwork: 'kovan',
    kovan: {
        allowedOutputTokens: [
            { label: "ETH", outputToken: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"},
            { label: "MKR", outputToken: "0xAaF64BFCC32d0F15873a02163e7E500671a4ffcD"}
        ],
        recipes: {
            '0xB18e4038bC524a630727Cfb37BfAD1666eEFcdBD': {
                label: 'BuyTokenRecipe',
                signature: ['address','address'],
            }
        }
    }
}