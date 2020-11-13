/**
 * Файл представляет классы интернет магазина
 */

 /**
  * Класс представляет товар в интернет магазине (Internet Shop - InetShop)
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
      * @param {number} {id}    - Идентификатор товара
      * @param {string} {name}  - Наименование товара
      * @param {number} {price} - Цена товарв
      */
     constructor(id, name, price) {
        this._id = id
        this._name = name
        this._price = price
     }

     /**
      * Объявление геттеров
      * Все свойства класса предназначены только для чтения
      */
     get ID() {
        return this._id
     }

     get Name() {
         return this._name
     }

     get Price() {
         return this._price
     }
 }