/** 
 * Класс представляет список товаров в интернет магазине 
*/

import ProductsList from "./ProductsList.js"

export default class InetShopProductsList extends ProductsList {

    /**
      * Количество товаров для одной порции загрузки в список для вывода */
     _chunkSize

     /**
      * Текущее количество товаров в списке для вывода */
     _currentItems

    /**
     * Наименование HTML-блока 
     * в который будем выводить список товаров интернет-магазина
    */
    _querySelectorName


    /**
     * @constructor
     * 
     * @param chunkSize         {number} Количество товаров для одной порции загрузки в список для вывода
     * @param querySelectorName {string} Наименование HTML-блока в который будем выводить список товаров интернет-магазина
     * 
     */
    constructor(chunkSize, querySelectorName) {
        
        super()

        this._querySelectorName = querySelectorName

        this._chunkSize = chunkSize
        this._currentItems = chunkSize
    }

    /**
     * Количество товаров для одной порции загрузки в список для вывода
    */
    get ChunkSize() {
        return this._chunkSize
    }

    /**
     * Количество отображённых товаолв в списке для вывода
    */
    get CurrentItems() {
        return this._currentItems
    }

    /**
     * Наименование HTML-блока в который будем выводить список товаров интернет-магазина
    */
    get QuerySelectorName() {
        return this._querySelectorName
    }


    /**
     * Получаем данные о товарах с сервера (асинхронно!)
     * 
     * @returns {object} Массив товаров интернет магазина
     * 
    */ 
    _getProducts() {
        
        const tableNumber = ""
        
        //const tableNumber = this.CurrentItems / 2
        //console.log(tableNumber)

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
        
        /*
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
            { id: 100, name: "Crampon",   price: 11000 },
        ]
        */
    }


    /**
     * Метод из массива свойств товаров получает массив объектов
    */
    getProductsList() {

        return new Promise((resolve, reject) => {
            //Принимаем промис
            this._getProducts()
            .then((products) => {
                //Преобразуем массив свойств товаров в массив объектов
                //Метод map() позволяет вызвать переданную функцию один раз для каждого элемента массива, 
                //формируя новый массив из результатов вызова этой функции.
                products = products.map(cur => {
                    return new InetShopProduct(cur.id, cur.name, cur.price)
                })

                // Создадим список товаров в интернет магазине
                //spread-оператор ... позволяет взять значения из массива по отдельности
                this.Items.push(...products)

                resolve()
            })
            .catch( () => { 
                reject(this._getProducts.reject())
            })
        })
    }


    /**
     * Метод определяет количество элементов для загрузки
    */
    incCurrentItems() {

        //Текущее количество элементов + ещё одна порция НЕ превышает общее количество товаров?
        if (this._currentItems + this._chunkSize <= this.Items.length) {
            //Увеличиваем количество товаров для вывода
            this._currentItems += this._chunkSize
        }
        else {
            //Выводим все товары
            this._currentItems = this.Items.length
        }
    }
    

    /**
     * Метод формирует HTML-источник для вывода списка товаров на веб-страницу
     * 
     * @returns {string} HTML-источник для вывода списка товаров на веб-страницу
     * 
    */
    _createProductsList() {

        let s = ""

        for (let i = 0; i < this.CurrentItems; i++) {
            let part = 
                `<p>${this.Items[i].Name}, цена: ${this.Items[i].Price}` + 
                ` <button type="button" name="btnProductList_${this.Items[i].ID}" value="${this.Items[i].ID}">+</button></p><br>`

            s = s + part    
        }

        return s
    }


    /**
     * Метод отображает перечень товаров интернет магазина 
    */
    render() {

        //Найдём в документе место для размещения списка товаров интернет магазина
        let placeToRender = document.querySelector("." + this._querySelectorName)

        //Место для вывода оьбнаружено?
        if (placeToRender != null) {
            //Создадим HTML-элемент для вывода списка товаров
            const productList = document.createElement("text")

            productList.classList.add("Products")

            //Получим HTML-источник для вывода на веб-страницу
            let s = this._createProductsList()

            //Очистим поле для вывода товаров
            placeToRender.innerHTML = ""

            //Выводим список товаров на веб-страницу
            productList.innerHTML = s

            placeToRender.appendChild(productList)
        }

        //console.log(...this.Items)
    }
}
