const Task = require("../models/checklist");
const querystring = require("querystring");

module.exports.create = (request, response) => {
    let dataQuery = ""
    request.on("data", data => {dataQuery += data});
    request.on("end", () => {
        const {task} = querystring.parse(dataQuery);
        console.log("task", task);
        new Task({task}).save((err, data) => {
            if(err) {
                console.error(err);
                response.end("404");
            } else {
                console.log(`data`, data);
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
            console.error(err);
            response.end("404");
        } else {
            response.writeHead(308, {"Location": "/checklist"});
            response.end();
        }
    });
}
