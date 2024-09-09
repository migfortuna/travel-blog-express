import { blogs, users } from "./data.js";

// NORMALLY, you would connect to a DB and pull the data from there. But for now we have static data.

const findUser = (authorId) => {
  return users.find((user) => user.id == authorId);
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
  let status = 200;
  let data;
  const blog = blogs.find((blog) => blog.slug == req.params.slug);

  if (!blog) {
    status = 404;
    data = "Resource not found!";
  } else {
    data = {
      ...blog,
      author: findUser(blog.author),
    };
  }

  res.statusCode = status;
  res.send({ data: data });
};
