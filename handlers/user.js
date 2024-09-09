import { blogs, users } from "./data.js";

export const findUser = (req, res, next) => {
  const user = users.find((user) => user.id == req.params.userId);
  if (!user) {
    res.statusCode = 404;
    res.send({ data: "Resource not found!" });
  } else {
    req.currentUser = { ...user };
    next();
  }
};

export const getUser = (req, res) => {
  res.send({ data: { ...req.currentUser } });
};

export const getBlogsByUser = (req, res) => {
  res.send({
    data: {
      ...req.currentUser,
      blogs: blogs.filter((blog) => blog.author == req.currentUser.id),
    },
  });
};
