class Shop {
    constructor(shopName, currency) {
        this.productsList = [];
        this.usersList = [];
        this.shop = shopName;
        this.currency = currency
    }
    intro() {
        console.log(`Hi, we are "${this.shop}".\nUse .items() method to get list of items to purchase.\nUse .order() method to get your order details.`);
    };

    addItem(item, price) {

        if (!this.isValidProductName(item) ||
            !this.isValidPrice(price)) {
            return false;
        }
        let product = item;
        let kaina = (price / 100);
        const kainaToShow = kaina.toFixed(2);
        this.productsList.push({ product, kaina });

        console.log(`"Meskiuko kioskas" sells ${product} for ${kainaToShow} ${this.currency} now!`);
    };

    items() {
        console.log('Items for sale at "Meskiuko kioskas":');
        console.log('====================');

        for (let i = 0; i < this.productsList.length; i++) {
            const item = this.productsList[i];
            console.log(`${i + 1}) ${item.product} - ${(item.kaina).toFixed(2)} EUR;`);
        }
        console.log('====================');
    };

    updatePrice(name, newPrice) {
        let updatedProduct = this.productsList.find(item => item.product === name)
        updatedProduct.kaina = (newPrice / 100);
    };

    createCart(owner) {
        if (!this.isValidUserName(owner)) {
            return false
        }
        this.usersList.push({ owner, items: [] })
        console.log(`${owner} have an open cart at "${this.shop}"!`);
    };

    addItemToCart(owner, index, index2) {
        // let user = this.usersList.find(owner);
        // console.log(user);
        // for (let i = 0; i < this.productsList.length; i++) {
        //     const product = this.productsList[i];
        //     if ((index - 1) === i) {
        //         this.usersList[owner].items.push({ product });
        //     }
        // }
        console.log(this.usersList[items]);
    };

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
    isValidUserName(name) {
        if (typeof name !== 'string' ||
            name === '' ||
            name === undefined ||
            name.length < 2 ||
            name[0] !== name[0].toUpperCase()) {
            console.error('ERROR: wrong user name, must be atleast two letters, first uppercase string');
            return false;
        }
        return true;
    };
}
module.exports = Shop;