const http = require("http");
const url = require("url");
const {fetchFile} = require("./common");
const checklist = require("./views/checklist")
const done = require("./views/done")

const requestHandler = (request, response) => {
    const {pathname, query} = url.parse(request.url);

    switch(pathname) {
        case "/":
        case "/about":
            const file = fetchFile("./views/about.html", response)
            response.end(file);
            break;
        
        case "/checklist":
            checklist.view(request, response);
            break;
        
        case "/done":
            done.view(request, response);
            break;
        default:
            response.end();
    }
};

http.createServer(requestHandler).listen(3000, () => {
    console.log("Server is listening at http://0.0.0.0:3000");
});
