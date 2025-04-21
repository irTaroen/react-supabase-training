import { useEffect, useState } from "react";
import { getData, deleteData } from "../utils/api";
import BlogList from "./BlogList";

const HomeBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);

  // Get all the blogs
  const fetchBlogs = async () => {
    const { data, error } = await getData("Blogs");
    if (error) {
      console.error("Error fetching blogs:", error);
      setError(error);
    } else {
      setBlogs(data);
    }
  };

  // Run fetchBlogs on startup
  useEffect(() => {
    fetchBlogs();
  }, []);

  //Handle deletion
  const handleDelete = async (tableName, id) => {
    const { error } = await deleteData(tableName, id);
    if (error) {
      console.error("Error deleting blog:", error);
    } else {
      fetchBlogs();
    }
  };

  return (
    <div className="home-blog">
      {error && <p style={{ color: "red" }}>Error loading blogs.</p>}
      <BlogList
        blogs={blogs}
        title={"All Blogs"}
        tableName="Blogs"
        onDelete={handleDelete} // pass handleDelete instead of deleteData directly!
      />
    </div>
  );
};

export default HomeBlog;
