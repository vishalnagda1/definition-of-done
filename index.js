const http = require("http");
const url = require("url");
const mongoose = require("mongoose");

const {fetchFile, logger} = require("./common");
const checklist = require("./views/checklist")
const done = require("./views/done")
const {create, markAllComplete, markComplete, deleteTask} = require("./controllers/checklist");

mongoose.connect(process.env.DB_CONN, {useNewUrlParser: true, useUnifiedTopology: true, keepAlive: 1});
mongoose.connection.on("error", () => {
    logger.error("Failed to connect to database");
});

mongoose.set("debug", process.env.DEBUG_MONGO);

const requestHandler = (request, response) => {
    const {pathname} = url.parse(request.url);
    (pathname !== "/favicon.ico") && logger.info(pathname);

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

        case "/task-done":
            markComplete(request, response);
            break;
        
        case "/delete":
            deleteTask(request, response);
            break;

        default:
            response.end();
    }
};

const PORT = process.env.PORT || 3000;

http.createServer(requestHandler).listen(PORT, () => {
    logger.info(`Server is listening at http://0.0.0.0:${PORT}`);
});
