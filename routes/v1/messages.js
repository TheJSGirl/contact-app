const messages = require('express').Router();
const pool = require('../../db');
const fs = require('fs');
let contact = fs.readFileSync('demo.json');
const twilio = require('twilio');
const helper = require('../../helper');

console.log('helper ------>', helper);


//reading data
try{
    contact = JSON.parse(contact);
    console.log(contact);
}
catch(e){
    console.log(e);
}

messages.route('/')
    .post((req, res) => {

    //    const result = contact.filter((item) => item.mobileNo !== req.body.mobileNo);
    //         console.log('result',result);

        //validation


 
                var client = new twilio(accountSid, authToken);
                // const mobileNo = req.params.mobileNo;
                                    
                        client.messages.create({
                            body: 'your OTP is' +" "+ Math.floor(Math.random()*899) + 10,
                            to: '+91'+req.body.mobileNo,  // Text this number
                            from: '+14352222045' // From a valid Twilio number
                        })
                        .then((message) => {
                            console.log(message);
                            return res.status(200).json({
                                data: message.body,
                                status: 'ok',
                                message: 'successful'
                            });
                            
                        })
                        .catch((err) => {

                            if(err.status === 400){
                                return res.status(400).json({
                                    status: 'failed',
                                    message: 'this no. is not verified'
                                });
                            }
                            console.error(err)
                        });
              
                    
        // })
    })

  
module.exports = messages;