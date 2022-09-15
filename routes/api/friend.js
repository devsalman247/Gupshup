const router = require('express').Router(),
      auth = require('../auth'),
      User = require('../../models/User'),
      Friend = require('../../models/Friend');

router.use(auth.verifyToken);

router.post('/add', (req, res, next) => {
    if(!req.body.id) {
        res.send({error : {message : "Please provide user id!"}});
    }
    User.findById(req.body.id, (error, user) => {
        if(error) {
            res.send({error : {message : error.message}});
        }else if(!user) {
            res.send("User is not registered.");
        }else {
            const friend = new Friend();
            friend.name = user.id;
            friend.save()
            .then(friendData => {
                User.findById(req.user.id, (error, data) => {
                    if(error) {
                        res.send({error : {message : error.message}});
                    }
                    data.friends.push(friendData);
                    data.save();
                })
                res.send(friendData);
            })
            .catch(error => {
                res.send({error : {message : error.message}});
            })
        }
    })
});

module.exports = router;