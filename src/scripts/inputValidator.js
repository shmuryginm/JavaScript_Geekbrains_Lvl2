/**
 * Класс реализует проверку данных на соответствие заданным шаблонам
*/
class DataValidator {
    /**
     * Выражение для проверки правильности номера телефона
    */
    _phoneNumberValidator

    /**
     * Выражение для проверки правильности адреса электронной почты
    */
    _emailAddressValidator

    /**
     * Выражение для проверки только имени по правилам русского языка
    */
    _russianNameValidator


    /**
     * Выражение для проверки правильности номера телефона
    */
    get PhoneNumberValidator() {
        return this._phoneNumberValidator
    }

    /**
     * Выражение для проверки правильности адреса электронной почты
    */
    get EmailAddressValidator() {
        return this._emailAddressValidator
    }

    /**
     * Выражение для проверки только имени по правилам русского языка
    */
    get RussianNameValidator() {
        return this._russianNameValidator
    }


    /**
      * @constructor
    */
    constructor () {

        this._phoneNumberValidator = /^\+7\([0-9]{3}\)[0-9]{3}-[0-9]{4}$/g

        this._emailAddressValidator = /^([\w\.-]+)@([\w\.-]+)\.([A-Za-z\.]{2,6})$/

        this._russianNameValidator = /^[А-Я][а-яё]+$/gu
    }


    /**
      * Метод проверяет на правильность номер телефона
      * 
      * @param phoneNumber {string} Номер телефона
      * 
      * @returns {boolean} Является ли правильным
    */
     validPhoneNumber(phoneNumber) {
        
        return this._phoneNumberValidator.test(phoneNumber)
     }


    /**
      * Метод проверяет на правильность адрес электронной почты
      * 
      * @param emailAddress {string} Адрес электронной почты
      * 
      * @returns {boolean} Является ли правильным
    */
    validEmailAddress(emailAddress) {

        return this._emailAddressValidator.test(emailAddress)
    }


    /**
     * Метод проверяет на правильность имя по правилам русского языка
     * 
     * @param name {string} Имя
     * 
     * @returns {boolean} Является ли правильным
    */
    validRussianName(name) {

        return this._russianNameValidator.test(name)
    }
}


/**
 * Класс для тестирования класса DataValidator
*/
class DataValidatorTest {

    /**
     * Метод для проверки правильности номера телефона
    */
    static runTests() {

        const BREAK_LINE = "-----------------------------------------------"

        const dataValidator = new DataValidator()
 
        //Тестируем правильность номера телефона
        console.log("Тестируем правильность номера телефона")
        let phoneNumber = "+7(000)000-0000"
        let expected = true
        let actual = dataValidator.validPhoneNumber(phoneNumber)

        let testResult = (expected === actual)
        console.log(`phoneNumber: ${phoneNumber}, expected: ${expected}, actual: ${actual}`)
        testResult ? console.log("Тест пройден") : console.error("Тест НЕ пройден!")


        phoneNumber = "70000000000"
        expected = false
        actual = dataValidator.validPhoneNumber(phoneNumber)
        testResult = (expected === actual)
        console.log(`phoneNumber: ${phoneNumber}, expected: ${expected}, actual: ${actual}`)
        testResult ? console.log("Тест пройден") : console.error("Тест НЕ пройден!")

        
        phoneNumber = "+7(123)456-7890"
        expected = true
        actual = dataValidator.validPhoneNumber(phoneNumber)
        testResult = (expected === actual)
        console.log(`phoneNumber: ${phoneNumber}, expected: ${expected}, actual: ${actual}`)
        testResult ? console.log("Тест пройден") : console.error("Тест НЕ пройден!")

        phoneNumber = "+7(1234)56-7890"
        expected = false
        actual = dataValidator.validPhoneNumber(phoneNumber)
        testResult = (expected === actual)
        console.log(`phoneNumber: ${phoneNumber}, expected: ${expected}, actual: ${actual}`)
        testResult ? console.log("Тест пройден") : console.error("Тест НЕ пройден!")


        //Тестируем правильность адреса электронной почты
        console.log(BREAK_LINE)
        console.log("Тестируем правильность адреса электронной почты")

        let emailAddress = "mymail@mail.ru"
        expected = true
        actual = dataValidator.validEmailAddress(emailAddress)
        testResult = (expected === actual)
        console.log(`e-mail address: ${emailAddress}, expected: ${expected}, actual: ${actual}`)
        testResult ? console.log("Тест пройден") : console.error("Тест НЕ пройден!")

        emailAddress = "mymail2mail.ru"
        expected = false
        actual = dataValidator.validEmailAddress(emailAddress)
        testResult = (expected === actual)
        console.log(`e-mail address: ${emailAddress}, expected: ${expected}, actual: ${actual}`)
        testResult ? console.log("Тест пройден") : console.error("Тест НЕ пройден!")

        emailAddress = "my.mail@mail.ru"
        expected = true
        actual = dataValidator.validEmailAddress(emailAddress)
        testResult = (expected === actual)
        console.log(`e-mail address: ${emailAddress}, expected: ${expected}, actual: ${actual}`)
        testResult ? console.log("Тест пройден") : console.error("Тест НЕ пройден!")

        emailAddress = "my-mail@mail.ru"
        expected = true
        actual = dataValidator.validEmailAddress(emailAddress)
        testResult = (expected === actual)
        console.log(`e-mail address: ${emailAddress}, expected: ${expected}, actual: ${actual}`)
        testResult ? console.log("Тест пройден") : console.error("Тест НЕ пройден!")


        //Тестируем правильность имени
        console.log(BREAK_LINE)
        console.log("Тестируем правильность имени")

        let myName = "Михаил"
        expected = true
        actual = dataValidator.validRussianName(myName)
        testResult = (expected === actual)
        console.log(`Имя: "${myName}", expected: ${expected}, actual: ${actual}`)
        testResult ? console.log("Тест пройден") : console.error("Тест НЕ пройден!")

        myName = "              Михаил"
        expected = false
        actual = dataValidator.validRussianName(myName)
        testResult = (expected === actual)
        console.log(`Имя: "${myName}", expected: ${expected}, actual: ${actual}`)
        testResult ? console.log("Тест пройден") : console.error("Тест НЕ пройден!")

        myName = "Миха  ил"
        expected = false
        actual = dataValidator.validRussianName(myName)
        testResult = (expected === actual)
        console.log(`Имя: "${myName}", expected: ${expected}, actual: ${actual}`)
        testResult ? console.log("Тест пройден") : console.error("Тест НЕ пройден!")

        myName = "михаил"
        expected = false
        actual = dataValidator.validRussianName(myName)
        testResult = (expected === actual)
        console.log(`Имя: "${myName}", expected: ${expected}, actual: ${actual}`)
        testResult ? console.log("Тест пройден") : console.error("Тест НЕ пройден!")

        myName = "Семён"
        expected = true
        actual = dataValidator.validRussianName(myName)
        testResult = (expected === actual)
        console.log(`Имя: "${myName}", expected: ${expected}, actual: ${actual}`)
        testResult ? console.log("Тест пройден") : console.error("Тест НЕ пройден!")

        myName = "СемЁн"
        expected = false
        actual = dataValidator.validRussianName(myName)
        testResult = (expected === actual)
        console.log(`Имя: "${myName}", expected: ${expected}, actual: ${actual}`)
        testResult ? console.log("Тест пройден") : console.error("Тест НЕ пройден!")
    }
}


//DataValidatorTest.runTests()