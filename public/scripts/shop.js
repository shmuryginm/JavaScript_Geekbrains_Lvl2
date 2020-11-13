/**
 * Файл представляет набор классов для описания работы интернет магазина
 */

 /**
  * Класс представляет товар в интернет магазине
  */
class InetShopProduct {
    /**
     * Идентификатор товара */
     _id

     /**
      * Наименование товара */
     _name

     /**
      * Цена товарв */
     _price

     /**
      * @constructor
      * 
      * @param {number} {id}    - Идентификатор товара
      * @param {string} {name}  - Наименование товара
      * @param {number} {price} - Цена товарв
      */
     constructor(id, name, price) {
        this._id = id
        this._name = name
        this._price = price
     }

     /**
      * Все свойства класса предназначены только для чтения */
     get ID() {
        return this._id
     }

     get Name() {
         return this._name
     }

     get Price() {
         return this._price
     }
}


/***
 * Класс представляет собой товар в корзине пользователя
 */
class BacketProduct extends InetShopProduct {
    /**
     * Количество товара в корзине */
    _count = 0

    /**
      * @constructor
      * 
      * @param {number} {id}    - Идентификатор товара
      * @param {string} {name}  - Наименование товара
      * @param {number} {price} - Цена товарв
    */
    constructor(id, name, price) {
        super(id, name, price)
    }

    /**
     * Данное свойство только для чтения */
    get Count() {
        return this._count
    }

    /**
     * Метод увеличивает кол-во товара в корзине на единицу */
    incCount() {
        this._count++
    }

    /**
     * Метод уменьшает кол-во товара в корзине на единицу (если кол-во > 0)
     */
    decCount() {
        if (this.count > 0) {
            this._count--
        }
    }

}


/**
 * Класс представляет абстрактный список товаров
 */
class ProductsList {
    /**
     * Список товаров */
    Items = []

    /**
     * @constructor 
    */
    constructor() { }

    /**
     * Метод отображает список товаров */
    render() { }
}


/** 
 * Класс представляет список товаров в интернет магазине 
 */
class InetShopProductsList extends ProductsList {

    /**
     * @constructor
     */
    constructor() {
        super()
    }

    /**
     * Заглушка - имитатор запроса на сервер
     * Возвращает массив свойств товаров интернет магазина
    */ 
    _getProducts() {
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
    }

    /**
     * Метод из массива свойств товаров получает массив объектов */
    getProductsList() {
        //Забираем массив товаров, на основе которых будем создавать объекты товаров
        let products = this._getProducts()

        //Преобразуем массив свойств товаров в массив объектов
        //Метод map() позволяет вызвать переданную функцию один раз для каждого элемента массива, 
        //формируя новый массив из результатов вызова этой функции.
        products = products.map(cur => {
            return new InetShopProduct(cur.id, cur.name, cur.price)
        })

        // Создадим список товаров в интернет магазине
        //spread-оператор ... позволяет взять значения из массива по отдельности
        this.Items.push(...products)
    }

    /**
     * Метод возвращает индекс в массиве товаров по ИД товара
     * 
     * @param {number} {id} - Идентификатор товара
    */
    getIndexFromID(id) {

        // TODO реализовать перебор массива объектов

    }

    /**
     * Метод отображает перечень товаров интернет магазина */
    render() {
        console.log(this.Items)
    }
}


/**
 * Класс представляет список товаров в корзине пользователя
 */
class BasketProductsList extends ProductsList {

    _inetShopProductsList

    /**
     * @constructor
     */
    constructor(inetShopProductsList) {
        super()

        this._inetShopProductsList = inetShopProductsList
    }

    /**
     * Метод добавляет товар с ИД id в список товаров корзины
     */
    add(id) {
        // TODO Добавление элемента в массив
        //this.Items.push()
    }

} 


/**
 * Основной модуль
 */
function main () {
    //Создадим объект для хранения списка товаров интернет магазина
    interShopProductList = new InetShopProductsList()

    //Получим список товаров интернет магазина
    interShopProductList.getProductsList()

    //Выведем список товаров интернет магазина
    interShopProductList.render()
}


main()
