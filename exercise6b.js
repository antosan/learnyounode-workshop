const fs = require("fs");
const path = require("path");

function filesList(directory, extension, callback) {
    const ext = "." + extension;

    fs.readdir(directory, (err, files) => {
        if (err) {
            return callback(err);
        }

        files = files.filter(file => path.extname(file) === ext);

        callback(null, files);
    });
}

module.exports = filesList;