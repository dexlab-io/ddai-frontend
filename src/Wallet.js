import { EthereumHDWallet } from 'eth-dexcore-js';
import DDAI from './class/ddai'
import Rx from './class/Rx';

const wallet = new EthereumHDWallet();

wallet.addPlugin('ddai', DDAI);
wallet.Rx = new Rx(wallet);
window.Wallet = wallet;


export { wallet as default }