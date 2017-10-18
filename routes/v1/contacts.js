const contacts = require('express').Router();
const fs = require('fs');
let contact =  fs.readFileSync('demo.json');

 //reading data
try{
    contact = JSON.parse(contact);
}
catch(e){
    console.log(e);
}

contacts.route('/')
    //get all contacts
    .get((req, res) => {
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

contacts.route('/names')
    //get all contact names
    .get((req, res) => {
        let fullName = [];
        contact.forEach((element) => {
            let name = element.firstName +" "+ element.lastName;
            fullName.push(name);
        });
        return res.status(200).json(fullName);
    });

//get contact detail by id
contacts.route('/:id')
    .get((req, res) => {
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


module.exports = contacts;
