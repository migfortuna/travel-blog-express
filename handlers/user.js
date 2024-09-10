import { blogs, users } from "../data.js";

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

export const addUser = (req, res) => {
  const newUser = {
    id: users.length + 1,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  };
  users.push(newUser);
  res.status(201);
  res.send({ data: newUser });
};
