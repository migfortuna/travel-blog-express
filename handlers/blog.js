import { blogs, users } from "../data.js";

// NORMALLY, you would connect to a DB and pull the data from there. But for now we have static data.

const findUser = (authorId) => {
  return users.find((user) => user.id == authorId);
};

// CUSTOM ERROR HANDLING FOR ASYNCHRONOUS FUNCTIONS
// the new Error has to be passed into next()
// so it can go to the custom error handler
export const getAllBlogs = async (req, res, next) => {
  try {
    const allBlogs = await blogs.map((blog) => {
      return {
        ...blog,
        author: findUser(blog.author),
      };
    });
    res.send({ data: allBlogs });
  } catch (err) {
    return next(new Error(err));
  }
};

// CUSTOM ERROR HANDLING FOR SYNCHRONOUS FUNCTIONS
// new Error can just be thrown and Express will catch it
export const getBlog = (req, res) => {
  try {
    res.send({ data: { ...req.currentBlog } });
  } catch (err) {
    throw new Error(err);
  }
};

export const createBlog = (req, res) => {
  const newBlog = {
    id: blogs.length + 1,
    slug: req.body.title.toLowerCase().split(" ").join("-"),
    ...req.body,
  };
  blogs.push(newBlog);
  res.status(201);
  res.send({ data: { ...newBlog, author: findUser(newBlog.author) } });
};

export const updateBlog = (req, res) => {
  res.send({
    data: {
      ...req.currentBlog,
      title: req.body.title,
      description: req.body.description,
    },
  });
};

export const deleteBlog = (req, res) => {
  const blogIndex = blogs.findIndex(
    (blog) => blog.slug == req.currentBlog.slug
  );
  res.send({
    data: blogs.splice(blogIndex, 1)[0],
  });
};
