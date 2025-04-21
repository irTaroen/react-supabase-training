import { useEffect, useState } from "react";
import { getData } from "../utils/api";
import BlogList from "./BlogList";

const HomeBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data, error } = await getData("Blogs");
      if (error) {
        console.error("Error fetching blogs:", error);
        setError(error);
      } else {
        setBlogs(data);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="home-blog">
      {error && <p style={{ color: "red" }}>Error loading blogs.</p>}
      <BlogList blogs={blogs} />
    </div>
  );
};

export default HomeBlog;
