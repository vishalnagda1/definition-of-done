const http = require("http");
const url = require("url");
const fs = require("fs");

const readHTML = (path, response) => {
    const file = fs.readFileSync(path);
    if(file) return file;
    response.end();
};

const requestHandler = (request, response) => {
    const {pathname, query} = url.parse(request.url);

    switch(pathname) {
        case '/':
        case '/about':
            const file = readHTML("./views/about.html")
            response.end(file);
            break;
        default:
            response.end();
    }
};

http.createServer(requestHandler).listen(3000, () => {
    console.log("Server is listening at http://0.0.0.0:3000");
});
