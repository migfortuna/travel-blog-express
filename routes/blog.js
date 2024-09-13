import { Router } from "express";
import { findBlog, validateBlogRequest, findUser } from "../middleware.js";
import {
  getAllBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../handlers/blog.js";

const router = Router();
router.param("slug", findBlog);

router.get("/", getAllBlogs);
router.get("/:slug", getBlog);
router.post("/", [validateBlogRequest, findUser], createBlog);
router.put("/:slug", validateBlogRequest, updateBlog);
router.delete("/:slug", deleteBlog);

export default router;
