/**
 * Класс представляет список товаров в корзине пользователя
*/
import ProductsList from "./ProductsList.js"

export default class BasketProductsList extends ProductsList {

    /**
     * Список товаров в интернет магазине */
    _inetShopProductsList

    /**
     * Наименование HTML-блока */
    _querySelectorName

    /**
     * @constructor
     * 
     * @param inetShopProductsList {object} Список товаров в интернет магазине
     * @param querySelectorName    {string} Наименование HTML-блока для вывода
     * 
    */
    constructor(inetShopProductsList, querySelectorName) {
        super()

        this._inetShopProductsList = inetShopProductsList
        this._querySelectorName = querySelectorName
    }

    /**
     * Список товаров интернет магазина
    */
    get InetShopProductsList() {
        return this._inetShopProductsList
    }


    /**
     * Метод добавляет товар в список товаров корзины
     * 
     * @param id {number} ИД товара 
     * 
     * @returns {number} Индекс товара в списке товаров корзины
    */
    addProduct(id) {

        //Получим индекс с заданным ИД в массиве товаров корзины
        let index = this.getIndexFromID(id)

        //Товар в корзину уже был добавлен?
        if (index != -1) {
            //Увеличим количество товара в корзине на единицу
            this.Items[index].incCount()

            return index
        }

        //Если товара в корзине нет, то его следует добавить
        //Получим индекс с заданным ИД в массиве товаров интернет магазина
        index = this._inetShopProductsList.getIndexFromID(id)

        //Создадим объект для нового товара в корзине
        const element = new BasketProduct(
            this._inetShopProductsList.Items[index].ID, 
            this._inetShopProductsList.Items[index].Name,
            this._inetShopProductsList.Items[index].Price
        )

        //Установим количество товара в корзине = 1
        element.incCount()

        //Поместим товар в конец списка товаров корзины
        this.Items.push(element)

        return this.Items.length - 1
    }


    /**
     * Метод удаляет экземпляр товара из списка товаров
     * 
     * @param id {number} ИД товара
    */
    deleteProductElement(id) {

        //Получим индекс в массиве объектов корзины с заданным ИД
        const index = this.getIndexFromID(id)

        //Индекс не найден?
        if (index == -1) {
            return
        }

        //Уменьшим количество экземпляров товара на единицу
        this.Items[index].decCount();

        //Удалили единственный экземпляр товара из корзины?
        if (this.Items[index].Count == 0) {
            //Удалим товар из списка товаров корзины
            this.Items.splice(index, 1)
        }
    }


    /**
     * Метод удаляет товар из списка товаров корзины
     * 
     * @param id {number} ИД товара 
    */
    deleteProduct(id) {

        //Получим индекс в массиве объектов корзины с заданным ИД
        const index = this.getIndexFromID(id)

        //Индекс не найден?
        if (index == -1) {
            return
        }

        //Удалим товар из списка товаров корзины
        this.Items.splice(index, 1)
    }


    /**
     * Метод удаляет все товары из корзины 
    */
    deleteAllProducts() {

        this.Items.splice(0, this.Items.length)
    }


    /**
     * Метод формирует HTML-источник для вывода на веб-страницу
     * 
     * @returns {string} HTML-источник для вывода на веб-страницу
     * 
    */
    _createBasketProductsList() {

        let s = ""

        this.Items.forEach( (item) => {
            let part = `<p>${item.Name}, цена: ${item.Price}, кол-во: ${item.Count}`
                + ` <button type = "button" name="btnDeleteElement_${item.ID}" value="${item.ID}">-</button>`
                + ` <button type = "button" name="btnDeleteProduct_${item.ID}" value="${item.ID}">:-(</button></p><br>`

            s = s + part
        })

        return s
    }


    /**
     * Метод отображает перечень товаров в корзине
    */
    render() {

        //Найдём в документе место для размещения списка товаров интернет магазина
        let placeToRender = document.querySelector("." + this._querySelectorName)

        //Место для вывода обнаружено?
        if (placeToRender != null) {            
            //Создадим HTML-элемент для вывода списка товаров
            const basketList = document.createElement("text")

            basketList.classList.add("BasketProducts")

            //Очистим список товаров в корзине
            placeToRender.innerHTML = ""

            //Получим HTML-источник для вывода на веб-страницу
            let s = this._createBasketProductsList()

            basketList.innerHTML = s

            placeToRender.appendChild(basketList)
        }
        
        //console.log(...this.Items)
    }
} 
