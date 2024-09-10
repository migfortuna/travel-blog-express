import { blogs, users } from "../data.js";

// NORMALLY, you would connect to a DB and pull the data from there. But for now we have static data.

const findUser = (authorId) => {
  return users.find((user) => user.id == authorId);
};

export const findBlog = (req, res, next) => {
  const blog = blogs.find((blog) => blog.slug == req.params.slug);
  if (!blog) {
    res.statusCode = 404;
    res.send({ data: "Resource not found!" });
  } else {
    req.currentBlog = {
      ...blog,
      author: users.find((user) => user.id == blog.author),
    };
    next();
  }
};

export const getAllBlogs = (req, res) => {
  const allBlogs = blogs.map((blog) => {
    return {
      ...blog,
      author: findUser(blog.author),
    };
  });
  res.send({ data: allBlogs });
};

export const getBlog = (req, res) => {
  res.send({
    data: {
      ...req.currentBlog,
    },
  });
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
