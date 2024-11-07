import mongoose, { Schema,model } from "mongoose";
import {toJSON}  from  "@reis/mongoose-to-json";
import  bcrypt from "bcryptjs"

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNo: { type: String, required: true },
    avatar: { type: String },
    role: {
      type: String,
      default: "user",
      enum: ["user", "vendor", ,],
    },
    // Store-specific fields for vendors
    storeName: { type: String },
    storeLocation: { type: String },
    businessPhoneNo: { type: String },
    businessEmail: { type: String },
    storeDescription: { type: String },
    operatingHours: { type: String }, // e.g., "9 AM - 5 PM"
    socialMediaLinks: { type: Map, of: String }, // e.g., { facebook: "url", twitter: "url" }
    storePolicies: { type: String }, //
  },
  {
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
