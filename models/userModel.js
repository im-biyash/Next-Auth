
import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true 
        
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        unique: true,
    
    },
    password:{
        type: String,
        required: true,
        unique: true,
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
   forgetPasswordToken: String,
   forgetPasswordExpiry: Date,
   verifyToken: String,
   verifyTokenExpiry: Date
})
const User = mongoose.model("users", userSchema);
export default User;