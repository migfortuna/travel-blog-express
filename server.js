import express from "express";
import blogRoutes from "./routes/blog.js";
import userRoutes from "./routes/user.js";
import { logger } from "./middleware.js";

const app = express();
const port = process.env.PORT;

// MIDDLEWARE
app.use(express.json());

// this will apply to all routes written below this
// for route-specific, add it to the route --> app.method(path, middleware, handler);
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.use("/api/blogs", blogRoutes);
app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
