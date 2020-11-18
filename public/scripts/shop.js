/**
 *  Файл представляет набор классов для описания работы интернет магазина
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
      * @param id    {number} Идентификатор товара
      * @param name  {string} Наименование товара
      * @param price {number} Цена товарв
      * 
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
    _count

    /**
      * @constructor
      * 
      * @param id    {number} Идентификатор товара
      * @param name  {string} Наименование товара
      * @param price {number} Цена товарв
      * 
    */
    constructor(id, name, price) {
        super(id, name, price)

        this._count = 0
    }

    /**
     * Количество товара одной группы в корзине
    */
    get Count() {
        return this._count
    }

    /**
     * Метод увеличивает кол-во товара в корзине на единицу
    */
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
     * Метод возвращает индекс в массиве товаров по ИД товара
     * 
     * @param id {number} Идентификатор товара
     * 
     * @returns {number} Индекс в массиве товаров по ИД товара. -1 - если массив пустой
    */
    getIndexFromID(id) {
        //Товаров нет?
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

        //Товар не найден по ИД
        return -1
    }
}


/** 
 * Класс представляет список товаров в интернет магазине 
*/
class InetShopProductsList extends ProductsList {

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
     * Заглушка - имитатор запроса на сервер
     * Возвращает массив свойств товаров интернет магазина
     * 
    */ 
    _getProducts() {

        // TODO: Выполнить асинхронное получение данных из псевдо-БД и установить в заголовке @returns

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
     * Метод из массива свойств товаров получает массив объектов
    */
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
                ` <button type = "button" name="btnProductList_${this.Items[i].ID}" value="${this.Items[i].ID}">+</button></p><br>`

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


/**
 * Класс представляет список товаров в корзине пользователя
*/
class BasketProductsList extends ProductsList {

    /**
     * Список товаров в интернет магазине */
    _inetShopProductsList

    /**
     * Наименование HTML-блока */
    _querySelectorName

    /**
     * @constructor
     * 
     * @param inetShopProductsList {object} Список товаров в интернет магазине
     * @param querySelectorName    {string} Наименование HTML-блока для вывода
     * 
    */
    constructor(inetShopProductsList, querySelectorName) {
        super()

        this._inetShopProductsList = inetShopProductsList
        this._querySelectorName = querySelectorName
    }

    /**
     * Список товаров интернет магазина
    */
    get InetShopProductsList() {
        return this._inetShopProductsList
    }


    /**
     * Метод добавляет товар в список товаров корзины
     * 
     * @param id {number} ИД товара 
     * 
     * @returns {number} Индекс товара в списке товаров корзины
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
     * @param id {number} ИД товара
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
     * @param id {number} ИД товара 
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
     * Метод удаляет все товары из корзины 
    */
    deleteAllProducts() {

        this.Items.splice(0, this.Items.length)
    }


    /**
     * Метод формирует HTML-источник для вывода на веб-страницу
     * 
     * @returns {string} HTML-источник для вывода на веб-страницу
     * 
    */
    _createBasketProductsList() {

        let s = ""

        this.Items.forEach( (item) => {
            let part = `<p>${item.Name}, цена: ${item.Price}, кол-во: ${item.Count}`
                + ` <button type = "button" name="btnDeleteElement_${item.ID}" value="${item.ID}">-</button>`
                + ` <button type = "button" name="btnDeleteProduct_${item.ID}" value="${item.ID}">:-(</button></p><br>`

            s = s + part
        })

        return s
    }


    /**
     * Метод отображает перечень товаров в корзине
    */
    render() {

        //Найдём в документе место для размещения списка товаров интернет магазина
        let placeToRender = document.querySelector("." + this._querySelectorName)

        //Место для вывода обнаружено?
        if (placeToRender != null) {            
            //Создадим HTML-элемент для вывода списка товаров
            const basketList = document.createElement("text")

            basketList.classList.add("BasketProducts")

            //Очистим список товаров в корзине
            placeToRender.innerHTML = ""

            //Получим HTML-источник для вывода на веб-страницу
            let s = this._createBasketProductsList()

            basketList.innerHTML = s

            placeToRender.appendChild(basketList)
        }
        
        //console.log(...this.Items)
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
     * Наименование HTML-блока
     */
    _querySelectorName

    /**
     * @constructor
     * 
     * @param basketProductsList {object} Список товаров в корзине
     * @param querySelectorName  {string} Наименование HTML-блока
     * 
    */
    constructor(basketProductsList, querySelectorName) {

        this._basketProductsList = basketProductsList
        this._querySelectorName = querySelectorName
    }

    /**
      * Список товаров в корзине
    */
    get BasketProductsList() {
        return this._basketProductsList
    }

    /**
     * Количество товаров в корзине
     */
    get CountTotal() {
        return this._countTotal
    }

    /**
     * Итоговая стоимость товаров в корзине
     */
    get SumTotal() {
        return this._sumTotal
    }

    /**
     * Метод рассчитывает количество и общую стоимость товаров в корзине
    */
    _calculate() {

        this._countTotal = 0
        this._sumTotal = 0

        //Корзина пустая?
        if (this._basketProductsList.Items.length == 0) {
            return
        }

       this._basketProductsList.Items.forEach((item) => {
            this._countTotal += item.Count 
            this._sumTotal += item.Price * item.Count
        })
    }
    

    /**
     * Метод отображает итоговоое количество товаров в корзине и их общую стоимость  
    */
    render() {
    
        this._calculate()

        let placeToRender = document.querySelector("." + this._querySelectorName)

        //Место для вывода обнаружено?
        if (placeToRender != null) {            
            //Создадим HTML-элемент для вывода списка товаров
            const basketInfo = document.createElement("text")

            basketInfo.classList.add("BasketInfo")

            //Очистим информацию о корзине
            placeToRender.innerHTML = ""

            //Сформируем HTML-источник для вывода на веб-страницу
            let s = `Количество товаров: ${this.CountTotal} на сумму: ${this.SumTotal}`

            basketInfo.innerHTML = s

            placeToRender.appendChild(basketInfo)
        }

        //console.log(`Количество товаров: ${this.CountTotal} на сумму: ${this.SumTotal}`)
    }
}


/**
 * Класс представляет собой кнопку, реализующую работу с корзиной
 */
class BtnBasket {
    
    /**
     * Список товаров в корзине */
    _basketProductsList

    /**
     * Корзина пользователя */
    _basket
    
    /**
     * @constructor
     * 
     * @param basketProductsList {object} Список товаров в корзине пользователя
     * @param basket             {object} Корзина пользователя
     * 
     */
    constructor(basketProductsList, basket) {

        this._basketProductsList = basketProductsList
        this._basket = basket
    }

    /**
     * Список товаров в корзине пользователя
    */
    get BasketProductsList() {
        return this._basketProductsList
    }

    /**
     * Корзина
    */
    get Basket() {
        return this._basket
    }

    /**
     * Метод реализует нажатие кнопки "Добавить товар в корзину"
    */
    click() {

        this._basketProductsList.render()
        this._basket.render()
    }
}


/**
 * Класс реализует кнопку "Добавить товар в корзину"
 */
class BtnAddProductInBasket extends BtnBasket {

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
     * @param productID            {number} ИД товара
     * @param inetShopProductsList {object} Список товаров интернет магазина
     * @param basketProductsList   {object} Список товаров в корзине пользователя
     * @param basket               {object} Корзина пользователя
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
     * Идентификатор товара 
    */
    get ProductID() {
        return this._productID
    }

    /**
     * Список товаров в интернет магазине 
    */
    get InetShopProductsList() {
        return this._interShopProductsList
    }

    /**
     * Индекс товара в списке товаров интеренет магазина
    */
    get Index() {
        return this._index
    }

    /**
     * Метод релизует нажатие кнопки "Добавить товар в корзину"
    */
    click() {
        this.BasketProductsList.addProduct(this._productID)

        super.click()
    }
}


/**
 * Класс реализует кнопку "Удалить все товары из корзины"
 */
class BtnDeleteAllProducts extends BtnBasket {

    /**
     * @constructor
     * 
     * @param basketProductsList {object} Список товаров в корзине
     * @param basket             {object} Корзина пользователя
     * 
     */
    constructor(basketProductsList, basket) {

        super(basketProductsList, basket)
    }

    /**
     * Метод реализует нажатие кнопки "Удалить все товары из корзины" 
    */
    click() {

        super.BasketProductsList.deleteAllProducts()

        super.click()
    }
}


/**
 * Класс реализует конпку "Удалить элемент товара из корзины"
 */
class BtnDeleteProductElement extends BtnBasket {

    /**
     * ИД товара */
    _id

    /**
     * @constructor
     * 
     * @param id                 {number} ИД товара
     * @param basketProductsList {object} Список товаров в корзине
     * @param basket             {object} Корзина пользователя
     * 
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


    /**
     * Метод реализует нажатие кнопки "Удалить элемент товара из корзины" 
    */
    click() {
        super.BasketProductsList.deleteProductElement(this._id)

        super.click()
    }
}


/**
 * Класс реализует конпку "Удалить товар из корзины"
 */
class BtnDeleteProduct extends BtnBasket {

    /**
     * ИД товара */
    _id

    /**
     * @constructor
     * 
     * @param id                 {number} ИД товара
     * @param basketProductsList {object} Список товаров в корзине
     * @param basket             {object} Корзина пользователя
     * 
    */
    constructor(id, basketProductsList, basket) {
        
        super(basketProductsList, basket)

        this._id = id
        
    }

    /**
     * ИД товара 
    */
    get ID() {
        return this._id
    }

    /**
     * Метод реализует нажатие кнопки "Удалить товар из корзины" 
    */
    click() {
        super.BasketProductsList.deleteProduct(this._id)
        
        super.click()
    }
}


/**
 * Основной модуль
*/
class Program {

    /**
     * Префикс имени кнопок списка товаров в магазине */
    static _btnInetShopProductsName = "btnProductList"

    /**
     * Префикс имени кнопок списка товаров в корзине для удаления элемента группы товаров */
    static _btnDeleteProductElementName = "btnDeleteElement"

    /**
     * Префикс имени кнопок списка товаров в корзине для удаления группы товаров */
    static _btnDeleteProductName = "btnDeleteProduct"

    /**
     * Имя кнопки для удаления всех товаров из корзины */
    static _btnDeleteAllProductsName = "ClearBasket"

    /**
     * Имя кнопки для получения следующей порции товаров магазина */
    static _btnGetNextChunkName = "btnAddNextChunk"


    //#region Objects

    /**
     * Список товаров интернет магазина */
    static interShopProductsList

    /**
     * Список товаров в корзине */
    static basketProductsList

    /**
     * Корзина */
    static basket

    //#endregion


    /**
     * Метод создаёт объекты интернет-маазина
    */
    static _prepareShopObjects() {

        //Создадим объект для хранения списка товаров интернет магазина
        this.interShopProductsList = new InetShopProductsList(2, "productsList")

        //Получим список товаров интернет магазина
        this.interShopProductsList.getProductsList()

        //Создадим объект для списка товаров в корзине
        this.basketProductsList = new BasketProductsList(this.interShopProductsList, "basketList")

        //Создадим объект корзины товаров
        this.basket = new Basket(this.basketProductsList, "basket")
    }
    

    /**
     * Метод добавляет товар в корзину, в зависимости от того, какая была нажата кнопка в списке
     * 
     * @param value {string} Свойство "value" кнопки, которую нажали
     * 
     */
    static OnBtnAddToBasketClick(value) {
        
        //Создадим объект для добавления товара в корзину
        let btnAddProductInBasket = new BtnAddProductInBasket
        (
            value, this.interShopProductsList, this.basketProductsList, this.basket
        )

        //Добавим товар в корзину
        btnAddProductInBasket.click();

        //Установим обработчик события на кнопки списка товаров в корзине
        this._setHandlersForBasketButtons()
    }


    /**
     * Метод удаляет элемент товара из группы товаров в корзине в зависимости от того, какая была нажата кнопка в списке
     * 
     * @param value {string} Свойство "value" кнопки, которую нажали
     * 
     */
    static OnBtnDeleteProductElementClick(value) {

        //Создадим объект для удаления единицы товара из корзины
        let btnDeleteProductElement = new BtnDeleteProductElement
        (
            value, this.basketProductsList, this.basket
        )

        btnDeleteProductElement.click()

        //Установим обработчик события на кнопки списка товаров в корзине
        this._setHandlersForBasketButtons()
    }


    /**
     * Метод удаляет товар из корзины
     * 
     * @param value {string} - Свойство "value" кнопки, которую нажали - код товара
     */
    static OnBtnDeleteProductClick(value) {

        //Создадим объект для удаления единицы товара из корзины
        let btnDeleteProduct = new BtnDeleteProduct
        (
            value, this.basketProductsList, this.basket
        )

        btnDeleteProduct.click()
        
        //Установим обработчик события на кнопки списка товаров в корзине
        this._setHandlersForBasketButtons()
    }

    /**
     * Метод удаляет все товары из корзины 
    */
    static OnBtnDeleteAllProducrs() {

        //Создадим кнопку для добавления товара в корзину
        const btnDeleteAllProducts = new BtnDeleteAllProducts(this.basketProductsList, this.basket)

        btnDeleteAllProducts.click()

        this.basket.render();
    }


    /**
     * Метод отображает очередную порцию товаров в список товаров
     */
    static OnBtnGetNextChunkProducts() {

        //Получим количество товаров, которые следует отобразить
        this.interShopProductsList.incCurrentItems()

        //Выведены не все товары?
        if (this.interShopProductsList.CurrentItems <= this.interShopProductsList.Items.length) {
            //Выведем список товаров
            this.interShopProductsList.render()

            //Определим реакцию на нажатие для каждой кнопки из списка товаров магазина
            this._setHandlerForProductsListButtons()
        }
    }


    /**
     * Метод устанавливает обработчик на кнопки списка товаров 
     * ("Добавить товар в корзину")
    */
    static _setHandlerForProductsListButtons() {

        for (let i = 0; i < this.interShopProductsList.CurrentItems; i++) {
            //Получаем ИД товара
            let productID = this.interShopProductsList.Items[i].ID    

            let btn = document.getElementsByName(this._btnInetShopProductsName + "_" + productID)[0]

            if (btn != null) {
                btn.addEventListener("click", () => {this.OnBtnAddToBasketClick(btn.value)})
            }
        }
    }
    

    /**
     * Метод устанавливает обработчик на кнопки списка товаров в корзине
    */
    static _setHandlersForBasketButtons() {

        this.basketProductsList.Items.forEach((item) => {
            //Получаем ИД товара
            let productID = item.ID    
        
            //Определим действия на нажатие кнопки "Удалить товар из группы товаров"
            let btn = document.getElementsByName(this._btnDeleteProductElementName + "_" + productID)[0]

            if (btn != null) {                
                btn.addEventListener("click", () => {this.OnBtnDeleteProductElementClick(btn.value)})
            }

            //Определим действия на нажатие кнопки "Удалить группу товаров"
            btn = document.getElementsByName(this._btnDeleteProductName + "_" + productID)[0]

            if (btn != null) {
                btn.addEventListener("click", () => {this.OnBtnDeleteProductClick(btn.value)})
            }
        })
    }


    /**
     * Метод устанавливает обработчик для кнопки удаления всех товаров из корзины
    */
    static _setHandlerForDeleteAllProductsButtons() {

        let btn = document.getElementsByName(this._btnDeleteAllProductsName)[0]

        if (btn != null) {
            btn.addEventListener("click", () => {this.OnBtnDeleteAllProducrs()})
        }
    }


    /**
     * Метод устанавливает обработчик для кнопки получения следующей порции товаров
    */
    static _setHandlerForGetNextChunkProductsButtons() {

        let btn = document.getElementsByName(this._btnGetNextChunkName)[0]

        if (btn != null) {
            btn.addEventListener("click", () => {this.OnBtnGetNextChunkProducts()})
        }    
    }


    /**
     * Гланый метод приложения
     */
    static main() {

        try {
            //Подготовим к работе объекты интенет-магазина
            this._prepareShopObjects()

            //Выведем список товаров интернет-магазина
            this.interShopProductsList.render()

            //Определим реакцию на нажатие для каждой кнопки из списка товаров магазина
            this._setHandlerForProductsListButtons()

            //Установим обработчик на кнопку "Добавить ещё"
            this._setHandlerForGetNextChunkProductsButtons()

            //Выведем информацию о состоянии корзины (она должна быть пустой)
            this.basket.render()

            //Определим реакцию на кнопку "Очистить корзину"
            this._setHandlerForDeleteAllProductsButtons()
        }
        catch (ex) {
            console.log(`${ex.name} - ${ex.message}!`)
        }
    }
}


Program.main()
