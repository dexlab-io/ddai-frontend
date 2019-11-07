import find from 'lodash/find';
import { Transaction } from 'eth-dexcore-js';

class Rx {

    static TX_STATES = {
        BROADCASTED: 'Broadcasted',
        MINED: 'Mined',
    };

    static ACTIONS = {
        TX_BROADCASTED: '[TransactionPool] Tx Broadcasted',
        TX_MINED: '[TransactionPool] Tx Mined',
    };

    constructor(wallet) {
        this.W = wallet;
        this.poolMap = [];
        this.isPolling = false;
        this.interval = 2000;
        this.handle = null;
        this.listeners = [];
    }

    async checkPending() {
        if(this.shouldStop()){
            return;
        }
        console.log('Checking....', this.poolMap.filter( t => t.statusInternal !== Rx.TX_STATES.MINED ))
        
        this.poolMap
            .filter( t => t.statusInternal !== Rx.TX_STATES.MINED )
            .forEach( async (tx, index)  => {
                if(tx.statusInternal == Rx.TX_STATES.MINED) {
                    return;
                }
                // We need full tx data so we both get the receipt and the tx
                // TODO get this data in parallel
                const resp = await this.W.web3.eth.getTransactionReceipt(tx.hash);
                const resp2 = await this.W.web3.eth.getTransaction(tx.hash);
                tx = {
                    ...tx,
                    ...resp,
                    ...resp2
                };
                if(resp != null && resp.blockNumber > 0) {
                    tx.statusInternal = Rx.TX_STATES.MINED;
                    this.notify(Rx.ACTIONS.TX_MINED, tx);
                    this.shouldStop();
                }
                this.poolMap[index] = tx;
        });
    }

    startPoller() {
        if(this.handle) return;

        this.checkPending();
        this.handle = setInterval(this.checkPending.bind(this), this.interval);
    }

    subscribe(listener) {
        this.listeners.push(listener);

        /**
        * Subscribe should return an unsubscribe function
        */
        return function unsubscribe() {
            const index = this.listeners.indexOf(listener);
            this.listeners.splice(index, 1);
        };
    }

    notify( action, tx ) {
        this.listeners.forEach( (l) => {
                l(action, tx);
        }, this);
    }

    shouldStop() {
        if(this.poolMap.filter( t => t.statusInternal !== Rx.TX_STATES.MINED ).length === 0) {
            clearInterval(this.handle);
            this.handle = null;
            return true;
        }
    }

    get(txHash) {
        return find(this.poolMap, {'hash': txHash});
    }

    getAll() {
        return this.poolMap;
    }

    addFromModel(tx) {
        if(tx.hash && this.get(tx.hash)) return;

        tx.statusInternal = Rx.TX_STATES.BROADCASTED

        this.poolMap.push(tx);
        this.notify(Rx.ACTIONS.TX_BROADCASTED, tx);

        this.startPoller();
    }

    add(txHash, label="Unknown Tx") {
        if(this.get(txHash)) return;

        const tx = Transaction.build({
            statusInternal: Rx.TX_STATES.BROADCASTED,
            hash: txHash,
            label: label
        });

        this.poolMap.push(tx);
        this.notify(Rx.ACTIONS.TX_BROADCASTED, tx);

        this.startPoller();
    }

    async waitForTx(txHash) {
        return new Promise((resolve, reject) => {
                this.add(txHash);
                this.subscribe( (tx) => {                    
                    if(tx.hash === txHash && tx.statusInternal === Rx.TX_STATES.MINED){
                        resolve(tx);
                    }
                })
            }
        );
    }
}

export default Rx;