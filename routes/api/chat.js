const router = require('express').Router(),
      User = require('../../models/User'),
      auth = require('../auth'),
      Chat = require('../../models/Chat');

router.use(auth.verifyToken);

router.post('/start', (req, res, next) => {
    const {id, message} = req.body;
    if(!id || !message) {
        res.send({error : {message : "Please provide id and message to start chat"}})
    }
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
                    body    : message,
                    sentBy  : req.user.id,
                    sentAt  : Date.now()
                })
                chat.save((error, chat) => {
                    if(error) {
                        res.send({error : {message : error.message}});
                    }else {
                        res.send({success : true, message : chat});
                    }
                })
            }else {
                foundChat.messages.push({
                    body    : message,
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

router.delete('/delete', (req, res, next) => {
    const {userId} = req.user;
    const {chatId, msgId} = req.body;
    if(!chatId || !msgId) {
        res.send({error : {message : "Please provide chat id and message id."}})
    }
    Chat.findOne({id : chatId}, (error , chat) => {
        if(error) {
            res.send({error : {message : error.message}});
        }else if(!chat) {
            res.send({error : {message : "Chat is not found!"}});
        }else {
            const index = chat.messages.findIndex(obj => obj.id===msgId && obj.name===userId);
            if(index===-1) {
                res.send({error : {message : "Message is not present."}});
            }else {
                chat.messages.splice(index,1);
                chat.save((err, deletedChat) => {
                    if(err) {
                        res.send({error : {message : err.message}});
                    }else {
                        res.send({success : true, message : "Message has been deleted successfully."})
                    }
                });
            }
        }
    })
})

router.put('/update', (req, res, next) => {
    const {userId} = req.user;
    const {chatId, msgId, message} = req.body;
    if(!chatId, !msgId, !message) {
        res.send({error : {message : "Please provide chat id, message id and message to update."}})
    }
    Chat.findOne({id : chatId}, (error , chat) => {
        if(error) {
            res.send({error : {message : error.message}});
        }else if(!chat) {
            res.send({error : {message : "Chat is not found!"}});
        }else {
            const index = chat.messages.findIndex(obj => obj.id===msgId && obj.name===userId);
            if(index===-1) {
                res.send({error : {message : "Message is not present."}});
            }else {
                chat.messages[index].body = message;
                chat.messages[index].isEdited = true;
                chat.save((err, updatedChat) => {
                    if(err) {
                        res.send({error : {message : err.message}});
                    }else {
                        res.send({success : true, more : {message : "Message has been updated successfully.", data : updatedChat}})
                    }
                });
            }
        }
    })
})

module.exports = router;