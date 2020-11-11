//Импортируем модуль для работы с протоколом HTTP
const http = require('http')

//Импортируем модуль для работы с файловой системой
const fs = require('fs')

const HTTP_PORT = 3000

//Создадим веб-сервер
const server = http.createServer((req, res) => {

    const PUBLIC_PATH = "./public"
    const ROOT_FILE = "/index.html"
    const FAVORITE_ICON_FILE_NAME = "/favicon.ico"
    
    //Получим URL из запроса.
    //Этот файл следует прочитать и отдать браузеру
    var url = req.url;

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
    //URL представляет корневой каталог?
    var filename = (url === "/")
        ? PUBLIC_PATH + ROOT_FILE
        : PUBLIC_PATH + url

    //Читаем содержимое файла
    try {
        var body = fs.readFileSync(filename)
    }
    catch (ex) {
        //Error NO ENTry (Error NO ENTity)
        //https://stackoverflow.com/questions/19902828/why-does-enoent-mean-no-such-file-or-directory
        if (ex.code === 'ENOENT') {
            console.log(`Файл ${url} не найден!`)
        } else {
            throw ex
        }
    }

    //Отправляем содержимое прочитанного файла браузеру
    res.end(body)

});


//Устанавливаем порт для нашего веб-сервера
const port = process.env.port || HTTP_PORT

//Указываем веб-серверу, через какой порт следует ждать запросы и направлять ответы
server.listen(port)

console.log(`Server started on port ${port} !`)
