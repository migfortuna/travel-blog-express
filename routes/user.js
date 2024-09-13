import { Router } from "express";
import { findUser, validateUserRequest } from "../middleware.js";
import {
  getUsers,
  getUser,
  getBlogsByUser,
  addUser,
  updateUser,
  deleteUser,
} from "../handlers/user.js";

const router = Router();

// Router-level param callback trigger
// this will run for every route that has a "userId" param in it
// awesome!!! using res.send() here will stop the whole process, will not reach the route handlers
router.param("userId", findUser);

router.get("/", getUsers);
router.get("/:userId", getUser);
router.get("/:userId/blogs", getBlogsByUser);
router.post("/", validateUserRequest, addUser);
router.put("/:userId", validateUserRequest, updateUser);
router.delete("/:userId", deleteUser);

export default router;
