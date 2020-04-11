const {renderHTML} = require("../common");
const {getTasks} = require("../controllers/checklist");

exports.view = async (request, response) => {
    const tasks = await getTasks(false);

    let taskData = ""
    tasks.map((task, index) => {
        taskData += `<tr>
                    <td>${index+1}. ${task.task} (Created at ${new Date(task.createdAt).toDateString()})</td>
                    <td>
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <button type="button" dataId="${task._id}" class="btn btn-warning task-done">Its Done</button>
                            <button type="button" dataId="${task._id}" class="btn btn-danger task-delete">Delete</button>
                        </div>
                    </td>
                </tr>`;
    });
    
    const data = `<table class="table table-dark">
        <tr>
            <td><input type="text" class="form-control" id="taskInput" aria-label="Task input"
                    aria-describedby="inputGroup-sizing-sm" /></td>
            <td>
                <div class="btn-group" role="group" aria-label="Basic example">
                    <button type="button" onclick="allDone()" class="btn btn-warning">All Done</button>
                    <button type="button" onclick="addNewTask()" class="btn btn-success">Add New</button>
                </div>
            </td>
        </tr>
        ${taskData}
    </table>`
    
    renderHTML('Checklist', data, response);
}
