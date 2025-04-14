import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './BlogDetail.css';

export default function BlogDetail() {
  const { id } = useParams();

  const blog = {
    title: `Blog Title ${id}`,
    date: 'April 13, 2025',
    image: `https://source.unsplash.com/1200x500/?tech,code&sig=${id}`,
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Pellentesque vehicula fermentum turpis, sed cursus nulla 
              suscipit id. Morbi luctus purus nec tortor fermentum, in 
              tempus tortor malesuada. Praesent feugiat, nisl eget sodales 
              sollicitudin, nunc justo congue metus, in tincidunt velit 
              dolor at augue.`,
  };

  const recentBlogs = [
    {
      id: 1,
      title: 'How to start with React',
      date: 'April 10, 2025',
      image: 'https://source.unsplash.com/100x100/?react',
    },
    {
      id: 2,
      title: '10 Tips for Clean Code',
      date: 'April 11, 2025',
      image: 'https://source.unsplash.com/100x100/?code',
    },
    {
      id: 3,
      title: 'Why You Should Learn TypeScript',
      date: 'April 12, 2025',
      image: 'https://source.unsplash.com/100x100/?typescript',
    },
  ];

  return (
    <div className="container my-5 blog-detail-page">
      <div className="row">
        <div className="col-lg-8">
          <img src={blog.image} className="img-fluid rounded mb-4 blog-cover" alt="Cover" />
          <p className="blog-date">{blog.date}</p>
          <h1 className="blog-title">{blog.title}</h1>
          <p className="blog-content">{blog.content}</p>
        </div>

        <div className="col-lg-4">
          <div className="card shadow-sm p-3 recent-blogs-card">
            <h4 className="mb-3">Recent Blogs</h4>
            {recentBlogs.map((blog) => (
              <Link to={`/blog/${blog.id}`} className="recent-blog-item d-flex mb-3" key={blog.id}>
                <img src={blog.image} alt="thumb" className="recent-blog-thumb me-3" />
                <div>
                  <p className="recent-blog-date mb-1">{blog.date}</p>
                  <h6 className="recent-blog-title mb-0">{blog.title}</h6>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
