class Shop {
    constructor() {
        this.productsList = [];

    }
    intro() {
        console.log('Hi, we are "Meskiuko kioskas"');
    };

    addItem(item, price) {

        if (!this.isValidProductName(item) ||
            !this.isValidPrice(price)) {
            return false;
        }
        let product = item;
        let kaina = price / 100;
        this.productsList.push({ product, price });

        console.log(`"Meskiuko kioskas" sells ${product} for ${kaina} EUR now!`);
    };

    items() {
        console.log('Items for sale at "Meskiuko kioskas":');
        console.log('====================');

        for (let i = 0; i < this.productsList.length; i++) {
            const item = this.productsList[i];
            console.log(`${i + 1}) ${item.product} - ${item.price} EUR;`);
        }
        console.log('====================');
    };

    updatePrice() { };

    createCart() { };

    addItemToCart() { };

    order() { };

    orderPrice() { };

    removeItem() { };

    pay() { };

    shopSummary() { };

    isValidProductName(itemName) {
        if (typeof itemName !== 'string' ||
            itemName === '' ||
            itemName !== itemName.toLowerCase()) {
            console.error('ERROR: Item name has to be non empty and all lower case string');
            return false
        }
        return true;
    }
    isValidPrice(price) {
        if (typeof price !== 'number' ||
            price < 0 ||
            price % 1 !== 0) {
            console.error('ERROR: price has to be a bigger than 0 integer');
            return false;
        }
        return true;
    }
}
module.exports = Shop;