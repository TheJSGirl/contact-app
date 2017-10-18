const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql2');
const fs = require('fs');
const port = 3000;
const app = express();
const expressValidator = require('express-validator');
let contact =  fs.readFileSync('demo.json');
const v1Routes = require('./routes/v1');



//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());

//routes middleware
app.use('/api', v1Routes);

 //reading data
 try{
    contact = JSON.parse(contact);
}
catch(e){
    console.log(e);
}


//get all contacts
app.get('/contacts', (req, res) => {
    let contactDetail = [];
    contact.map((item) => {
        const myContact = {
        name : item.firstName + " " + item.lastName,
        mobile : item.mobileNo
    } 
        contactDetail.push(myContact);
    })
    return res.status(200).json(contactDetail);
});


//get all contact names
app.get('/contacts/names', (req, res) => {
    let fullName = [];
    contact.forEach((element) => {
        let name = element.firstName +" "+ element.lastName;
        fullName.push(name);
    });
    return res.status(200).json(fullName);
});


//get contact detail by id
app.get('/contacts/:id', (req, res) => {
    req.checkBody('id', 'please mention id').exists();
    
    const error = req.validationErrors();
    
          if(error){
            res.status(400).json({
              status: 'failed',
              message: error[0].msg
            })
          }

    const id = parseInt(req.params.id);
    console.log(typeof id);
    const contactDetail = contact.filter((item)=> item.id === id);
    console.log(contactDetail); 
    
    return res.status(200).json(contactDetail);
});

app.listen(port, () => {
    console.log('listen at port :', port);
});