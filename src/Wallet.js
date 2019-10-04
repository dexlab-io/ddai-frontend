import { EthereumHDWallet } from 'eth-dexcore-js';
import DDAI from './class/ddai'

const wallet = new EthereumHDWallet();

wallet.addPlugin('ddai', DDAI);

window.Wallet = wallet;
export default wallet;