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
            friend.save()
            .then(friendData => {
                user.friends.push(friendData);
                user.save();
                res.send(friendData);
            })
            .catch(error => {
                res.send({error : {message : error.message}});
            })
        }
    })
});

module.exports = router;