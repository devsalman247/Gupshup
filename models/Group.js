const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema(
    {
        name : {
            type     : String,
            required : [true, 'is required']
        },
        description : {
            type : String
        },
        admins : [{
            type : mongoose.Schema.Types.ObjectId,
            ref  : 'User' 
        }],
        members : [{
            type : mongoose.Schema.Types.ObjectId,
            ref  : 'User'
        }], 
        limit : {
            type    : Number,
            default : 200
        },
        created_At : {
            type    : Date,
            default : Date.now()
        },
        created_By : {
            type : mongoose.Schema.Types.ObjectId,
            ref  : 'User'
        },
        isMuted : {
            type    : Boolean,
            default : false
        },
        isArchived : {
            type    : Boolean,
            default : false
        }, 
        canSend : {
            type    : Boolean,  // false= only admin can send, true= all participants can send
            default : true
        },
        messages : [{
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

module.exports = mongoose.model('Group', GroupSchema);