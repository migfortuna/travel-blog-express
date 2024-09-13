const blogsContainer = document.getElementById("myTravels");

const blogsList = document.createElement("ol");
blogsList.setAttribute("id", "myTravelsList");

blogsContainer.append(blogsList);

const showBlogs = async () => {
  try {
    const res = await fetch("http://localhost:8000/api/blogs");
    const blogs = await res.json();

    blogs.data.forEach((blog) => {
      const blogEl = document.createElement("li");

      const blogLink = document.createElement("a"); // <a></a>
      blogLink.setAttribute("id", blog.slug); // <a id="slug"></a>
      blogLink.setAttribute("class", "blog-text"); // <a id="slug" class="blog-text"></a>
      blogLink.onclick = () => {
        console.clear();
        console.log(blog.title);
        console.log(blog.description);
      };
      blogLink.textContent = blog.title; // <a id="slug" class="blog-text" onclick="">Title</a>

      blogEl.append(blogLink);
      blogsList.append(blogEl);
    });
  } catch (err) {
    console.log("Fetch Blogs Error", err);
  }
};

showBlogs();
