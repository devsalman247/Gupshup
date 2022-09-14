const mongoose = require('mongoose'),
      uniqueValidator = require('mongoose-unique-validator'),
      jwt = require('jsonwebtoken'),
      bcrypt = require('bcrypt'),
      secret = require('../config/env/development').secret;

const UserSchema = new mongoose.Schema(
    {
        name : {
            type     : String,
            required : true
        },
        email : {
            type     : String,
            required : [true, 'is required'],
            unique   : true,
            match    : [/\S+@\S+\.\S+/, 'is invalid']
        },
        about : {
            type : String
        },
        hash : {
            type     : String,
            required : [true, 'is required']
        },
        salt : {
            type     : String,
            required : true
        }
    },
    {timestamps : true}
);

UserSchema.plugin(uniqueValidator, {message : "is required."});

UserSchema.pre('save', function() {
    this.salt = bcrypt.genSaltSync();
    this.hash = bcrypt.hashSync(this.hash, this.salt);
});

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.generateJWT = function() {
    return jwt.sign(
        {
            id    : this.id,
            name  : this.name,
            email : this.email
        },
        secret,
        {expiresIn : '4h'}
    );
}

UserSchema.methods.toAuthJSON = function() {
    return {
        name  : this.name,
        email : this.email,
        token : this.generateJWT()
    }
};

UserSchema.methods.toJSON = function() {
    return {
        name  : this.name,
        email : this.email,
        about : this.about
    }
}

module.exports = mongoose.model('User',UserSchema);