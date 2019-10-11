import { BasePlugin } from 'eth-dexcore-js';
import BigNumber from 'bignumber.js';
import DDAIArtifact from './artifacts/DDAI.json';
import MockDai from './artifacts/MockDai.json';
import get from 'lodash/get';
import CONF from '../config';
import findKey from 'lodash/findKey';


const config = CONF[CONF.selectedNetwork];

const getRecipeByname = (name) => {
    return findKey(config.recipes, {label: name});
};

export const to1e18 = (amount, decimals = 18) => new BigNumber(amount.toString())
  .multipliedBy(new BigNumber(10).pow(new BigNumber(decimals))).toString();

export const from1e18 = (amount, decimals = 18) => new BigNumber(amount.toString())
    .dividedBy(new BigNumber(10).pow(new BigNumber(decimals))).toString();

export const UNLIMITED_ALLOWANCE_IN_BASE_UNITS = new BigNumber(2).pow(256).minus(1);
const mockDaiAddress = '0xC4375B7De8af5a38a93548eb8453a498222C4fF2';

const BuyTokenRecipe = getRecipeByname('BuyTokenRecipe')


/**
Using DAI deployed at: 0xC4375B7De8af5a38a93548eb8453a498222C4fF2
Deployed MockRep at: 0xa0b8269abe6ab119f8456b2703ffcd14cd51111b
Using Fulcrum IDAI deployed at: 0xA1e58F3B1927743393b25f261471E1f2D3D9f0F6
Deployed mockCDai at: 0xe212622a92ed6af5b00b73d4ab6083297287890f
Deployed mockCEth at: 0xbcdb82128b2cd917d6cbe7f431e1902027dfe90a
Deployed mockCrep at: 0x2ff5e059297c3d28f12030e1c19d9d67fcebf1f9
Using Kyber network deployed at: 0x692f391bCc85cefCe8C237C01e1f636BbD70EA4D
Deployed DDAI at: 0x834561946af99add27be66ac7e855945dbb2d99c
Deployed CompoundRepayRecipe at: 0xc5ccacf9fd3bf5007bfd9b10e1b739b852b00101
Deployed MockRecipe: 0x26facbff9b4d9dcf9f28bb622390e05a0e81bf0c
Deployed BuyTokenRecipe: 0xa8848f4569371ddcdcd1e2c4729d4387561e7d61
Deployed buyPTokenRecipe: 0xb90d6ff9d855c9c3a0bb84d04f7bc3d46768a109
 */
class DDAI extends BasePlugin {
    constructor(walletInstance) {
        super(walletInstance);

        this.contractAddress = '0x834561946af99add27be66ac7e855945dbb2d99c';
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

        if( await this.needAllowance(amount) ) {
            await this.giveAllowance();
        }

        const data = this.W.web3.eth.abi.encodeParameters( 
            ['address','address'], 
            [outputToken, this.W.getAddress()]
        );

        console.log('data', data)

        const ratio = new BigNumber('100').toString();
        const srcAmount = to1e18(amount);
        const tx = await this.instance.methods.mintAndSetRecipes(srcAmount, [BuyTokenRecipe], [ratio], [data]).send({from: this.W.getAddress()});
        return tx;
    }

    async claimInterest() {
        const tx = await this.instance.methods.claimInterest(this.W.getAddress()).send({from: this.W.getAddress()});
        return tx;
    }

    async distributeStack() {
        const tx = await this.instance.methods.distributeStack(this.W.getAddress()).send({from: this.W.getAddress()});
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
            const recipe = config.recipes[ this.W.web3.utils.toChecksumAddress(re.receiver)] || null;
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
        const needAllowance = await this.needAllowance();

        return {
            Recipes,
            Stack,
            OutStandingInterest,
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