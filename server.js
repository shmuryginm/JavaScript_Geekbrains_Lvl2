const http = require('http');

const fs = require('fs');

const server = http.createServer((req, res) => {

    console.log(req.url)
    
    const body = rec.ul === "styles.css" 
        ? fs.readFileSync("./public/styles.css")
        : fs.readFileSync("./public/index.html")
    res.end(body)
});

const port = process.env.port || 3000;

server.listen(port);

console.log("Server started on port ${port}!");