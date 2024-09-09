import { Router } from "express";
import { validateBlogPut, validateBlogPost, findUser } from "../middleware.js";
import {
  findBlog,
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
router.post("/", [validateBlogPost, findUser], createBlog);
router.put("/:slug", validateBlogPut, updateBlog);
router.delete("/:slug", deleteBlog);

export default router;
