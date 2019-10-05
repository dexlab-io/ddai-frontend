import { BasePlugin } from 'eth-dexcore-js';
import BigNumber from 'bignumber.js';
import DDAIArtifact from './artifacts/DDAI.json';
import MockDai from './artifacts/MockDai.json';

// Deployed MockDai at: 0xa2f0e8d71259dc32e7ce60e1ac0cbd89acae2e44
// Deployed MockIToken at: 0xc857921fb65039dfc9a311f95a2dd6b8e6144cee
// Deployed MockKyberNetwork at: 0xbd4581e6129b7a9558feba0fdec5c5784a9f5c1f
// Deployed DDAI at: 0xa05858f539652d6386250394eb6e3b08d7b4e1fd
// Deployed MockRecipe: 0x4d4d76abc71342a237fa0ec7749bf94859d2dba4
// Deployed BuyEthRecipe: 0x9000087e8617a35c0d9f18dd24b593caaf4661a9
// Deployed buyPTokenRecipe: 0x1a03c9137a31fdf4c4fad3119599d85cbbd1a8c1

export const UNLIMITED_ALLOWANCE_IN_BASE_UNITS = new BigNumber(2).pow(256).minus(1);
const mockDaiAddress = '0xa2f0e8d71259dc32e7ce60e1ac0cbd89acae2e44';
const BuyEthRecipe = '0x9000087e8617a35c0d9f18dd24b593caaf4661a9';

class DDAI extends BasePlugin {
    constructor(walletInstance) {
        super(walletInstance);

        this.contractAddress = '0xa05858f539652d6386250394eb6e3b08d7b4e1fd';
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
        const srcAmount = new BigNumber(amount.toString()).toString();

        const tx = await this.instance.methods.mint(this.W.getAddress(), srcAmount).send({from: this.W.getAddress()});
        console.log('tx', tx);
        return tx;
    }

    async redeem(amount) {
        const srcAmount = this.W.web3.utils.toWei(amount.toString());

        const supplyTxData = await this.instance.methods.redeem(this.W.getAddress(), srcAmount).encodeABI();
        const supplyTxGas = await this.instance.methods.redeem(this.W.getAddress(), srcAmount).estimateGas();

        console.table({
            txGas: supplyTxGas,
            amount: amount,
            data: supplyTxData
        })

        const tx = await this.instance.methods.redeem(this.W.getAddress(), srcAmount).send({from: this.W.getAddress()});
        console.log('tx', tx);
        return tx;
    }

    async addRecipe() {
        const data = this.W.web3.eth.abi.encodeParameters( 
            ['address','address'], 
            ['0x9000087e8617a35c0d9f18dd24b593caaf4661a9', this.W.getAddress()]
        );

        const ratio = new BigNumber('100').toString();
        const tx = await this.instance.methods.addRecipe(BuyEthRecipe, ratio, data).send({from: this.W.getAddress()});
        console.log('tx', tx);
        return tx;
    }

    async claimInterest() {
        const tx = await this.instance.methods.claimInterest(this.W.getAddress()).send({from: this.W.getAddress()});
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
        return tx;
    }

    async getState() {

        const Recipes = await this.getRecipes();
        const Stack = await this.getStack();
        const OutStandingInterest = await this.getOutStandingInterest();
        const TotalBalance = await this.getTotalBalance();
        const Balance = await this.getBalance();

        return {
            Recipes,
            Stack,
            OutStandingInterest,
            TotalBalance,
            Balance
        }
    }

}

export default DDAI;