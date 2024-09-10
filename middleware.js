import { users } from "./data.js";

export const logger = (req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
};

export const findUser = (req, res, next) => {
  const userId = !req.body ? req.params.userId : req.body.author;
  const user = users.find((user) => user.id == userId);
  if (!user) {
    res.statusCode = 404;
    res.send({ data: "Resource not found!" });
  } else {
    req.currentUser = { ...user };
    next();
  }
};

export const validateBlogPut = (req, res, next) => {
  if (!req.body.title || !req.body.description) {
    res.statusCode = 400;
    res.send({ data: "Invalid request!" });
  } else {
    next();
  }
};

export const validateBlogPost = (req, res, next) => {
  if (!req.body.title || !req.body.description) {
    res.statusCode = 400;
    res.send({ data: "Invalid request!" });
  } else if (!req.body.author || isNaN(req.body.author)) {
    res.statusCode = 400;
    res.send({ data: "Invalid request!" });
  } else {
    next();
  }
};

export const validateNewUser = (req, res, next) => {
  if (!req.body.firstName || !req.body.lastName) {
    res.status(400);
    res.send({ data: "Invalid request!" });
  } else {
    next();
  }
};
