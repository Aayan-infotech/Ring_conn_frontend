import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './BlogDetail.css';

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentBlogs, setRecentBlogs] = useState([]);

  useEffect(() => {
    fetchBlog();
    fetchRecentBlogs();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const res = await fetch(`http://3.223.253.106:1111/api/blog/getBlog/${id}`);
      const data = await res.json();
      if (data.success) {
        setBlog(data.blog);
      } else {
        console.error("Blog not found");
      }
    } catch (err) {
      console.error("Error fetching blog:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentBlogs = async () => {
    try {
      const res = await fetch(`http://3.223.253.106:1111/api/blog/getAllBlogs`);
      const data = await res.json();
      if (data.success) {
        const recent = data.blogs.filter((b) => b._id !== id).slice(0, 3);
        setRecentBlogs(recent);
      }
    } catch (err) {
      console.error("Error fetching recent blogs:", err);
    }
  };

  if (loading) return <div className="container my-5 text-center">Loading blog...</div>;

  if (!blog) return <div className="container my-5 text-center">Blog not found.</div>;

  return (
    <div className="container my-5 blog-detail-page">
      <div className="row">
        <div className="col-lg-8">
          <img src={blog.thumbnailImage} className="img-fluid rounded mb-4 blog-cover" alt="Cover" />
          <p className="blog-date">{new Date(blog.createdAt).toLocaleDateString()}</p>
          <h1 className="blog-title">{blog.title}</h1>
          <p className="blog-content">{blog.description}</p>
          {blog.contentImages?.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`blog-content-${index}`}
              className="img-fluid rounded my-3"
              style={{ width: "100%", objectFit: "cover" }}
            />
          ))}
        </div>

        <div className="col-lg-4">
          <div className="card shadow-sm p-3 recent-blogs-card">
            <h4 className="mb-3">Recent Blogs</h4>
            {recentBlogs.map((recent) => (
              <Link
                to={`/blog/${recent._id}`}
                className="recent-blog-item d-flex mb-3"
                key={recent._id}
              >
                <img
                  src={recent.thumbnailImage}
                  alt="thumb"
                  className="recent-blog-thumb me-3"
                  style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "6px" }}
                />
                <div>
                  <p className="recent-blog-date mb-1">
                    {new Date(recent.createdAt).toLocaleDateString()}
                  </p>
                  <h6 className="recent-blog-title mb-0">{recent.title}</h6>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

