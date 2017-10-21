const messages = require('express').Router();
const pool = require('../../db');
const fs = require('fs');
const twilio = require('twilio');
const tokens = require('../../tokens');


messages.route('/')
    .post(async (req, res) => {

        try {
            let messageBody = null;

            if(!req.body.message){
                messageBody = 'your OTP is' +' '+ Math.floor(Math.random()*899) + 10;
            }
            else {
                messageBody = req.body.message;
            }
        
            const client = new twilio(tokens.accountSid, tokens.authToken);
            // const mobileNo = req.params.mobileNo;
                                
            const message = await client.messages.create({
                body: messageBody,
                to: '+91' + req.body.mobileNo,  // Text this number
                from: '+14352222045' // From a valid Twilio number
            });

            // save the message to sent messages table if message.errorCode is null
            if(message.errorCode === null){
                const messageData = {
                    message: req.body.message,
                    sentTo: req.body.mobileNo,
                    status: 1
                }
                const [query] = await pool.query('INSERT INTO messages SET ?', messageData);
            }
            
            return res.status(200).json({
                data: message.body,
                status: 'ok',
                message: 'successful'
            });
        }
        catch(err){
            console.error(err);

            // save the message to failed messages table if message.errorCode is not null
            
            if(err.code !== null){
                const messageData = {
                    message: req.body.message,
                    sentTo: req.body.mobileNo,
                    status: 0
                }
                const [query] = await pool.query('INSERT INTO messages SET ?', messageData);
            }
            
            if(err.status === 400){
                return res.status(400).json({
                    status: 'failed',
                    message: err.message
                });
            }
        }
    })

  
module.exports = messages;