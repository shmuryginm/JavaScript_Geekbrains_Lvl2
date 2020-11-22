/**
 * Данный файл служит для проверки реализации различных сущностей
*/

/**
 * Продукт
*/
class ProductTest {
    _id
    _name
    _price

    /**
     * @constructor
     * 
     * @param {number} id 
     * @param {string} name 
     * @param {number} price 
     */
    constructor(id, name, price) {
        this._id = id
        this._name = name
        this._price = price
    }
}


class PromiseTest {

    /**
     * Список продуктов
    */
    static Items = []


    /**
    * Получаем данные о товарах с сервера
    * 
    * @returns {object} Массив товаров интернет магазина
    * 
    */ 
    static _getProducts() {
        
        let tableNumber = 1
        let tablePath = `${document.location.href}database/products${tableNumber}.json`

        const result = fetch(tablePath)
        //Необходимо вернуть промис, так как далее асинхроность пойдёт по цепочке
        return result

        //Это ответ от сервера
        .then(resp => {
            //Это json, который мы "вытащили" из ответа сервера
            return resp.json()
        })
        //а это уже необходимый нам масиив данных
        .then(data => {
            return data.products
        })
        .catch(err => {
            console.error("Ошибка!", err)
        })
    }


    static _getProductsList() {

        return new Promise((resolve, reject) => {

            try {
                this._getProducts()
                .then((products) => {
                    products = products.map(cur => {
                        return new ProductTest(cur.id, cur.name, cur.price)
                    })

                    this.Items.push(...products)

                    resolve()
                })
            }
            catch (ex) {
                reject(ex)
            }

        })
    }


    static _incPrice() {

        return new Promise((resolve, reject) => {

            this._getProductsList()
            .then( () => {
                console.log("1. inside _incPrice", this.Items.length)

                this.Items.forEach( (item) => {
                    item.price += 10
                })

                console.log("2. inside _incPrice", this.Items)

                resolve()
            })
            .catch (() => { reject() })
        })
    }


    static test() {

        let promise = this._incPrice()
        .then( () => {
            console.log("incPrice", this.Items)

            console.log("Output complete")        
        })
    }
}


PromiseTest.test()


function testForEach() {
    Items = [
        { id: 10,  name: "Shirt",     price:  1500 },
        { id: 20,  name: "Socks",     price:   100 },
        { id: 30,  name: "Jacket",    price:  5000 },
        { id: 40,  name: "Shoes",     price:  7000 },
        { id: 50,  name: "Wooly hat", price:   700 },
        { id: 60,  name: "Glows",     price:   650 },
        { id: 70,  name: "Scarf",     price:   300 },
        { id: 80,  name: "T-shirt",   price:  1200 },
        { id: 90,  name: "Backpack",  price:  9999 },
        { id: 100, name: "Crampon",   price: 11000 },
    ]

    Items.forEach((item) => {
        item.price += 10
    });

    console.log(Items)
}

//testForEach()

