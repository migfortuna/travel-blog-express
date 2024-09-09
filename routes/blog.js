import { Router } from "express";
import { getAllBlogs, getBlog } from "../handlers/blog.js";

const router = Router();

router.get("/", getAllBlogs);
router.get("/:slug", getBlog);

export default router;
