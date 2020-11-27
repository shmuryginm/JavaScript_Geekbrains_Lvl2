/*
import InetShopProduct from "./InetShopProduct.js"
import BasketProduct from "./BasketProduct.js"
import ProductsList from "./ProductsList.js"
import InetShopProductsList from "./InetShopProductsList.js"
import BasketProductsList from "./BasketProductsList.js"
import Basket from "./Basket.js"
*/

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
     * Метод создаёт объекты интернет-магазина
    */
    static _prepareShopObjects() {

        //Создадим объект для хранения списка товаров интернет магазина
        this.interShopProductsList = new InetShopProductsList(2, "productsList")

        //Создадим объект для списка товаров в корзине
        this.basketProductsList = new BasketProductsList(this.interShopProductsList, "basketList")

        //Создадим объект корзины товаров
        this.basket = new Basket(this.basketProductsList, "basket")
    }
    

    //#region AddProductToBasket

    /**
     * Метод добавляет товар в корзину
     * 
     * @param value {string} Свойство "value" кнопки, которую нажали - код товара
     * 
     */
    static _addtoBasket(value) {

        return new Promise((resolve, reject) => {
            //Создадим объект для добавления товара в корзину
            let btnAddProductInBasket = new BtnAddProductInBasket
            (
                value, this.interShopProductsList, this.basketProductsList, this.basket
            )

            //Добавим товар в корзину
            btnAddProductInBasket.click()

            resolve()
        })
    }


    /**
     * Метод реализует событие кнопки добавления товара в корзину
     * 
     * @param value {string} Свойство "value" кнопки, которую нажали - код товара
     * 
     */
    static OnBtnAddToBasketClick(value) {
        
        this._addtoBasket(value)
        .then( () => {
            //Установим обработчик события на кнопки списка товаров в корзине
            this._setHandlersForBasketButtons()
        })
    }

    //#endregion


    //#region DeleteProductElement

    /**
     * Метод удаляет элемент товара из группы товаров (асихронный!)
     * 
     * @param value {string} Свойство "value" кнопки, которую нажали - код товара
     */
    static _deleteProductElement(value) {

        return new Promise((resolve, reject) => {
            //Создадим объект для удаления единицы товара из корзины
            let btnDeleteProductElement = new BtnDeleteProductElement
            (
                value, this.basketProductsList, this.basket
            )

            btnDeleteProductElement.click()

            resolve()
        })
    }


    /**
     * Метод реализует событие кнопки "Удаление элемента товара из группы товаров"
     * 
     * @param value {string} Свойство "value" кнопки, которую нажали - код товара
     * 
     */
    static OnBtnDeleteProductElementClick(value) {

        this._deleteProductElement(value)
        .then( () => {
            //Установим обработчик события на кнопки списка товаров в корзине
            this._setHandlersForBasketButtons()
        })
    }

    //#endregion


    //#region DeleteProducts

    /**
     * Метод удаляет товар из корзины (асинхронный!)
     * 
     * @param value {string} Свойство "value" кнопки, которую нажали - код товара
     * 
     */
    static _deleteProduct(value) {
        
        return new Promise((resolve, reject) => {
            //Создадим объект для удаления единицы товара из корзины
            let btnDeleteProduct = new BtnDeleteProduct
            (
                value, this.basketProductsList, this.basket
            )

            btnDeleteProduct.click()

            resolve()
        })
    }


    /**
     * Метод реализует событие кнопки "Удалить товар из корзины"
     * 
     * @param value {string} Свойство "value" кнопки, которую нажали - код товара
     * 
    */
    static OnBtnDeleteProductClick(value) {    
        
        this._deleteProduct(value)
        .then( () => {
            //Установим обработчик события на кнопки списка товаров в корзине
            this._setHandlersForBasketButtons()
        })
    }

    //#endregion


    //#region DeleteAllProducts

    /**
     * Метод удаляет все товары из корзины (асинхронный!)
    */
    static _deleteAllProducts() {

        return new Promise((resolve, reject) => {

            //Создадим кнопку для добавления товара в корзину
            const btnDeleteAllProducts = new BtnDeleteAllProducts(this.basketProductsList, this.basket)

            btnDeleteAllProducts.click()

            resolve()
        })        
    }


    /**
     * Метод реализует событие кнопки "Удалить все товары из корзины"
    */
    static OnBtnDeleteAllProducts() {

        this._deleteAllProducts()
        .then( () => {
            this.basket.render()
        })
    }

    //#endregion


    /**
     * Метод отображает очередную порцию товаров в список товаров
     */
    static OnBtnGetNextChunkProducts() {

        //Получим количество товаров, которые следует отобразить
        this.interShopProductsList.incCurrentItems()

        //Выведены не все товары?
        if (this.interShopProductsList.CurrentItems <= this.interShopProductsList.Items.length) {

            this.interShopProductsList.getProductsList()
            .then( () => {
                //Выведем список товаров
                this.interShopProductsList.render()

                //Определим реакцию на нажатие для каждой кнопки из списка товаров магазина
                this._setHandlerForProductsListButtons()
            })
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

        this.basketProductsList.Items.forEach( (item) => {
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
            btn.addEventListener("click", () => {this.OnBtnDeleteAllProducts()})
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

            //Получим список товаров интернет магазина
            //Эта операция асинхронная, необходимо дождаться её завершения!
            this.interShopProductsList.getProductsList()
            .then ( () => { 
                //Выведем список товаров интернет-магазина
                this.interShopProductsList.render()
        
                //Определим реакцию на нажатие для каждой кнопки из списка товаров магазина
                this._setHandlerForProductsListButtons() 
            })
            

            //Установим обработчик на кнопку "Добавить ещё"
            this._setHandlerForGetNextChunkProductsButtons()

            //Выведем информацию о состоянии корзины (она должна быть пустой)
            this.basket.render()

            //Определим реакцию на кнопку "Очистить корзину"
            this._setHandlerForDeleteAllProductsButtons()
        }
        catch (ex) {
            //console.error(`${ex.name} - ${ex.message}!`)
            console.error(ex)
        }
    }
}


Program.main()
