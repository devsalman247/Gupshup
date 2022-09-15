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
            category : {
                type : Number       // 0 = group, 1 = one-to-one
            },
            body : {
                type     : String,
                required : true
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
        }]
    },
    {timestamps : true}
);

module.exports = mongoose.model('Chat', ChatSchema);