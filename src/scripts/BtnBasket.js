/**
 * Класс представляет собой кнопку, реализующую работу с корзиной
 */
export default class BtnBasket {
    
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
