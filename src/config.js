export default {
    selectedNetwork: 'kovan',
    kovan: {
        allowedOutputTokens: [
            { label: "ETH", outputToken: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"},
            { label: "MKR", outputToken: "0xAaF64BFCC32d0F15873a02163e7E500671a4ffcD"}
        ],
        recipes: {
            "0x930B42BaAfe936fB827bd1efd3383d700989F6B8": {
                label: 'BuyTokenRecipe',
                signature: ['address','address'],
            }
        }
    }
}