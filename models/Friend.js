const mongoose = require('mongoose');

const FriendSchema = new mongoose.Schema(
    {
        name : {
            type : mongoose.Schema.Types.ObjectId,
            ref  : 'User'
        },
        commonGroups : [{
            type : mongoose.Types.ObjectId,
            ref  : 'Group'
        }],
        isMuted : {
            type    : Boolean,
            default : false
        },
        isBlocked : {
            type    : Boolean,
            default : false
        }
    },
    {timestamps : true}
);

module.exports = mongoose.model();