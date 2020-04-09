const {renderHTML} = require("../common");

exports.view = (request, response) => {
    const data = `<table class="table table-dark">
            <tr>
                <form action="/about" method="POST">
                    <td><input type="text" class="form-control" aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-sm" /></td>
                    <td>
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <button type="submit" class="btn btn-warning">All Done</button>
                            <button type="submit" class="btn btn-success">Add New</button>
                        </div>
                    </td>
                </form>
            </tr>
            <tr>
                <td>1. Dummy text to represent the task details in brief.</td>
                <td>
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button type="submit" class="btn btn-warning">Its Done</button>
                        <button type="submit" class="btn btn-danger">Delete</button>
                    </div>
                </td>
            </tr>
        </table>`
        renderHTML('Checklist', data, response);
}
