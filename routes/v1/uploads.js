const uploads = require('express').Router();
const path = require('path');
const multer = require('multer');
const fileUpload = multer({dest: path.join(__dirname, '../../uploads') });

uploads.route('/')
    .post( fileUpload.single('file'),(req, res) => {
        console.log(req.file);
        console.log(req.body);
        res.status(200).json(req.file);
    });

module.exports = uploads;