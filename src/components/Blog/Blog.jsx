import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import "./Blog.css";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch("http://3.223.253.106:1111/api/blog/getAllBlogs");
      const data = await res.json();

      if (data.success) {
        setBlogs(data.blogs);
      } else {
        console.error("Failed to fetch blogs");
      }
    } catch (err) {
      console.error("Error fetching blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to remove HTML tags from string
  const stripHtmlTags = (html) => {
    return html?.replace(/<[^>]+>/g, '');
  };

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4 blog-heading">Our Latest Blogs</h1>

      {loading ? (
        <p className="text-center">Loading blogs...</p>
      ) : blogs.length === 0 ? (
        <p className="text-center">No blogs available at the moment.</p>
      ) : (
        <div className="row">
          {blogs.map((blog) => (
            <div className="col-md-4 mb-4" key={blog._id}>
              <div className="card blog-card h-100 shadow-sm">
                <img
                  src={blog.thumbnailImage}
                  className="card-img-top bg-light"
                  alt={blog.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <p className="blog-date blog-card-date">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                  <h5 className="card-title blog-card-title">{blog.title}</h5>
                  <p className="card-text blog-card-text">
                    {stripHtmlTags(blog.description)?.substring(0, 80)}...
                  </p>
                  <Link
                    to={`/blog/${blog._id}`}
                    className="btn btn-dark d-flex align-items-center justify-content-center gap-2"
                  >
                    Read More <FiArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
