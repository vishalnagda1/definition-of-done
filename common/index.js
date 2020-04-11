const fs = require("fs");
const logger = require("./logger");

const fetchFile = (path, response) => {
    const file = fs.readFileSync(path);
    if(file) return file;
    response.end();
};

const header = (response) => {
    const file = fetchFile("./views/header.html", response);
    return file;
}

const footer = (response) => {
    return fetchFile("./views/footer.html", response);
}

const commonView = (title, data) =>  {
    return `<div class="container">
        <div class="row">
            <div class="col-sm text-white">
                <h5>${title}</h5>
            </div>
        </div>
        <div class="row">
            <div class="col-sm">
                <div class="jumbotron">
                    <div class="container">
                        ${data}
                    </div>
                </div>
            </div>
        </div>
    </div>`;
}

const renderHTML = (title, dataHTML, response) => {
    const headerPage = header(response);
    const footerPage = footer(response);
    const htmlData = commonView(title, dataHTML);
    response.end(`${headerPage}${htmlData}${footerPage}`)
}

module.exports = {fetchFile, renderHTML, logger};
