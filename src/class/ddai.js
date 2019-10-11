import { BasePlugin } from 'eth-dexcore-js';
import BigNumber from 'bignumber.js';
import DDAIArtifact from './artifacts/DDAI.json';
import MockDai from './artifacts/MockDai.json';
import get from 'lodash/get';
import CONF from '../config';

// Using DAI deployed at: 0xC4375B7De8af5a38a93548eb8453a498222C4fF2
// Using IDAI deployed at: 0xA1e58F3B1927743393b25f261471E1f2D3D9f0F6
// Using Kyber network deployed at: 0x118A7b23B7a2e6A57963d017A7E76A4E2636F075
// Deployed DDAI at: 0x2d1cb51c51c68f392e5dc3bfedbff70ee8525381
// Deployed MockRecipe: 0xe9fa587b90e0ee5080eb533ef858c1797e87d25e
// Deployed BuyTokenRecipe: 0xffe99a9a259a2af1c2d9e9902e8d322e6ca38fb1
// Deployed buyPTokenRecipe: 0x8dea7ab2236f9cb907f44e34dcbeedba1078d0e4

export const to1e18 = (amount, decimals = 18) => new BigNumber(amount.toString())
  .multipliedBy(new BigNumber(10).pow(new BigNumber(decimals))).toString();

export const from1e18 = (amount, decimals = 18) => new BigNumber(amount.toString())
    .dividedBy(new BigNumber(10).pow(new BigNumber(decimals))).toString();

export const UNLIMITED_ALLOWANCE_IN_BASE_UNITS = new BigNumber(2).pow(256).minus(1);
const mockDaiAddress = '0xC4375B7De8af5a38a93548eb8453a498222C4fF2';
const BuyTokenRecipe = '0xffe99a9a259a2af1c2d9e9902e8d322e6ca38fb1';

class DDAI extends BasePlugin {
    constructor(walletInstance) {
        super(walletInstance);

        this.contractAddress = '0x2d1cb51c51c68f392e5dc3bfedbff70ee8525381';
        this.instance = new this.W.web3.eth.Contract(DDAIArtifact.compilerOutput.abi, this.contractAddress);
        this.mockdai = new this.W.web3.eth.Contract(MockDai.compilerOutput.abi, mockDaiAddress);
        
        //console.clear();
    }

    async gimeMeDAI(amount) {
        const srcAmount = this.W.web3.utils.toWei(amount.toString());
        const supplyTxData = await this.mockdai.methods.mintTo(this.W.getAddress(), srcAmount).encodeABI();
        const supplyTxGas = await this.mockdai.methods.mintTo(this.W.getAddress(), srcAmount).estimateGas();
        const nonce = await this.W.getNonce();
        const tx = await this.mockdai.methods.mintTo(this.W.getAddress(), srcAmount).send({from: this.W.getAddress()});
    }

    async needAllowance(amount) {
        const allowance = await this.W.checkTokenAllowanceForAddress(this.contractAddress , mockDaiAddress);
        const BNamount = new BigNumber(amount.toString()).multipliedBy( new BigNumber(10).pow( new BigNumber(18)) );
        const BNtokenAllowance = new BigNumber( allowance.toString() )
        return !BNtokenAllowance.isGreaterThanOrEqualTo( BNamount );
    }

    async giveAllowance(benificiary = this.contractAddress ) {
        const unlimitedApprove = this.W.web3.utils.toWei( this.W.web3.utils.toBN(UNLIMITED_ALLOWANCE_IN_BASE_UNITS).toString() ).toString();
        const approveTransactionTx = await this.mockdai.methods.approve(benificiary, unlimitedApprove).send({from: this.W.getAddress()});
        return approveTransactionTx;
    }

    async mint(amount) {
        if( await this.needAllowance(amount) ) {
            await this.giveAllowance();
        }
        const srcAmount = to1e18(amount);
        const tx = await this.instance.methods.mint(this.W.getAddress(), srcAmount).send({from: this.W.getAddress()});
        return tx;
    }

    async redeem(amount) {
        const srcAmount = to1e18(amount);
        const tx = await this.instance.methods.redeem(this.W.getAddress(), srcAmount).send({from: this.W.getAddress()});
        return tx;
    }

    async addRecipe() {
        const data = this.W.web3.eth.abi.encodeParameters( 
            ['address','address'], 
            [BuyTokenRecipe, this.W.getAddress()]
        );

        const ratio = new BigNumber('100').toString();
        const tx = await this.instance.methods.addRecipe(BuyTokenRecipe, ratio, data).send({from: this.W.getAddress()});
        return tx;
    }

    async mintAndSetRecipes(amount, outputToken) {
        const data = this.W.web3.eth.abi.encodeParameters( 
            ['address','address'], 
            [outputToken, this.W.getAddress()]
        );

        const ratio = new BigNumber('100').toString();
        const srcAmount = to1e18(amount);
        const tx = await this.instance.methods.mintAndSetRecipes(srcAmount, [BuyTokenRecipe], [ratio], [data]).send({from: this.W.getAddress()});
        return tx;
    }

    async claimInterest() {
        const tx = await this.instance.methods.claimInterest(this.W.getAddress()).send({from: this.W.getAddress()});
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

    async getRecipes() {
        const tx = await this.instance.methods.getRecipesOf(this.W.getAddress()).call();
        return tx.recipes.map( re => {
            const recipe = CONF.kovan.recipes[re.receiver] || null;
            if(recipe) {
                const values = this.W.web3.eth.abi.decodeParameters(recipe.signature, re.data );
                recipe.outputToken = values[0];
                recipe.benificiary = values[1];
            }
            return recipe || null;
        })
    }

    async getApr() {
        const tx = await this.instance.methods.supplyInterestRate().call();
        return tx;
    }

    async getState() {

        const Recipes = await this.getRecipes();
        const Stack = await this.getStack();
        const OutStandingInterest = await this.getOutStandingInterest();
        const TotalBalance = from1e18(await this.getTotalBalance());
        const Balance = from1e18(await this.getBalance());
        //const Balance = await this.getBalance());
        const Earned = parseFloat(TotalBalance) - parseFloat(Balance);
        const BalanceDAI = await this.getBalanceUnderlying() / 1e18;
        const Apr = (await this.getApr() / 1e17).toFixed(2);

        return {
            Recipes,
            Stack,
            OutStandingInterest,
            TotalBalance,
            Balance,
            Earned,
            BalanceDAI,
            Apr
        }
    }

}

export default DDAI;