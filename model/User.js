import mongoose, { Schema,model } from "mongoose";
import {toJSON}  from  "@reis/mongoose-to-json";
import  bcrypt from "bcryptjs"

const userSchema = new Schema({
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    password: {type: String, required: true },
    phoneNo:{ type: String, required: true },
    avatar : { type: String },
    role: {
        type: String,
        default: 'user',
    enum: [ 'user', 'vendor', ,]
    }
},{
    timestamps: true,
}
);

//Password hashing
 userSchema.pre('save', async function (next) {
     if (!this.isModified('password')) return next();
     const salt = await bcrypt.genSalt(10);
          this.password = await bcrypt.hash(this.password, salt);
  next();
 });

// // Method to compare passwords
 userSchema.methods.matchPassword = async function (enteredPassword) {
     return await bcrypt.compare(enteredPassword, this.password);
 };


 userSchema.plugin(toJSON);

const User =mongoose.model('User',userSchema);
export default User;
