import mongoose, {Schema} from "mongoose";

const blogSchema = Schema({
    title: {
        type: String,
        required: true, 
        trime: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },

},{timestamp: true})

export const Blog = mongoose.model("Blog", blogSchema);