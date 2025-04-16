import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {Blog} from "../models/blog.model.js"

const createBlog = asyncHandler(async (req, res) => {
    const { title, content } = req.body;
    console.log("User from JWT:", req.user);
    const author = req.user._id;
    if(!title || !content) {
        throw new ApiError(400, "Title and content are required")
    }
    const blog = await Blog.create({ title, content, author });
    const savedBlog = await blog.populate("author", "-password -__v");
    if(!savedBlog) {
        throw  ApiError(500, "Blog not created Something went wrong")
    }
    return res
    .status(201)
    .json(new ApiResponse(201, savedBlog, "Blog created successfully"))
})

const getAllBlogs = asyncHandler(async (req, res) => {
    const blogs = await Blog.find().populate("author", "-password -__v").sort({createdAt: -1});
    if(!blogs) {
        throw new ApiError(404, "No blogs found")
    }
    return res
    .status(200)
    .json(new ApiResponse(200, blogs, "Blogs fetched successfully"))
})

const getBlogById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if(!id) {
        throw new ApiError(400, "Blog id is required")
    }
    const blog = await Blog.findById(id).populate("author", "-password -__v");
    if(!blog) {
        throw new ApiError(404, "Blog not found")
    }
    return res
    .status(200)
    .json(new ApiResponse(200, blog, "Blog fetched successfully"))
})

const updateBlogById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    if(!id) {
        throw new ApiError(400, "Blog id is required")
    }
    const blog = await Blog.findByIdAndUpdate(id, { title, content }, { new: true }).populate("author", "-password -__v");
    if(!blog) {
        throw new ApiError(404, "Blog not found")
    }
    return res
    .status(200)
    .json(new ApiResponse(200, blog, "Blog updated successfully"))
})

const deleteBlogById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = req.user._id;
    if(!id) {
        throw new ApiError(400, "Blog id is required")
    }
    const blog = await Blog.findByIdAndDelete(id);
    if(!blog && blog.author.toString() !== user.toString()) {
        throw new ApiError(404, "Blog not found")
    }
    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Blog deleted successfully"))
})

export{
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlogById,
    deleteBlogById
}