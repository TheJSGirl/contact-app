const fs = require('fs');

function readFilePromise(path) {
    return new Promise(function (resolve, reject) {
      fs.readFile(path, 'utf8', function (error, result) {
        if (error) {
          reject(error);
          console.error(error);
        } else {
          resolve(result);
          // console.log("result",result);
        }
      });
    });
}

module.exports = readFilePromise;