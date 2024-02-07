import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
    {
        user_id: {
            type: String
        },
        short_id: {
            type: String,
            required: true,
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

const URL = mongoose.model('url', urlSchema);

export default URL;