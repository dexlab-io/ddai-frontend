import Airtable from 'airtable';
import orderBy from 'lodash/orderBy';

class Db {
    fields = {};
    product_id = 'rec55ELnRVRJq5dfb';
    data = [];

    constructor() {
        this.base = new Airtable({apiKey: 'key7Ec0RxtnXueqGv'}).base('appJ4azop1GEj6IYR');
        this.setupHelper();
    }

    async setupHelper() {
        return await new Promise( async (resolve, reject) => {
            const data = {};
            const actions = await this.base('actions').select({
                filterByFormula: 'SEARCH("ddai",product_id)'
            })
            
            await actions.eachPage( async (records, fetchNextPage) => {
                    console.log(records);
                    records.forEach( r => {
                        data[r.fields.name] = r.id;
                    })
                    fetchNextPage();
            });
        
            this.fields = data;
            resolve(data)
        });
    }

    async fetchAll() {
        return await new Promise( async (resolve, reject) => {
            const getActionById = this.getActionById.bind(this);
            const data = [];
        
            const actions = await this.base('actions_in_product').select({
                view: "Grid view",
                sort: [{field: "timestamp", direction: "desc"}],
                filterByFormula: `SEARCH("${this.account}",account)`
            })
            
            await actions.eachPage( async (records, fetchNextPage) => {
                    await Promise.all(records.map( async (record) => {
                        const action = await getActionById(record.get('action_id')) 
                        data.push({
                            product: record.get('product_id'),
                            action: action,
                            timestamp: record.get('timestamp'),
                            amount: record.get('amount'),
                            selected_recipe: record.get('selected_recipe'),
                            tx_hash: record.get('tx_hash'),
                        });
                    }) );
                    fetchNextPage();
            });
        
            this.data = orderBy(data, ['timestamp'], ['desc']);
            resolve(data)
        });
    }

    async setRecipe(recipe = '', account, tx_hash, status) {
        try {
            await this.base('actions_in_product').create([
                {
                  "fields": {
                    product_id: [this.product_id],
                    action_id: [ this.fields['set-recipe-kovan'] ],
                    selected_recipe: recipe,
                    tx_hash,
                    status,
                    account: account,
                    timestamp: new Date(),
                  }
                }
            ]);
        } catch (e) {
            console.log(e);
        }
        this.fetchAll();
    }

    async mint(amount, token, account, usd_val = 0, status = '') {
        try {
            await this.base('actions_in_product').create([
                {
                  "fields": {
                    product_id: [this.product_id],
                    action_id: [ this.fields['mint-kovan'] ],
                    amount: parseFloat(amount),
                    token,
                    usd_val: parseFloat(amount),
                    timestamp: new Date(),
                    account: account,
                    status
                  }
                }
            ]);
        } catch (e) {
            console.log(e);
        }
        this.fetchAll();
    }

    async burn(amount, token, account, usd_val = 0, tx_hash, status) {
        try {
            await this.base('actions_in_product').create([
                {
                  "fields": {
                    product_id: [this.product_id],
                    action_id: [ this.fields['burn-kovan'] ],
                    amount: parseFloat(amount),
                    token,
                    usd_val: parseFloat(amount),
                    timestamp: new Date(),
                    tx_hash,
                    account: account,
                    status
                  }
                }
            ]);
        } catch (e) {
            console.log(e);
        }
        this.fetchAll();
    }

    async claim(recipe, account, tx_hash, status) {
        try {
            await this.base('actions_in_product').create([
                {
                  "fields": {
                    product_id: [this.product_id],
                    action_id: [ this.fields['claim-kovan'] ],
                    amount: 0,
                    token: '',
                    usd_val: 0,
                    timestamp: new Date(),
                    account: account,
                    selected_recipe: recipe,
                    tx_hash,
                    status
                  }
                }
            ]);
        } catch (e) {
            console.log(e);
        }
        this.fetchAll();
    }

    async getActionById(id) {
        return new Promise((resolve, reject) => {
          const processRecord = (err, record) => {
            if (err) {
              reject(err);
              return;
            }
            const id = { id:record.id };
            const fields = record.fields;
            record = {...id, ...fields};
            resolve(record);
          };
          this.base('actions').find(id, processRecord);
        });
    };
}


const Action = new Db();

export default Action;