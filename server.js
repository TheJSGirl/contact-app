const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const port = 3000;
const app = express();
let contact =  fs.readFileSync('demo.json');



//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
 //reading data
 try{
    contact = JSON.parse(contact);
}
catch(e){
    console.log(e);
}

app.get('/', (req, res) => {
    let fullName = [];
    contact.forEach(function(element) {
        let name = element.firstName +" "+ element.lastName;
        fullName.push(name);
    });
    res.send(fullName);
});

app.listen(port, () => {
    console.log('listen at port :', port);
});