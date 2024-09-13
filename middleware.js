import { blogs, users } from "./data.js";

export const logger = (req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
};

export const catchAll = (req, res, next) => {
  const error = new Error();
  error.status = 404;
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const errorMapper = {
    400: "Invalid Request",
    404: "Resource Not Found",
    500: err.message ?? "Internal Server Error",
  };
  res.status(status).send({ error: errorMapper[status] });
};

// CUSTOM ERROR HANDLING FOR ASYNCHRONOUS FUNCTIONS
// the new Error has to be passed into next()
// so it can go to the custom error handler
export const findBlog = async (req, res, next) => {
  const blog = await blogs.find((blog) => blog.slug == req.params.slug);
  if (!blog) {
    const error = new Error();
    error.status = 404;
    return next(error); // make sure TO RETURN so the next lines don't get executed
  }
  req.currentBlog = {
    ...blog,
    author: users.find((user) => user.id == blog.author),
  };
  next();
};

// CUSTOM ERROR HANDLING FOR SYNCHRONOUS FUNCTIONS
// new Error can just be thrown and Express will catch it
export const findUser = (req, res, next) => {
  const userId =
    req.method == "POST" ? req.body.author : parseInt(req.params.userId);
  const user = users.find((user) => user.id == userId);
  if (!user) {
    const error = new Error();
    error.status = 404;
    throw error; // throw works the same as return
  }
  req.currentUser = { ...user };
  next();
};

export const validateBlogRequest = (req, res, next) => {
  if (
    !req.body.title ||
    !req.body.description ||
    !req.body.author ||
    isNaN(req.body.author)
  ) {
    const error = new Error();
    error.status = 400;
    throw error;
  }
  next();
};

export const validateUserRequest = (req, res, next) => {
  if (!req.body.firstName || !req.body.lastName) {
    const error = new Error();
    error.status = 400;
    throw error;
  }
  next();
};
