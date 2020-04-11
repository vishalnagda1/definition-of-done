const http = require("http");
const url = require("url");
const mongoose = require("mongoose");

const {fetchFile} = require("./common");
const checklist = require("./views/checklist")
const done = require("./views/done")
const {create, markAllComplete} = require("./controllers/checklist");

mongoose.connect(process.env.DB_CONN, {useNewUrlParser: true, useUnifiedTopology: true, keepAlive: 1});
mongoose.connection.on("error", () => {
    console.error("Failed to connect to database");
});
mongoose.set("debug", true);

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
        
        case "/add":
            create(request, response);
            break;
        
        case "/all-done":
            markAllComplete(request, response);
            break;

        default:
            response.end();
    }
};

const PORT = process.env.PORT || 3000;

http.createServer(requestHandler).listen(PORT, () => {
    console.log(`Server is listening at http://0.0.0.0:${PORT}`);
});
