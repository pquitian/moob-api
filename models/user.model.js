const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_FACTOR = process.env.SALT_FACTOR; 
const Vehicle = require('./vehicle.model');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name is required', 
        unique: true
    }, 
    email: {
        type: String,
        required: 'Email is required'
    }, 
    password: {
        type: String, 
        required: 'Password is required'
    }, 
    vehicles: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Vehicle', 
        default: []
    }
}, { 
    timestamps: true, 
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            ret.id = doc._id;
            delete ret._id;
            delete ret.__v;
            delete ret.password; 
            return ret;
        }
    }
});

userSchema.virtual('avatar')
  .get(function() {
    return `https://api.adorable.io/avatars/175/${this.id}.png`;
})

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


userSchema.methods.checkPassword = function (password) {
   return bcrypt.compare(password, this.password)
}

module.exports = mongoose.model('User', userSchema);
