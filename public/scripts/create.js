const postBlog = async (title, description) => {
  try {
    const res = await fetch("http://localhost:8000/api/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        author: 2,
      }),
    });
    const newBlog = await res.json();
    if (newBlog.error) throw new Error(newBlog.error);
    return newBlog;
  } catch (err) {
    return { error: err.message };
  }
};

document.getElementById("btnSubmit").onclick = async () => {
  const title = document.getElementById("blogTitle").value;
  const description = document.getElementById("blogDescription").value;

  const newBlog = await postBlog(title, description);
  const responseColor = newBlog.error ? "red" : "green";
  const blogResponse = newBlog.error ?? "Success!";
  document
    .getElementById("requestResponse")
    .setAttribute("style", `color: ${responseColor};`);
  document.getElementById("requestResponse").textContent = blogResponse;
};
