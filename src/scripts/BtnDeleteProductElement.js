/**
 * Класс реализует конпку "Удалить элемент товара из корзины"
 */
import BtnBasket from "./BtnBasket.js"

export default class BtnDeleteProductElement extends BtnBasket {

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
