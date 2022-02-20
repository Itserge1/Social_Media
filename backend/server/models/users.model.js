const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "User must have a username"],
        minlength: [3, "username must be at leaste 3 characters"],
        maxlength: [20, "username must be less than 20 characters"],
        unique: [true, "username already existe"]
    },

    email: {
        type: String,
        required: [true, "User must have an Email"],
        minlength: [5, "Email mut be at least 5 characters"],
        maxlength: [100, "Email must be less than 100 characters"],
        unique: [true, "User already existe"],
        // Validate using rejex (Using regular expretion)
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        }
    },

    password: {
        type: String,
        required: [true, "User must have a password"],
        minlength: [6, "Password must be at least 6 characters"]
    },

    profilePicture: {
        type: String,
        default: ""
    },

    coverPicture: {
        type: String,
        default: ""
    },

    followers: {
        type: Array,
        default: []
    },

    followings: {
        type: Array,
        default: []
    },

    isAdmin: {
        type: Boolean,
        default: false,
    },

    description: {
        type: String,
        max: 50,
        default: ""
    },
    city: {
        type: String,
        max: 50,
        default: ""
    },
    from: {
        type: String,
        max: 50,
        default: ""
    },
    // relationship: {
    //     type: Number,
    //     enum: [1, 2, 3],
    // },
    relationship: {
        type: String,
        default: "Single"
    }
}, { timestamps: true });

// Creating a virtual field for validation purpuse:
// the virtual field "confirmPassword" is used to just validate the password matches confirmPassword
// the getter and setter are just creating temporary feilds for _confirmPassword 

UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set(value => this._confirmPassword = value);


// the block of code below is making the comparison
// PS: THIS CODE RUN FIRST BEFORE SENDING ANYTHIBG TO THE DATABASE 
// TO ENSURE THAT WE HAVE A CLEAR INPUT DATA
UserSchema.pre('validate', function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next(); //after the above process is dove , go to the next usual step.
});


// HASHING THE PASSWORD

// before (pre) saving teh user to my DB run this step (we have to pass the validations), befaore hashind the password
UserSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});


const user = mongoose.model("users", UserSchema);

module.exports = user;