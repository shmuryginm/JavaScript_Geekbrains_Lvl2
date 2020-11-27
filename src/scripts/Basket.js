/**
 * Класс представляет корзину интернет магазина
*/
export default class Basket {
    /**
     * Количество товаров в корзине */
    _countTotal = 0

    /**
     * Итоговая стоимость товаров в корзине */
    _sumTotal = 0

    /**
     * Наименование HTML-блока
     */
    _querySelectorName

    /**
     * @constructor
     * 
     * @param basketProductsList {object} Список товаров в корзине
     * @param querySelectorName  {string} Наименование HTML-блока
     * 
    */
    constructor(basketProductsList, querySelectorName) {

        this._basketProductsList = basketProductsList
        this._querySelectorName = querySelectorName
    }

    /**
      * Список товаров в корзине
    */
    get BasketProductsList() {
        return this._basketProductsList
    }

    /**
     * Количество товаров в корзине
     */
    get CountTotal() {
        return this._countTotal
    }

    /**
     * Итоговая стоимость товаров в корзине
     */
    get SumTotal() {
        return this._sumTotal
    }

    /**
     * Метод рассчитывает количество и общую стоимость товаров в корзине
    */
    _calculate() {

        this._countTotal = 0
        this._sumTotal = 0

        //Корзина пустая?
        if (this._basketProductsList.Items.length == 0) {
            return
        }

       this._basketProductsList.Items.forEach((item) => {
            this._countTotal += item.Count 
            this._sumTotal += item.Price * item.Count
        })
    }
    

    /**
     * Метод отображает итоговоое количество товаров в корзине и их общую стоимость  
    */
    render() {
    
        this._calculate()

        let placeToRender = document.querySelector("." + this._querySelectorName)

        //Место для вывода обнаружено?
        if (placeToRender != null) {            
            //Создадим HTML-элемент для вывода списка товаров
            const basketInfo = document.createElement("text")

            basketInfo.classList.add("BasketInfo")

            //Очистим информацию о корзине
            placeToRender.innerHTML = ""

            //Сформируем HTML-источник для вывода на веб-страницу
            let s = `Количество товаров: ${this.CountTotal} на сумму: ${this.SumTotal}`

            basketInfo.innerHTML = s

            placeToRender.appendChild(basketInfo)
        }

        //console.log(`Количество товаров: ${this.CountTotal} на сумму: ${this.SumTotal}`)
    }
}
