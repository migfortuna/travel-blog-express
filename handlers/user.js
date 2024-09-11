import { blogs, users } from "../data.js";

export const getUsers = (req, res) => {
  res.send({ data: users });
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

export const updateUser = (req, res) => {
  const user = users.find((user) => user.id == req.currentUser.id);
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  req.currentUser = { ...user };
  res.send({ data: { ...user } });
};

export const deleteUser = (req, res) => {
  const userIndex = users.findIndex((user) => user.id == req.currentUser.id);
  res.send({
    data: users.splice(userIndex, 1)[0],
  });
};
