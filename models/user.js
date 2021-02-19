const mongoose = require ("mongoose")
const validator = require("validator")

const userSchema = new mongoose.Schema({
    name : {
        type:String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        lowercase:true,
        validate(value){
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid")
            }
        }
    } ,
    password: {
        type: String,
        unique: true,
        minlength: 7,
        validate(value){
            if (value.toLowerCase().includes("password")) {
                throw new Error("password cannot contain password")
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if (value<0) {
                throw new Error("age ne peut pas inferieur a 0")
            }
        }
    }
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema)
module.exports= User
