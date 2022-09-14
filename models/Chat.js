const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema(
    {
        
    },
    {timestamps : true}
);

module.exports = mongoose.model('Chat', ChatSchema);