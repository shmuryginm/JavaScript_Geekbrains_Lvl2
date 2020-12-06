/**
 * Данный файл служит для проверки реализации различных сущностей
*/

/**
 * Продукт
*/
class ProductTest {
    /**
     * ИД */
    _id
    /**
     * Наименование */
    _name
    /**
     * Цена */
    _price

    /**
     * @constructor
     * 
     * @param {number} id ИД
     * @param {string} name Наименование
     * @param {number} price Цена
     * 
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
    * Получаем данные о товарах с сервера (синхронно)
    * 
    * @returns {object} Массив товаров интернет магазина
    * 
    */
    static _getProductsSync() {    
        return [
            { id: 10,  name: "Shirt",     price:  1500 },
            { id: 20,  name: "Socks",     price:   100 },
            { id: 30,  name: "Jacket",    price:  5000 },
            { id: 40,  name: "Shoes",     price:  7000 },
            { id: 50,  name: "Wooly hat", price:   700 },
            { id: 60,  name: "Glows",     price:   650 },
            { id: 70,  name: "Scarf",     price:   300 },
            { id: 80,  name: "T-shirt",   price:  1200 },
            { id: 90,  name: "Backpack",  price:  9999 },
            { id: 100, name: "Crampon",   price: 11000 }
        ]
    }

    /**
    * Получаем данные о товарах с сервера (асинхронно!)
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
        .catch ( (err) => {
            resolve(err)
        })
        //а это уже необходимый нам масиив данных
        .then(data => {
            return data.products
        })
        .catch( (err) => {
            resolve(err)
        })
    }


    /**
     * Преобразуем массив свойств товарв (array) в массив товаров (ProductTest)
     */
    static _getProductsList() {

        //Получаем асинхронный ответ и, соответственно, возвращаем промис
        return new Promise((resolve, reject) => {

            //Это асинхронный ответ
            this._getProducts()
            .then((products) => {
                products = products.map(cur => {
                    return new ProductTest(cur.id, cur.name, cur.price)
                })

                this.Items.push(...products)

                resolve()
            })
            .catch( () => { 
                reject( () => { new Error("Ошибка в _getProductsList()") }) 
            })
        })
    }

    /**
     * изменяем цену каждого товара
     */
    static _incPrice() {

        //Получаем асинхронный ответ от вызываемого метода и, соответственно, возвращаем промис
        return new Promise((resolve, reject) => {

            //Это асинхронный ответ
            this._getProductsList()
            .then( () => {
                this.Items.forEach( (item) => {
                    item._price += 10
                })

                resolve()
            })
            .catch ( () => { 
                reject( () => { new Error("Ошибка в _getProductsList()") })
            })
        })
    }


    static test() {

        //Конечная точка. Ждём выполнения асинхронного метода
        this._incPrice()
        .then ( () => {
            console.log("incPrice", this.Items)

            console.log("Output complete")
        })
        .catch( () => {
            console.log("Ошибка _incPrice!")
        })
    }
}


//PromiseTest.test()


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

