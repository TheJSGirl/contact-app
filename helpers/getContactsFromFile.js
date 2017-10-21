const readFilePromise = require('./readFilePromise');

module.exports = {
    getContactsFromFile: async (filePath) => {
        try {
            const fileData = await readFilePromise(filePath);

            // console.log('**file data from helper => ', fileData);

            console.log( fileData);
            return fileData;
        }
        catch(err){
            console.error(err);
        }
    }
}