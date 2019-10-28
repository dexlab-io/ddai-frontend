import { BasePlugin } from 'eth-dexcore-js';
import BigNumber from 'bignumber.js';
import DDAIArtifact from './artifacts/DDAI.json';
import MockDai from './artifacts/MockDai.json';
import get from 'lodash/get';
import CONF from '../config';
import findKey from 'lodash/findKey';
import utils from 'web3-utils';


const config = CONF[CONF.selectedNetwork];

const getRecipeByname = (name) => {
    return findKey(config.recipes, {label: name});
};

export const to1e18 = (amount, decimals = 18) => utils.toWei(amount);

export const from1e18 = (amount, decimals = 18) => new BigNumber(amount.toString())
    .dividedBy(new BigNumber(10).pow(new BigNumber(decimals))).toString();

export const UNLIMITED_ALLOWANCE_IN_BASE_UNITS = new BigNumber(2).pow(256).minus(1);
const mockDaiAddress = config.daiAddress;
const BuyTokenRecipe = getRecipeByname('BuyTokenRecipe')


/**

 */
class DDAI extends BasePlugin {
    constructor(walletInstance) {
        super(walletInstance);

        this.contractAddress = config.ddaiAddress;
        this.instance = new this.W.web3.eth.Contract(DDAIArtifact.compilerOutput.abi, this.contractAddress);
        this.mockdai = new this.W.web3.eth.Contract(MockDai.compilerOutput.abi, mockDaiAddress);
    }

    async gimeMeDAI(amount) {
        const srcAmount = this.W.web3.utils.toWei(amount.toString());
        const supplyTxData = await this.mockdai.methods.mintTo(this.W.getAddress(), srcAmount).encodeABI();
        const supplyTxGas = await this.mockdai.methods.mintTo(this.W.getAddress(), srcAmount).estimateGas();
        const nonce = await this.W.getNonce();
        const tx = await this.mockdai.methods.mintTo(this.W.getAddress(), srcAmount).send({from: this.W.getAddress()});
    }

    async needAllowance(amount=100000000) {
        const allowance = await this.W.checkTokenAllowanceForAddress(this.contractAddress , mockDaiAddress);
        const BNamount = new BigNumber(amount.toString()).multipliedBy( new BigNumber(10).pow( new BigNumber(18)) );
        const BNtokenAllowance = new BigNumber( allowance.toString() )
        return !BNtokenAllowance.isGreaterThanOrEqualTo( BNamount );
    }

    async giveAllowance(benificiary = this.contractAddress ) {
        const unlimitedApprove = this.W.web3.utils.toWei( this.W.web3.utils.toBN(UNLIMITED_ALLOWANCE_IN_BASE_UNITS).toString() ).toString();
        const approveTransactionTx = await this.mockdai.methods.approve(benificiary, unlimitedApprove).send({from: this.W.getAddress()}).on('transactionHash', (hash) => {
            this.W.Rx.add(hash);
        });
        return approveTransactionTx;
    }

    async mint(amount) {
        if( await this.needAllowance(amount) ) {
            await this.giveAllowance();
        }
        const srcAmount = to1e18(amount).toString();
        const tx = await this.instance.methods.mint(this.W.getAddress(), srcAmount).send({from: this.W.getAddress()}).on('transactionHash', (hash) => {
            this.W.Rx.add(hash);
        });
        return tx;
    }

    async redeem(amount) {
        const srcAmount = to1e18(amount);
        const tx = await this.instance.methods.redeem(this.W.getAddress(), srcAmount).send({from: this.W.getAddress()}).on('transactionHash', (hash) => {
            this.W.Rx.add(hash);
        });
        return tx;
    }

    async mintAndDistribute(amount) {
        // function mintAndDistribute(address _receiver, uint256 _amount) public {
        if( await this.needAllowance(amount) ) {
            await this.giveAllowance();
        }

        const srcAmount = to1e18(amount).toString();
        const tx = await this.instance.methods.mintAndDistribute(this.W.getAddress(), srcAmount).send({from: this.W.getAddress()}).on('transactionHash', (hash) => {
            this.W.Rx.add(hash);
        });
        return tx;
    }
    

    async addRecipe() {
        const data = this.W.web3.eth.abi.encodeParameters( 
            ['address','address'], 
            [BuyTokenRecipe, this.W.getAddress()]
        );

        const ratio = new BigNumber('100').toString();
        const tx = await this.instance.methods.addRecipe(BuyTokenRecipe, ratio, data).send({from: this.W.getAddress()}).on('transactionHash', (hash) => {
            this.W.Rx.add(hash);
        });
        return tx;
    }

    async mintAndSetRecipes(amount, selectedRecipe) {

        if( await this.needAllowance(amount) ) {
            await this.giveAllowance();
        }

        const ratio = new BigNumber('100').toString();
        const srcAmount = to1e18(amount);

        const recipe = config.recipes[selectedRecipe];
        recipe.recipeData.data = recipe.recipeData.data.map(value => (value.replace("{userAddress}", this.W.getAddress().replace("0x", ""))))
    
        const tx = await this.instance.methods.mintAndSetRecipes(srcAmount, recipe.recipeData.receivers, recipe.recipeData.ratios, recipe.recipeData.data).send({from: this.W.getAddress()}).on('transactionHash', (hash) => {
            this.W.Rx.add(hash);
        });
        return tx;
    }

    parseRecipeData(recipeId) {
        const recipe = config.recipes[recipeId];
        const user = this.W.getAddress();
        recipe.recipeData.data = recipe.recipeData.data.map((item) => (item.replace("{userAddress}", user.replace("0x", ""))));
        return recipe.recipeData;
    }

    async setRecipes(recipeId) {
        const recipeData = this.parseRecipeData(recipeId);
        const tx = await this.instance.methods.setRecipes(recipeData.receivers, recipeData.ratios, recipeData.data).send({from: this.W.getAddress()}).on('transactionHash', (hash) => {
            this.W.Rx.add(hash);
        });
        return tx;
    }

    async claimInterest() {
        const tx = await this.instance.methods.claimInterest(this.W.getAddress()).send({from: this.W.getAddress()}).on('transactionHash', (hash) => {
            this.W.Rx.add(hash);
        });
        return tx;
    }

    async distributeStack() {
        const tx = await this.instance.methods.distributeStack(this.W.getAddress()).send({from: this.W.getAddress()}).on('transactionHash', (hash) => {
            this.W.Rx.add(hash);
        });
        return tx;
    }

    async getBalanceUnderlying() {
        const tx = await this.mockdai.methods.balanceOf(this.W.getAddress()).call();
        return tx;
    }

    async getBalance() {
        const tx = await this.instance.methods.balanceOf(this.W.getAddress()).call();
        return tx;
    }

    async getTotalBalance() {
        const tx = await this.instance.methods.getTotalBalance(this.W.getAddress()).call();
        return tx;
    }

    async getOutStandingInterest() {
        const tx = await this.instance.methods.getOutStandingInterest(this.W.getAddress()).call();
        return tx;
    }

    async getStack() {
        const tx = await this.instance.methods.getStack(this.W.getAddress()).call();
        return tx;
    }

    async getTotalInterest() {
        const events = await this.instance.getPastEvents("InterestClaimed",{fromBlock: 0, filter: {"_receiver": this.W.getAddress()}});
        
        let totalInterest = 0;

        for (const event of events) {
            totalInterest += parseFloat(event.returnValues._interestEarned);
        }
        totalInterest = totalInterest / 1e18
        return totalInterest;
    }

    async getRecipe() {
        const tx = await this.instance.methods.getRecipesOf(this.W.getAddress()).call();
        const recipes = tx.recipes;

        if(recipes.length == 0) {
            return "DAI";
        }
        
        // loop over all recipes in config
        for (const key in config.recipes) {
            const recipeData = this.parseRecipeData(key);
            let invalid = false;
            // loop over all recipes returned from the blockchain
            for(let i = 0; i < recipes.length; i ++) {
                if( 
                    recipeData.receivers.length == 0 ||
                    recipes[i].receiver.toLowerCase() != recipeData.receivers[i].toLowerCase() ||
                    recipes[i].data.toLowerCase() != recipeData.data[i].toLowerCase() ||
                    recipes[i].ratio != recipeData.ratios[i].toLowerCase()
                ){
                    invalid = true;
                    break;
                }
            }
            if(!invalid) {
                // alert(key);
                return(key);
            }
        }
    }

    async getApr() {
        const tx = await this.instance.methods.supplyInterestRate().call();
        return tx;
    }

    // TODO consider caching state if requested multiple times during the same block
    async getState() {
        const TotalInterest = await this.getTotalInterest();
        const Recipe = await this.getRecipe();
        const Stack = await this.getStack();
        const OutStandingInterest = await this.getOutStandingInterest() / 1e18;
        const TotalBalance = from1e18(await this.getTotalBalance());
        const Balance = from1e18(await this.getBalance());
        //const Balance = await this.getBalance());
        const Earned = parseFloat(TotalBalance) - parseFloat(Balance);
        const BalanceDAI = await this.getBalanceUnderlying() / 1e18;
        const Apr = (await this.getApr() / 1e18).toFixed(2);
        const needAllowance = await this.needAllowance();

        return {
            Recipe,
            Stack,
            OutStandingInterest,
            TotalInterest,
            TotalBalance,
            Balance,
            Earned,
            BalanceDAI,
            Apr,
            needAllowance
        }
    }

}

export default DDAI;