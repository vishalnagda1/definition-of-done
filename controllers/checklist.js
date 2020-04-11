const querystring = require("querystring");
const Task = require("../models/checklist");
const {logger} = require("../common");

module.exports.create = (request, response) => {
    let dataQuery = ""
    request.on("data", data => {dataQuery += data});
    request.on("end", () => {
        const {task} = querystring.parse(dataQuery);
        new Task({task}).save((err, data) => {
            if(err) {
                logger.error(err);
                response.end("404");
            } else {
                response.writeHead(308, {"Location": "/checklist"});
                response.end();
            }
        }); 
    });
}

module.exports.getTasks = async (complete) => {
    const tasks = await Task.find({complete});
    return tasks;
}

module.exports.markAllComplete = (request, response) => {
    Task.updateMany({complete: false}, {complete: true}, (err, data) => {
        if(err) {
            logger.error(err);
            response.end("404");
        } else {
            response.writeHead(308, {"Location": "/checklist"});
            response.end();
        }
    });
}

module.exports.markComplete = (request, response) => {
    let dataQuery = ""
    request.on("data", data => {dataQuery += data});
    request.on("end", () => {
        const {id} = querystring.parse(dataQuery);
        Task.update({_id: id}, {complete: true}, (err, data) => {
            if(err) {
                logger.error(err);
                response.end("404");
            } else {
                response.writeHead(308, {"Location": "/checklist"});
                response.end();
            }
        });
    })
}

module.exports.deleteTask = (request, response) => {
    let dataQuery = ""
    request.on("data", data => {dataQuery += data});
    request.on("end", () => {
        const {id} = querystring.parse(dataQuery);
        Task.deleteOne({_id: id}, (err, data) => {
            if(err) {
                logger.error(err);
                response.end("404");
            } else {
                response.writeHead(308, {"Location": "/checklist"});
                response.end();
            }
        });
    })
}
