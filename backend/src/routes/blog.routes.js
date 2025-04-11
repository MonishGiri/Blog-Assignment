import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createBlog, deleteBlogById, getAllBlogs, getBlogById, updateBlogById } from "../controllers/blog.controller.js";

const router = Router();

router.route("/")
  .get(getAllBlogs)           // GET /api/blogs
  .post(verifyJWT, createBlog); // POST /api/blogs

router.route("/:id")
  .get(getBlogById)             // GET /api/blogs/:id
  .put(verifyJWT, updateBlogById) // PUT /api/blogs/:id
  .delete(verifyJWT, deleteBlogById); // DELETE /api/blogs/:id

export default router;