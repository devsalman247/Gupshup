const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema(
    {
        participants : [{
            sender : {
                type     : mongoose.Schema.Types.ObjectId,
                ref      : 'User',
                required : true
            },
            receiver : {
                user : {
                    type : mongoose.Schema.Types.ObjectId,
                    ref  : 'Friend'
                },
                group : {
                    type : mongoose.Schema.Types.ObjectId,
                    ref  : 'Group'
                }
            }
        }],
        messages : [{
            body : {
                type : String
            },
            sentBy : {
                type : mongoose.Schema.Types.ObjectId,
                ref  : 'User'
            },
            sentAt   : Date,
            isStarred : {
                type    : Boolean,
                default : false
            },
            isLiked : {
                type    : Boolean,
                default : false
            }
        }],
        conversationType : {
            type : Boolean          // 0= one-to-one, 1= group
        }
    },
    {timestamps : true}
);

module.exports = mongoose.model('Chat', ChatSchema);