import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

import "./Blog.css";

export default function Blog() {
  const blogData = [
    {
      id: 1,
      title: "Blog 1",
      date: "April 10, 2025",
      image:
        "https://img.freepik.com/free-photo/programming-background-with-person-working-with-codes-computer_23-2150010125.jpg",
    },
    {
      id: 2,
      title: "Blog 2",
      date: "April 11, 2025",
      image:
        "https://img.freepik.com/free-photo/laptop-half-closed-dark-with-colourful-glow-glasses-paper-cup_169016-33951.jpg?uid=R187744377&ga=GA1.1.2076956031.1739515128&semt=ais_hybrid&w=740",
    },
    {
      id: 3,
      title: "Blog 3",
      date: "April 12, 2025",
      image:
        "https://img.freepik.com/free-photo/bible-laptop-online-bible-study-concept-religion-concept_169016-66743.jpg?uid=R187744377&ga=GA1.1.2076956031.1739515128&semt=ais_hybrid&w=740",
    },
  ];

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4 blog-heading">Our Latest Blogs</h1>
      <div className="row">
        {blogData.map((blog) => (
          <div className="col-md-4 mb-4" key={blog.id}>
            <div className="card blog-card h-100 shadow-sm">
              <img
                src={blog.image}
                className="card-img-top bg-light"
                alt={`Blog ${blog.id}`}
              />
              <div className="card-body">
                <p className="blog-date blog-card-date">{blog.date}</p>
                <h5 className="card-title blog-card-title">{blog.title}</h5>
                <p className="card-text blog-card-text">
                  A brief description about blog {blog.id}. Stay updated with
                  the latest trends.
                </p>
                <Link
                  to={`/blog/${blog.id}`}
                  className="btn btn-dark d-flex align-items-center justify-content-center gap-2"
                >
                  Read More <FiArrowRight />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
