/**
 * Класс реализует конпку "Удалить товар из корзины"
 */
import BtnBasket from "./BtnBasket.js"

export default class BtnDeleteProduct extends BtnBasket {

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
