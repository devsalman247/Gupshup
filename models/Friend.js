const mongoose = require('mongoose');

const FriendSchema = new mongoose.Schema(
    {
        friendDetails : {
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
        },
        isArchived : {
            type    : Boolean,
            default : false
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

FriendSchema.methods.toJSON = function() {
    return {
        id : this.id,
        friendDetails : this.friendDetails,
        commonGroups : this.commonGroups,
        isMuted : this.isMuted,
        isBlocked : this.isBlocked,
        isArchived : this.isArchived
    }
}

module.exports = mongoose.model('Friend',FriendSchema);