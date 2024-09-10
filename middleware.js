import { users } from "./data.js";

export const logger = (req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
};

export const findUser = (req, res, next) => {
  const userId =
    req.method == "POST" ? req.body.author : parseInt(req.params.userId);
  const user = users.find((user) => user.id == userId);
  if (!user) {
    res.statusCode = 404;
    res.send({ data: "Resource not found!" });
  } else {
    req.currentUser = { ...user };
    next();
  }
};

export const validateBlogRequest = (req, res, next) => {
  if (
    !req.body.title ||
    !req.body.description ||
    !req.body.author ||
    isNaN(req.body.author)
  ) {
    res.statusCode = 400;
    res.send({ data: "Invalid request!" });
  } else {
    next();
  }
};

export const validateUserRequest = (req, res, next) => {
  if (!req.body.firstName || !req.body.lastName) {
    res.status(400);
    res.send({ data: "Invalid request!" });
  } else {
    next();
  }
};
