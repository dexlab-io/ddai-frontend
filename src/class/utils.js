export default class U {
    static formatFiat = (value, separator=',', decimal='.') => {
        if(!value) return;
        try {
            const values = value.toString().replace(/^-/, '').split('.');
            const dollars = values[0];
            const cents = values[1];
            const groups = /(\d)(?=(\d{3})+\b)/g;
            return '#'.replace('#', `${dollars.replace(groups, '$1' + separator)}${cents ? decimal + cents : ''}`)
        } catch(e) {
            console.error(e);
            return value;
        }
    }
}