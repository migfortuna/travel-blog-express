import { Router } from "express";
import { findUser, validateNewUser } from "../middleware.js";
import { getUser, getBlogsByUser, addUser } from "../handlers/user.js";

const router = Router();

// Router-level param callback trigger
// this will run for every route that has a "userId" param in it
// awesome!!! using res.send() here will stop the whole process, will not reach the route handlers
router.param("userId", findUser);

router.get("/:userId", getUser);
router.get("/:userId/blogs", getBlogsByUser);
router.post("/", validateNewUser, addUser);

export default router;
