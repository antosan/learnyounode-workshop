const http = require("http");
const url = require("url");

const port = process.argv[2];

const server = http.createServer((req, res) => {
    const time = new Date(url.parse(req.url, true).query.iso);
    let result = null;

    if (req.url.indexOf("/api/parsetime") > -1) {
        result = {
            hour: time.getHours(),
            minute: time.getMinutes(),
            second: time.getSeconds()
        }
    } else if (req.url.indexOf("/api/unixtime") > -1) {
        result = {
            unixtime: time.getTime()
        }
    }

    if (result) {
        res.writeHead(200, { "Content-Type": "application/json" });
        result = JSON.stringify(result);
    } else {
        res.writeHead(404);
    }

    res.end(result);
});

server.listen(port);