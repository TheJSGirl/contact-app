const messages = require('express').Router();
const pool = require('../../db');
const fs = require('fs');
let contact = fs.readFileSync('demo.json');
const twilio = require('twilio');


//reading data
try{
    contact = JSON.parse(contact);
    console.log(contact);
}
catch(e){
    console.log(e);
}


messages.route('/:mobileNo')
    .post((req, res) => {
        // console.log(req.params.mobileNo);
        const [result] = contact.filter((item) => item.mobileNo === req.params.mobileNo);
            console.log('result ======>>>>>',result);

    })
messages.route('/')
    .post((req, res) => {

        // Your Account SID from www.twilio.com/console
        var accountSid = 'ACaae3e2190a35b70c273ac0c23c65e525';
        // Your Auth Token from www.twilio.com/console
        var authToken = '4fc110c56644c898b85b8f2730d5c977';
    //    const result = contact.filter((item) => item.mobileNo !== req.body.mobileNo);
    //         console.log('result',result);

       
 
                var client = new twilio(accountSid, authToken);
                
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