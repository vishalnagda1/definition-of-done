const {renderHTML} = require("../common");
const {getTasks} = require("../controllers/checklist");

exports.view = async (request, response) => {
        const tasks = await getTasks(true);

        let taskData = "";
        tasks.map((task, index) => {
            taskData += `<tr><td>${index+1}. <del>${task.task}</del></td></tr>`;
        });

        const data = `<table class="table table-dark">
            ${taskData}
        </table>`
        renderHTML('Done', data, response);
}
