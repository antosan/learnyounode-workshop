const http = require("http");

const url1 = process.argv[2];
const url2 = process.argv[3];
const url3 = process.argv[4];

function collect(url) {
    return new Promise((resolve, reject) => {
        http.get(url, res => {
            res.setEncoding("utf8");

            let body = "";

            res.on("data", data => {
                body += data;
            });

            res.on("end", () => {
                resolve(body);
            });
        }).on("error", err => {
            reject(err);
        });
    });
}

Promise
    .all([collect(url1), collect(url2), collect(url3)])
    .then(resArray => {
        resArray.forEach(item => {
            console.log(item);
        });
    });

// Alternative solution

// var http = require('http')
// var bl = require('bl')
// var results = []
// var count = 0

// function printResults () {
//     for (var i = 0; i < 3; i++) {
//         console.log(results[i])
//     }
// }

// function httpGet (index) {
//     http.get(process.argv[2 + index], function (response) {
//         response.pipe(bl(function (err, data) {
//             if (err) {
//                 return console.error(err)
//             }

//             results[index] = data.toString()
//             count++

//             if (count === 3) {
//                 printResults()
//             }
//         }));
//     });
// }

// for (var i = 0; i < 3; i++) {
//     httpGet(i)
// }