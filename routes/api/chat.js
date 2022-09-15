const router = require('express').Router(),
      User = require('../../models/User'),
      auth = require('../auth'),
      Chat = require('../../models/Chat');

router.use(auth.verifyToken);

router.post('/start', (req, res, next) => {
    const {id} = req.body;
    User.find({id  : {$in : [id, req.user.id]}}, (error, data) => {
        if(error) {
            res.send({error : {message : error.message}});
        }
        Chat.findOne({participants : [id, req.user.id]}, (err, foundChat) => {
            if(err) {
                res.send({error : {message : err.message}});
            }else if(!foundChat) {
                const chat = new Chat();
                chat.category = 1;
                chat.participants.push(id, req.user.id);
                chat.messages.push({
                    body    : req.body.text,
                    sentBy  : req.user.id,
                    sentAt  : Date.now()
                })
                chat.save((error, data) => {
                    if(error) {
                        res.send({error : {message : error.message}});
                    }else {
                        res.send({success : true, message : data});
                    }
                })
            }else {
                foundChat.messages.push({
                    body    : req.body.text,
                    sentBy  : req.user.id,
                    sentAt  : Date.now()
                });
                foundChat.save((error, data) => {
                    if(error) {
                        res.send({error : {message : error.message}});
                    }else {
                        res.send({success : true, message : data});
                    }
                });
            }
        })
        
    })
});

module.exports = router;