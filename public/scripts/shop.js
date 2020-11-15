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

        this._countTotal = 0
        this._sumTotal = 0

        //Корзина пустая?
        if (this._basketProductsList.Items.length == 0) {
            return
        }

        for (let i = 0; i < this._basketProductsList.Items.length; i++) {
            this._countTotal = this._basketProductsList.Items[i].Count 
            this._sumTotal += this._basketProductsList.Items[i].Price * this._basketProductsList.Items[i].Count
        }
    }
    
    /**
     * Метод отображает итоговоое количество товаров в корзине и их общую стоимость  
    */
    render() {
    
        this._calculate()

        console.log(`Количество товаров: ${this.CountTotal} на сумму: ${this.SumTotal}`)
    }
}


/**
 * Класс представляет собой абстрактную кнопку, реализующую работу с корзиной
 */
class BtnBasketAbstractEmulator {
    
    /**
     * Список товаров в корзине */
    _basketProductsList

    /**
     * Корзина пользователя */
    _basket
    
    /**
     * @constructor
     * 
     * @param basketProductsList   {object} - Список товаров в корзине пользователя
     * @param basket               {object} - Корзина пользователя
     * 
     */
    constructor(basketProductsList, basket) {
        this._basketProductsList = basketProductsList
        this._basket = basket
    }

    /**
     * Список товаров в корзине пользователя */
    get BasketProductsList() {
        return this._basketProductsList
    }

    /**
     * Корзина */
    get Basket() {
        return this._basket
    }

    /**
     * Метод имитирует отображение кнопки
     */
    render() { }

    /**
     * Метод имитирует нажатие кнопки "Добавить товар в корзину" */
    click() {

        this._basketProductsList.render()
        this._basket.render()
    }
}


/**
 * Класс имитирует кнопку "Добавить товар в корзину"
 */
class BtnAddProductInBasketEmulator extends BtnBasketAbstractEmulator {

    /**
     * ИД товара */
    _productID

    /**
     * Список товаров в интренет магазине */
    _inetShopProductsList

    /**
     * Индекс товара */
    _index
    
    /**
     * @constructor
     * 
     * @param productID            {number} - ИД товара
     * @param inetShopProductsList {object} - Список товаров интернет магазина
     * @param basketProductsList   {object} - Список товаров в корзине пользователя
     * @param basket               {object} - Корзина пользователя
     * 
     */
    constructor(productID, inetShopProductsList, basketProductsList, basket) {

        super(basketProductsList, basket)

        this._productID = productID        
        this._inetShopProductsList = inetShopProductsList

        //Получим индекс товара в перечне товаров интернет магазина
        this._index = this._inetShopProductsList.getIndexFromID(this._productID)
    }

    /**
     * Идентификатор товара */
    get ProductID() {
        return this._productID
    }

    /**
     * Список товаров в интернет магазине */
    get InetShopProductsList() {
        return this._interShopProductsList
    }

    /**
     * Индекс товара в списке товаров интеренет магазина*/
    get Index() {
        return this._index
    }

    render() {

    } 

    /**
     * Метод имитирует нажатие кнопки "Добавить товар в корзину" */
    click() {
        super.BasketProductsList.addProduct(this._productID)

        super.click()
    }
}


/**
 * Класс имитирует кнопку "Удалить все товары из корзины"
 */
class BtnDeleteAllProductsEmulator extends BtnBasketAbstractEmulator {

    /**
     * @constructor
     * 
     * @param basketProductsList {object} - Список товаров в корзине
     * @param basket {object} - Корзина пользователя
     */
    constructor(basketProductsList, basket) {

        super(basketProductsList, basket)
    }

    render() {

    }

    /**
     * Метод имитирует нажатие кнопки "Удалить все товары из корзины" */
    click() {
        super.BasketProductsList.deleteAllProducts()

        super.click()
    }
}


/**
 * Класс имитирует конпку "Удалить элемент товара из корзины"
 */
class BtnDeleteProductElementEmulator extends BtnBasketAbstractEmulator {

    /**
     * ИД товара */
    _id

    /**
     * @constructor
     * 
     * @param id {number} - ИД товара
     * @param basketProductsList {object} - Список товаров в корзине
     * @param basket {object} - Корзина пользователя
    */
    constructor(id, basketProductsList, basket) {
       
        super(basketProductsList, basket)

        this._id = id
    }

    /**
     * ИД товара */
    get ID() {
        return this._id
    }

    render() {

    }

    /**
     * Метод имитирует нажатие кнопки "Удалить элемент товара из корзины" */
    click() {
        super.BasketProductsList.deleteProductElement(this._id)

        super.click()
    }
}


/**
 * Класс имитирует конпку "Удалить товар из корзины"
 */
class BtnDeleteProductEmulator extends BtnBasketAbstractEmulator {

    /**
     * ИД товара */
    _id

    /**
     * @constructor
     * 
     * @param id {number} - ИД товара
     * @param basketProductsList {object} - Список товаров в корзине
     * @param basket {object} - Корзина пользователя
    */
    constructor(id, basketProductsList, basket) {
        
        super(basketProductsList, basket)

        this._id = id
        
    }

    /**
     * ИД товара */
    get ID() {
        return this._id
    }

    render() {

    }
    
    /**
     * Метод имитирует нажатие кнопки "Удалить товар из корзины" */
    click() {
        super.BasketProductsList.deleteProduct(this._id)
        
        super.click()
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
    static test() {
        const BREAK_LINE = "--------------------------------------------------------------"
        let PRODUCT_ID = 100

        console.log(BREAK_LINE)

        try{
            //Создадим объект для хранения списка товаров интернет магазина
            const interShopProductsList = new InetShopProductsList()

            //Получим список товаров интернет магазина
            interShopProductsList.getProductsList()

            console.log("Список товаров интернет магазина")
            interShopProductsList.render()

            console.log(`Ко-во товаров интернет магазина: ${interShopProductsList.Items.length}`)

            console.log()
            
            //Получим индекс товара из списка товаров интернет магазина
            let index = interShopProductsList.getIndexFromID(PRODUCT_ID)

            //Список пустой?
            if (index == -1) {
                console.log(`Индекс для товара с ИД == ${PRODUCT_ID} в списке товаров не найден!`)
    
                return
            }

            console.log(`Добавим в корзину товар с ИД == ${PRODUCT_ID} [${interShopProductsList.Items[index].Name}), цена: ${interShopProductsList.Items[index].Price}]`)
            console.log("Имитируем нажатие кнопки \"Добавить товар в корзину\"")

            console.log(BREAK_LINE)

            console.log("Корзина")

            //Создадим объект для списка товаров в корзине
            const basketProductsList = new BasketProductsList(interShopProductsList)

            //Создадим объект корзины товаров
            const basket = new Basket(basketProductsList)

            //Создадим кнопку для добавления товара в корзину
            const btnAddProductInBasketEmulator = new BtnAddProductInBasketEmulator
                (
                    PRODUCT_ID, interShopProductsList, basketProductsList, basket
                )

            //Имитируем нажатие на кнопку
            btnAddProductInBasketEmulator.click()

            console.log("Увеличим кол-во товара в корзине на единицу (нажмём кнопку)")
            btnAddProductInBasketEmulator.click()
                        
            console.log("Увеличим кол-во товара в корзине на единицу ещё раз (ещё раз нажмём кнопку)")
            console.log("Теперь в корзине должно быть 3 экземпляра товара")
            btnAddProductInBasketEmulator.click()

            console.log("И затем одну единицу товара удалим из корзины (нажмём кнопку)")
            const btnDeleteProductElementEmulator = 
                new BtnDeleteProductElementEmulator(PRODUCT_ID, basketProductsList, basket)

            btnDeleteProductElementEmulator.click()

            console.log("Удалим все товары из корзины")
            //Создадим кнопку для добавления товара в корзину
            const btnDeleteAllProductsEmulator = new BtnDeleteAllProductsEmulator(basketProductsList, basket)
            btnDeleteAllProductsEmulator.click()

            console.log(BREAK_LINE)

            PRODUCT_ID = 90

            //Получим индекс товара из списка товаров интернет магазина
            index = interShopProductsList.getIndexFromID(PRODUCT_ID)

            //Список пустой?
            if (index == -1) {
                console.log(`Индекс для товара с ИД == ${PRODUCT_ID} в списке товаров не найден!`)
    
                return
            }

            console.log(`Добавим в корзину товар с ИД == ${PRODUCT_ID} [${interShopProductsList.Items[index].Name}), цена: ${interShopProductsList.Items[index].Price}]`)
            console.log("Имитируем нажатие кнопки \"Добавить товар в корзину\"")

            //Создадим кнопку для добавления товара в корзину
            const btnAddProductInBasketEmulator_90 = new BtnAddProductInBasketEmulator
                (
                    PRODUCT_ID, interShopProductsList, basketProductsList, basket
                )
            //Имитируем нажатие на кнопку
            btnAddProductInBasketEmulator_90.click()

            console.log("И затем эту категорию товара удалим из корзины (нажмём кнопку)")
            const btnDeleteProductEmulator_90 = 
                new BtnDeleteProductEmulator(PRODUCT_ID, basketProductsList, basket)
            
            btnDeleteProductEmulator_90.click()
        }
        catch (ex) {
            console.log(`${ex.name} - ${ex.message}!`)
        }

    }
}


Program.test()
