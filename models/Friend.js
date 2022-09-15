const mongoose = require('mongoose');

const FriendSchema = new mongoose.Schema(
    {
        name : {
            type : mongoose.Schema.Types.ObjectId,
            ref  : 'User',
            required : true
        },
        commonGroups : [{
            type : mongoose.Types.ObjectId,
            ref  : 'Group',
            unique : true
        }],
        isMuted : {
            type    : Boolean,
            default : false
        },
        isBlocked : {
            type    : Boolean,
            default : false
        },
        isArchived : {
            type    : Boolean,
            default : false
        },
        chat : {
            type : mongoose.Schema.Types.ObjectId,
            ref  : 'Chat'
        }
    },
    {timestamps : true}
);

FriendSchema.methods.toJSON = function() {
    return {
        id : this.id,
        name : this.name,
        commonGroups : this.commonGroups,
        isMuted : this.isMuted,
        isBlocked : this.isBlocked,
        isArchived : this.isArchived,
        chat : this.chat
    }
}

module.exports = mongoose.model('Friend',FriendSchema);