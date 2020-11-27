/***
 * Класс представляет товар в корзине пользователя
*/
/*export default*/ class BasketProduct extends InetShopProduct {
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
