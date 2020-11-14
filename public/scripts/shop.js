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
      * Идентификатор товара */
     get ID() {
        return this._id
     }

    /**
      * Наименование товара */
     get Name() {
         return this._name
     }

    /**
      * Цена товарв */
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
        //Получим индекс с заданным ИД в массиве товаров корзины
        let index = this.getIndexFromID(id)

        //Товар в корзину уже был добавлен?
        if (index != -1) {
            //Увеличим количество товара в корзине на единицу
            this.Items[index].incCount()

            return index
        }

        //Если товара в корзине нет, то его следует добавить
        //Получим индекс с заданным ИД в массиве товаров интернет магазина
        index = this._inetShopProductsList.getIndexFromID(id)

        //Создадим объект для нового товара в корзине
        const element = new BasketProduct(
            this._inetShopProductsList.Items[index].ID, 
            this._inetShopProductsList.Items[index].Name,
            this._inetShopProductsList.Items[index].Price
        )

        //Установим количество товара в корзине = 1
        element.incCount()

        //Поместим товар в конец списка товаров корзины
        this.Items.push(element)

        return this.Items.length - 1
    }

    /**
     * Метод удаляет экземпляр товара из списка товаров
     * 
     * @param {number} {id} - ИД товара
    */
    deleteProductElement(id) {
        //Получим индекс в массиве объектов корзины с заданным ИД
        const index = this.getIndexFromID(id)

        //Индекс не найден?
        if (index == -1) {
            return
        }

        //Уменьшим количество экземпляров товара на единицу
        this.Items[index].decCount();

        //Удалили единственный экземпляр товара из корзины?
        if (this.Items[index].Count == 0) {
            //Удалим товар из списка товаров корзины
            this.Items.splice(index, 1)
        }
    }

    /**
     * Метод удаляет товар из списка товаров корзины
     * 
     * @param {number} {id} - ИД товара 
    */
    deleteProduct(id) {
        //Получим индекс в массиве объектов корзины с заданным ИД
        const index = this.getIndexFromID(id)

        //Индекс не найден?
        if (index == -1) {
            return
        }

        //Удалим товар из списка товаров корзины
        this.Items.splice(index, 1)
    }

    /**
     * Метод удаляет все товары из корзины */
    deleteAllProducts() {
        this.Items.splice(0, this.Items.length)
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
    _calculate() {

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
 * 
*/
class Program {

    /**
     * Гланый метод приложения
     */
    static main() {
        const BREAK_LINE = "--------------------------------------------------------------"
        const PRODUCT_ID = 100

        console.log(BREAK_LINE)

        //Создадим объект для хранения списка товаров интернет магазина
        const interShopProductsList = new InetShopProductsList()

        //Получим список товаров интернет магазина
        interShopProductsList.getProductsList()

        console.log("Список товаров интернет магазина")

        //Выведем список товаров интернет магазина
        interShopProductsList.render()

        console.log(`Ко-во товаров интернет магазина: ${interShopProductsList.Items.length}`)

        let index = interShopProductsList.getIndexFromID(PRODUCT_ID)

        //Список пустой?
        if (index == -1) {
            console.log(`Индекс для товара с ИД == ${PRODUCT_ID} в списке товаров не найден!`)

            return
        }

        console.log(`Индекс товара с ИД == ${PRODUCT_ID}: ${index}`)
    
        console.log(BREAK_LINE)

        console.log("Корзина")

        //Создадим объект для списка товаров в корзине
        let basketProductsList = new BasketProductsList(interShopProductsList)

        console.log(`Добавим в корзину товар с ИД == ${PRODUCT_ID} (${interShopProductsList.Items[index].Name})`)
        index = basketProductsList.addProduct(PRODUCT_ID)
        
        //Список пустой?
        if (index == -1) {
            console.log(`Индекс для товара с ИД == ${PRODUCT_ID} в корзине не найден!`)

            return
        }

        basketProductsList.render()

        console.log("Увеличим кол-во товара в корзине на единицу")
        //basketProductsList.Items[index].incCount()

        //Просто ещё раз вызовем метод добавления товара, он сам разберётся что делать
        index = basketProductsList.addProduct(PRODUCT_ID)
        basketProductsList.render()

        console.log("Увеличим кол-во товара в корзине на единицу ещё раз")
        console.log("Теперь в корзине должно быть 3 экземпляра товара")
        index = basketProductsList.addProduct(PRODUCT_ID)
        basketProductsList.render()

        console.log("И затем одну единицу товара удалим из корзины")
        //basketProductsList.Items[index].decCount()
        //Удалим элемент товара из корзины
        basketProductsList.deleteProductElement(PRODUCT_ID)
        basketProductsList.render()

        //console.log(basketProductsList.getIndexFromID(PRODUCT_ID))

        console.log(`Удалим товар ID == ${PRODUCT_ID} (${basketProductsList.Items[index].Name}) из корзины целиком`)
        basketProductsList.deleteAllProducts(PRODUCT_ID)
        console.log(`Кол-во товаров в корзине - ${basketProductsList.Items.length}`)
    }
}


Program.main()
