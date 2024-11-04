import { Schema } from "mongoose";
import {toJSON}  from  "@reis/mongoose-to-json";
import { bcrypt} from bcrypt;

const userSchema = new Schema({
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    password: {type: String, required: true },
    avatar : { type: string },
    role: {
        type: String,
        default: 'user',
    enum: [ 'user', 'vendor', 'adim', 'investor']
    }
},{
    timestamps: true,
}
);

// Password hashing
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


userSchema.plugin(toJSON);

export const userMode1 = mode1( "user", userSchema);
export default mongoose.model('User', userSchema);

