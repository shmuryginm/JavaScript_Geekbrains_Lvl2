/**
 * Класс представляет товар в интернет магазине
*/
/*export default*/ class InetShopProduct {
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
