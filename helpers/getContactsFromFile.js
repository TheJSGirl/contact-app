const readFilePromise = require('./readFilePromise');

module.exports = {
    getContactsFromFile: async (filePath) => {
        try {
            const fileData = await readFilePromise(filePath);

            // console.log('**file data from helper => ', fileData);

            const newData = fileData.map((item) => {
                const myContact = {
                    name: item.firstName + ' ' + item.lastName,
                    mobile: item.mobileNo
                }
            });
            console.log('*******',newData);
            return fileData;
        }
        catch(err){
            console.error(err);
        }
    }
}