import { BasePlugin } from 'eth-dexcore-js';
import BigNumber from 'bignumber.js';
import DDAIArtifact from './artifacts/DDAI.json';
import MockDai from './artifacts/MockDai.json';

// Deployed MockDai at: 0x78135f507244d5c77b278b7ac6770d0532647f06
// Deployed MockIToken at: 0x0549a7f278975b24952a632c06c3ef504d689a1e
// Deployed MockKyberNetwork at: 0xd2e4025c3896b88e7ee59129b56fd15c3cbb54e1
// Deployed DDAI at: 0x05c5819ea65b821b4cf43f79dd4bcd03eac47289
// Deployed MockRecipe: 0xe0d42056769245dff152066bd8317516a983fad1
// Deployed BuyTokenRecipe: 0x11f96c99a5173ad21ea53d9005bf4cc336a69eee
// Deployed buyPTokenRecipe: 0xa4928a8b2f8dc5ee2a52dda0ae942e506dfdd240

export const UNLIMITED_ALLOWANCE_IN_BASE_UNITS = new BigNumber(2).pow(256).minus(1);
const mockDaiAddress = '0x78135f507244d5c77b278b7ac6770d0532647f06';
const BuyEthRecipe = '0x11f96c99a5173ad21ea53d9005bf4cc336a69eee';

class DDAI extends BasePlugin {
    constructor(walletInstance) {
        super(walletInstance);

        this.contractAddress = '0x05c5819ea65b821b4cf43f79dd4bcd03eac47289';
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
        return tx;
    }

    async redeem(amount) {
        const srcAmount = new BigNumber(amount.toString()).toString();
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
        return tx;
    }

    async getState() {

        const Recipes = await this.getRecipes();
        const Stack = await this.getStack();
        const OutStandingInterest = await this.getOutStandingInterest();
        const TotalBalance = await this.getTotalBalance();
        const Balance = await this.getBalance();
        const Earned = TotalBalance - Balance;
        const BalanceDAI = await this.getBalanceUnderlying() / 1e18;

        return {
            Recipes,
            Stack,
            OutStandingInterest,
            TotalBalance,
            Balance,
            Earned,
            BalanceDAI
        }
    }

}

export default DDAI;