import { EthereumHDWallet } from 'eth-dexcore-js';
import DDAI from './class/ddai'
import Rx from './class/Rx';

const wallet = new EthereumHDWallet();

wallet.Rx = new Rx(wallet);
wallet.addPlugin('ddai', DDAI);

window.Wallet = wallet;


export { wallet as default }