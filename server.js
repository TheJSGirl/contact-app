const express = require('express');

const bodyParser = require('body-parser');
const mysql = require('mysql2');
const morgan = require('morgan');
const fs = require('fs');
const port = 3000;
const app = express();
const expressValidator = require('express-validator');
let contact =  fs.readFileSync('demo.json');
const v1Routes = require('./routes/v1');


// set the view engine to ejs
app.set('view engine', 'ejs');

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());
app.use(morgan('dev'));

//routes middleware
app.use('/api', v1Routes);

 //reading data
 try{
    contact = JSON.parse(contact);
}
catch(e){
    console.log(e);
}








app.listen(port, () => {
    console.log('listen at port :', port);
});