const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_FACTOR = process.env.SALT_FACTOR; 

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name is required'
    }, 
    email: {
        type: String,
        required: 'Email is required'
    }, 
    password: {
        type: String, 
        required: 'Password is required'
    }, 
    avatar: {
        type: String, 
        default: ' '
        //TODO: add a default image
    }
}, { 
    timestamps: true, 
    toJSON: {
        transform: (doc, ret) => {
            ret.id = doc._id;
            delete ret._id;
            delete ret.__v;
            delete ret.password; 
            return ret;
        }
    }
});

userSchema.pre('save', function save (next) {
    if (!this.isModified('password')) {
        next();
    } else {
        bcrypt.genSalt(SALT_FACTOR)
            .then(salt => {
                return bcrypt.hash(this.password, salt)
            })
            .then(hash => {
                this.password = hash;
                next();
            })
            .catch(error => next(error))
    }
})

//TODO: Checkpassword method
// userSchema.methods.checkPassword = function (password) {
//    bcrypt.compare(password, this.password)
// 
//}

module.exports = mongoose.model('User', userSchema);
