import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import blogRoutes from "./routes/blog.js";
import userRoutes from "./routes/user.js";
import { logger, errorHandler, catchAll } from "./middleware.js";

const app = express();
const port = process.env.PORT;
const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);

// MIDDLEWARE
// these will apply to all routes written below this
// for route-specific, add it to the route --> app.method(path, middleware, handler);
app.use(express.json());
app.use(logger);
app.use(express.static(path.join(__dirName, "public")));

// API Routes
app.use("/api/blogs", blogRoutes);
app.use("/api/users", userRoutes);

// CATCH ALL
// for endpoints that do not exist
app.use(catchAll);

// Custom Error Handler
// express has a built-in error handler, but it returns html and 500 response only
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
