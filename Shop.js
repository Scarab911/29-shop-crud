class Shop {
    constructor(shopName, currency) {
        this.productsList = [];
        this.usersList = [];
        this.shop = shopName;
        this.currency = currency

        this.totalItemsSold = 0;
        this.ordersCompleted = 0;
        this.ordersInProgress = 0;
        this.profit = 0;
        this.possibleProfit = 0;


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
        this.productsList.push({ product, kaina: price, available: true });

        console.log(`"Meskiuko kioskas" sells ${product} for ${kainaToShow} ${this.currency} now!`);
    };

    items() {
        console.log('Items for sale at "Meskiuko kioskas":');
        console.log('====================');
        let idCount = 0;
        for (let i = 0; i < this.productsList.length; i++) {
            const item = this.productsList[i];
            if (item.available) {
                idCount++;

                console.log(`${idCount}) ${item.product} - ${((item.kaina) / 100).toFixed(2)} EUR;`);
            }
        }
        console.log('====================');
    };

    updatePrice(name, newPrice) {
        let updatedProduct = this.productsList.find(item => item.product === name)
        updatedProduct.kaina = (newPrice);
    };

    createCart(owner) {
        if (!this.isValidUserName(owner)) {
            return false
        }
        this.usersList.push({ owner, items: [], isPaid: false })
        console.log(`${owner} have an open cart at "${this.shop}"!`);
    };

    addItemToCart(name, id, count) {
        if (!this.isValidUserName(name)) {
            return false
        }
        /*check if buyer exists, if not add it to the list */
        const isPerson = this.usersList.some(person => person.owner === name)

        if (!isPerson) {
            this.createCart(name);
        }

        /* Checks if cart already been paid out or not */
        if (!this.isPaid(name)) {
            console.log(`----------`);
            return false
        }
        /*Checks if item available */


        if (!this.productsList[id - 1].available) {
            console.log(`-----STOP-----`);
            console.log(`Item is out of stock!`)
            console.log(`-----STOP-----`);
            return false
        }

        //adds items to cart
        for (let cart of this.usersList) {
            if (cart.owner === name) {
                cart.items.push({ id, count })
            }
        }
    };

    order(name) {
        if (!this.isValidUserName(name)) {
            return false
        }

        for (let cart of this.usersList) {
            if (cart.owner === name) {
                console.log(`${name} pilnas uzsakymas`, cart);
            }
        }
    };

    orderPrice(name) {
        if (!this.isValidUserName(name)) {
            return false
        }

        let cart = [];
        for (const user of this.usersList) {
            if (user.owner === name) {
                cart = user.items;
                break;
            }
        }

        let needToPay = 0;
        for (let i = 0; i < cart.length; i++) {
            const product = cart[i];
            const index = product.id - 1;
            needToPay += product.count * this.productsList[index].kaina;
        }
        console.log(`${name} order: ${(needToPay / 100).toFixed(2)} ${this.currency}`);
        return needToPay;

    };

    removeItem(item) {
        for (const daiktas of this.productsList) {

            if (daiktas.product === item) {
                daiktas.available = false;
            }
        }
    };

    pay(name, cash) {

        const moketi = this.orderPrice(name);
        const graza = cash - moketi;

        if (graza < 0) {
            console.log('Need more money!');
            return false;
        }
        if (graza === 0) {
            console.log(`Thank you for purchasing at "${this.shop}"!`);

        }
        else {
            console.log(`Here is your ${(graza / 100).toFixed(2)} ${this.currency} change!\nThank you for purchasing at "${this.shop}"!`);
        }
        for (const user of this.usersList) {
            if (user.owner === name) {
                user.isPaid = true;
                this.profit += moketi;
                ++this.ordersCompleted
                break;
            }
        }

    };

    shopSummary() {
        this.itemsSold()
        //galimas uzdarbis
        this.turnOver();

        //viso uzsakymu
        this.ordersInProgress = this.totalOrders() - this.ordersCompleted;
        //parduotuves isklotine
        let summary = `Items sold: ${this.totalItemsSold}\nOrders completed: ${this.ordersCompleted}\nOrders in progress: ${this.ordersInProgress}\nProfit: ${((this.profit) / 100).toFixed(2)} ${this.currency}\nPossible profit: ${((this.possibleProfit) / 100).toFixed(2)} ${this.currency}';`

        console.log(`Summary for the "${this.shop}"`);
        console.log('====================');
        console.log(summary);
        console.log('====================');
    };

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
    isPaid(name) {
        for (const user of this.usersList) {
            if (user.owner === name &&
                user.isPaid === true) {
                console.log(`-----STOP-----`);
                console.error(`You can not add items to already paid cart!`);
                console.log(`-----STOP-----`);
                return false
            }
        } return true;
    }
    itemsSold() {
        let soldItems = [];
        for (const cart of this.usersList) {
            if (cart.isPaid) {
                soldItems = soldItems.concat(cart.items);
            }
            this.ordersInProgress++
        }

        for (let sold of soldItems) {
            this.totalItemsSold += sold.count;
        }
    }
    totalOrders() {
        let totalOrders = 0;
        for (const cart of this.usersList) {
            totalOrders++;
        }
        return totalOrders
    }
    turnOver() {
        let turnOver = 0;
        for (let cart of this.usersList) {
            turnOver += this.orderPrice(cart.owner);
        }
        this.possibleProfit = turnOver - this.profit;
    }
}
module.exports = Shop;