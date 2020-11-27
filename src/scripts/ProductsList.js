/**
 * Класс представляет абстрактный список товаров
*/
class ProductsList {
    /**
     * Массив свойств товаров */
    Items = []

    /**
     * Метод возвращает индекс в массиве товаров по ИД товара
     * 
     * @param id {number} Идентификатор товара
     * 
     * @returns {number} Индекс в массиве товаров по ИД товара. -1 - если массив пустой
    */
    getIndexFromID(id) {
        //Товаров нет?
        if (this.Items.length == 0) {
            return -1
        }

        let i = 0

        while (i < this.Items.length) {
            if (this.Items[i].ID == id) {
                return i
            }

            i++
        }

        //Товар не найден по ИД
        return -1
    }
}
