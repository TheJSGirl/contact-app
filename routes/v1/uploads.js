const uploads = require('express').Router();
const path = require('path');
const multer = require('multer');
const fileUpload = multer({dest: path.join(__dirname, '../../uploads') });
const fs = require('fs');
const {getContactsFromFile}= require('../../helpers');



uploads.route('/')
    .post( fileUpload.single('file'),(req, res) => {
        console.log(req.file);
        console.log(req.body);
        //read the file
        const contacts = getContactsFromFile(req.file.path);
        //map the data        
        console.log('**Contacts => ', contacts);
        //insert the data into the db
        res.status(200).json(req.file);
    });

module.exports = uploads;