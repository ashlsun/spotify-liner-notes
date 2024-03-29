import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    body: {type:String, required: true},
    name: {type:String, required: true},
    notes: {type:[String], required: true},
    email: {type:String, required: false},

}, {
    timestamps: true,
})

export const PostModel = mongoose.models.post || mongoose.model("post", PostSchema);