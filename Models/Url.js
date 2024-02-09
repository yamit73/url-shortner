import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
    {
        user_id: {
            type: String
        },
        short_id: {
            type: String,
            unique: true
        },
        redirect_url: {
            type: String,
            required: true,
        },
        visit_count: {
            type: Number
        }
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
);

urlSchema.pre("save", function (next) {
    if (!this.short_id) {
        this.short_id = this._id.toString();
    }
    if (!this.visit_count) {
        this.visit_count = 0;
    }
    next();
})
const URL = mongoose.model('url', urlSchema);

export default URL;