/**
 * Класс реализует кнопку "Удалить все товары из корзины"
 */
import BtnBasket from "./BtnBasket.js"

export default class BtnDeleteAllProducts extends BtnBasket {

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
