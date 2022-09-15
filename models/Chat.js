const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema(
    {
        participants : [{
            type : mongoose.Schema.Types.ObjectId,
            ref  : 'User',
            unique : true
        }],
        category : {
            type     : Number ,  // 0 = group, 1 = one-to-one 2 = unknown-to-unknown
            required : true
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
            sentAt   : Date
        }]
    },
    {timestamps : true}
);

module.exports = mongoose.model('Chat', ChatSchema);