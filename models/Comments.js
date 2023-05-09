import mongoose from "mongoose";

const CommentsSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    
  

}, {
    timestamps: true,
 }
);

export default mongoose.model('Comments', CommentsSchema);