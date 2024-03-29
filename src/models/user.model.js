const {Schema, model} = require("mongoose");

const bcrypt = require("bcrypt");

const userSchema = new Schema({
    name : {type: String, required: true},
    email : {type: String, required: true, unique: true},
    password : {type: String, required: true},
    profile_photo_url : {type: String, required: true},
    roles : [{type: String, required: true}]
}, {versionKey: false, timestamps: true});

userSchema.pre("save", function(next) {
    if(! this.isModified("password")) next();
    bcrypt.hash(this.password, 8, (err, hash) => {
        this.password = hash;
        return next();
    });
})

userSchema.methods.checkPassword = function(password) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, this.password, function(err, res) {
            if(err) return reject(err);
            return resolve(res);
        });
    })
}

const User = model("user", userSchema);

module.exports = User;