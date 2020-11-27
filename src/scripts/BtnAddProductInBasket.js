/**
 * Класс реализует кнопку "Добавить товар в корзину"
 */

import BtnBasket from "./BtnBasket.js"

export default class BtnAddProductInBasket extends BtnBasket {

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

