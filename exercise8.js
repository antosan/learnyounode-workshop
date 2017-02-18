const http = require("http");

const url = process.argv[2];

http.get(url, res => {
    res.setEncoding("utf8");

    let body = "";

    res.on("data", data => {
        body += data;
    });

    res.on("end", () => {
        console.log(body.length);
        console.log(body);
    });
}).on("error", console.error);