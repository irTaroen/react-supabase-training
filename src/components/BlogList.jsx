const BlogList = ({ blogs, title }) => {
  return (
    <div className="blog-list">
      <h2>{title}</h2>
      {blogs.map((blog) => (
        <div className="blog-preview" key={blog.id}>
          <h3>{blog.Name}</h3>
          <p>Level {blog.Level}</p>
          <p>Written by {blog.Author}</p>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
