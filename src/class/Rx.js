import find from 'lodash/find';

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
        this.interval = 15000;
        this.handle = null;
        this.listeners = [];
    }

    startPoller() {
        if(this.handle) return;

        //this.checkPending();
        // this.handle = setInterval(this.checkPending.bind(this), this.interval);
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
        console.log('ok', action, tx, this.listeners);
        this.listeners.forEach( (l) => {
                l(action, tx);
        }, this);
    }
}

export default Rx;