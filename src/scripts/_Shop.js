import InetShopProductsList from "./InetShopProductsList.js"
import BasketProductsList from "./BasketProductsList.js"
import Basket from "./Basket.js"

import BtnAddProductInBasket from "./BtnAddProductInBasket.js"
import BtnDeleteAllProducts from "./BtnDeleteAllProducts.js"
import BtnDeleteProductElement from "./BtnDeleteProductElement.js"
import BtnDeleteProduct from "./BtnDeleteProduct.js"


import "../styles/styles.css"

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


    //#region GetNextChunkProducts

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
            else {
                console.error("Нет конпки " + this._btnInetShopProductsName + "_" + productID)
            }
        }
    }
    
    //#endregion

    
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
            .catch( (err) => {console.error("Основной модуль!", err) })
            

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
