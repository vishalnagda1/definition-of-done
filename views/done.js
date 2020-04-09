const {renderHTML} = require("../common");

exports.view = (request, response) => {
    const data = `<table class="table table-dark">
            <tr><td>1. <del>Dummy text to represent completed task one.</del></td></tr>
            <tr><td>2. <del>Dummy text to represent completed task two.</del></td></tr>
        </table>`
        renderHTML('Done', data, response);
}
