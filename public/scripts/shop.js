/**
 * Файл представляет набор классов для описания работы интернет магазина
 */

 /**
  * Класс представляет абстрактный товар
  */
 class Product {
    /**
     * Идентификатор товара */
    _id

    /**
      * @constructor
      * 
      * @param {number} {id} - Идентификатор товара
    */
     constructor(id) {
        this._id = id
     }

     get ID() {
        return this._id
     }
}


 /**
  * Класс представляет товар в интернет магазине
  */
class InetShopProduct extends Product {
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
        super(id)

        this._name = name
        this._price = price
     }

     /**
      * Все свойства класса предназначены только для чтения */
     get Name() {
         return this._name
     }

     get Price() {
         return this._price
     }
}


/***
 * Класс представляет товар в корзине пользователя
 */
class BasketProduct extends InetShopProduct {
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
        if (this._count > 0) {
            this._count--
        }
    }
}


/**
 * Класс представляет абстрактный список товаров
 */
class ProductsList {
    /**
     * Массив свойств товаров */
    Items = []

    /**
     * @constructor 
    */
    constructor() { }

    /**
     * Метод возвращает индекс в массиве товаров по ИД товара
     * 
     * @param {number} {id} - Идентификатор товара
     * 
     * @returns {number} - Индекс в массиве товаров по ИД товара. -1 - если массив пустой
    */
    getIndexFromID(id) {
        if (this.Items.length == 0) {
            return -1
        }

        let i = 0

        while (i < this.Items.length) {
            if (this.Items[i].ID == id) {
                return i
            }

            i++
        }
    }

    /**
     * Метод отображает товары */
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
     * Метод отображает перечень товаров интернет магазина */
    render() {
        console.log(...this.Items)
    }
}


/**
 * Класс представляет список товаров в корзине пользователя
 */
class BasketProductsList extends ProductsList {

    /**
     * Список товаров в интернет магазине */
    _inetShopProductsList

    /**
     * @constructor
     * 
     * @param {object} {inetShopProductsList} - Список товаров в интернет магазине
     */
    constructor(inetShopProductsList) {
        super()

        this._inetShopProductsList = inetShopProductsList
    }

    /**
     * Список товаров интернет магазина изменять нельзя */
    get InetShopProductsList() {
        return this._inetShopProductsList
    }

    /**
     * Метод добавляет товар в список товаров корзины
     * 
     * @param {number} {id} - ИД товара 
     * 
     * @returns {number} - 
     */
    addProduct(id) {
        //Получим индекс в массиве объектов с заданным ИД
        const index = this._inetShopProductsList.getIndexFromID(id)

        const element = new BasketProduct(
            this._inetShopProductsList.Items[index].ID, 
            this._inetShopProductsList.Items[index].Name,
            this._inetShopProductsList.Items[index].Price)

        element.incCount()

        this.Items.push(element)

        return this.Items.length - 1
    }

    /**
     * Метод удаляет товар из списка товаров корзины
     * 
     * @param {number} {id} - ИД товара 
    */
    deleteProduct(id) {
        //Получим индекс в массиве объектов с заданным ИД
        const index = super.getIndexFromID(id)

        if (index == -1) {
            return
        }

        this.Items.splice(index, 1)
    }


    // TODO Реализовать увеличение/уменьшение кол-ва существующего в корзине товара

    // TODO Реализовать удаление товара

    // TODO Реализовать удаление всех товаров

    changeProductCount(id, operationCode) {
        /*
        addProduct(id)
        deleteProduct(id)
        */
    }

    /**
     * Метод отображает перечень товаров в корзине */
    render() {
        console.log(...this.Items)
    }
} 


// TODO Реализовать класс, представляющий корзину интернет магазина


/**
 * Класс представляет корзину интернет магазина
 */
class Basket {
    /**
     * Количество товаров в корзине */
    _countTotal = 0

    /**
     * Итоговая стоимость товаров в корзине */
    _sumTotal = 0

    /**
     * @constructor
     * 
     * @param {object} {basketProductsList} - Список товаров в корзине
     */
    constructor(basketProductsList) {
        _basketroductsList = null

        this._basketProductsList = basketProductsList
    }

    /**
      * Все свойства класса предназначены только для чтения */
    get BasketProductsList() {
        return this._basketProductsList
    }

    get CountTotal() {
        return this._countTotal
    }

    get SumTotal() {
        return this._sumTotal
    }

    /**
     * Метод рассчитывает количество и общую стоимость товаров в корзине */
    calculate() {

    }
    
    /**
     * Метод отображает содержимое корзины, 
     * итоговоое количество товаров в корзине и их общую стоимость  
    */
    render() {

    }
}


/**
 * Основной модуль
 */
function main () {
    const BREAK_LINE = "--------------------------------------------------------------"
    const PRODUCT_ID = 100

    console.log(BREAK_LINE)

    //Создадим объект для хранения списка товаров интернет магазина
    interShopProductsList = new InetShopProductsList()

    //Получим список товаров интернет магазина
    interShopProductsList.getProductsList()

    console.log("Список товаров интернет магазина")

    //Выведем список товаров интернет магазина
    interShopProductsList.render()

    console.log(`Ко-во товаров интернет магазина: ${interShopProductsList.Items.length}`)

    let index = interShopProductsList.getIndexFromID(PRODUCT_ID)

    //Список пустой?
    if (index == -1) {
        console.log(`Индекс для товара с ИД == ${PRODUCT_ID} не найден!`)

        return
    }

    console.log(`Индекс товара с ИД == ${PRODUCT_ID}: ${index}`)
    
    console.log(BREAK_LINE)

    console.log("Корзина")

    //Создадим объект для списка товаров в корзине
    basketProductsList = new BasketProductsList(interShopProductsList)
    
    console.log(`Добавим в корзину товар с ИД == ${PRODUCT_ID}`)
    index = basketProductsList.addProduct(PRODUCT_ID)
    basketProductsList.render()

    console.log("Увеличим кол-во товара в корзине на единицу")
    basketProductsList.Items[index].incCount()
    basketProductsList.render()

    console.log("И затем одну единицу товара удалим из корзины")
    basketProductsList.Items[index].decCount()
    basketProductsList.render()

    //console.log(basketProductsList.getIndexFromID(PRODUCT_ID))

    console.log(`Удалим товар ID == ${PRODUCT_ID} из корзины целиком`)
    basketProductsList.deleteProduct(PRODUCT_ID)
    console.log(`Кол-во товаров в корзине - ${basketProductsList.Items.length}`)
}


main()
