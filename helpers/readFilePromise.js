const fs = require('fs');

function readFilePromise(path) {
    return new Promise(function (resolve, reject) {
      fs.readFile(path, 'utf8', function (error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
}

module.exports = readFilePromise;