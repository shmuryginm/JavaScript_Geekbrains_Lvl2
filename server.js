//Импортируем модуль для работы с протоколом HTTP
const http = require("http")

//Импортируем модуль для работы с файловой системой
const fs = require("fs")

//Зададим по умолчанию номер порта для работы с браузером
const DEFAULT_HTTP_PORT_NUMBER = 3000

//Создадим веб-сервер
const server = http.createServer((req, res) => {
    const PUBLIC_PATH = "./public"
    const ROOT_FILE = "/index.html"
    const FAVORITE_ICON_FILE_NAME = "/favicon.ico"
    
    //Получим URL из запроса.
    //Этот файл следует прочитать и отдать браузеру
    const url = req.url;

    console.log(url);

    /*
    const body = url === "/styles.css" 
        ? fs.readFileSync("./public/styles.css")
        : fs.readFileSync("./public/index.html")
    */

    //Заглушка для файла favicon.ico. Сервер его пока не возвращает
    if (url === FAVORITE_ICON_FILE_NAME) {
        res.end()
        return
    }

    //Определим имя файла, который следует прочитать
    //URL является корневым каталогом?
    const filename = (url === "/")
        ? PUBLIC_PATH + ROOT_FILE
        : PUBLIC_PATH + url

    let body

    //Читаем содержимое файла
    try {
        body = fs.readFileSync(filename)
    }
    catch (ex) {
        //ENOENT == Error NO ENTry (Error NO ENTity)
        //https://stackoverflow.com/questions/19902828/why-does-enoent-mean-no-such-file-or-directory
        if (ex.code === 'ENOENT') {
            console.log(`Ошибка! Файл ${url} не найден!`)
        } else {
            // TODO Ревлизовать передачу браузеру кода состояния HTTP
            console.log(`Ошибка! ${ex.name} ${ex.message}!`)
        }
    }

    //Отправляем содержимое прочитанного файла браузеру
    res.end(body)
});


//Устанавливаем номер порта для нашего веб-сервера
//Либо из переменной среды "PORT",
//а если она не задана, то номер порта будет равен DEFAULT_HTTP_PORT_NUMBER
const port = process.env.PORT || DEFAULT_HTTP_PORT_NUMBER

//Указываем веб-серверу, через какой порт работать с браузером
server.listen(port)

console.log(`Server started on port ${port} !`)