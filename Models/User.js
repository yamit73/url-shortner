import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    user_id: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    created_at: {
        type: String,
        required: true
    },
});

userSchema.pre('save', (next) => {
    if (!this.user_id) {
        this.user_id = this._id.toString();
    }
    next();
});

export default userSchema;