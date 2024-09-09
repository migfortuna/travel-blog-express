import { blogs, users } from "./data.js";

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
