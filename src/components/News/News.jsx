import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './News.css';
import { FiArrowRight } from "react-icons/fi";

export default function News() {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const res = await fetch("http://18.209.91.97:1111/api/news/getAllNews");
      const data = await res.json();
      if (data.success) {
        setNewsList(data.news);
      } else {
        console.error("Failed to fetch news");
      }
    } catch (err) {
      console.error("Error fetching news:", err);
    } finally {
      setLoading(false);
    }
  };

  // Helper to remove HTML tags
  const stripHtmlTags = (html) => {
    return html?.replace(/<[^>]+>/g, '');
  };

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4 news-heading">Latest News Updates</h1>

      {loading ? (
        <p className="text-center">Loading news...</p>
      ) : newsList.length === 0 ? (
        <p className="text-center">No news available right now.</p>
      ) : (
        <div className="row">
          {newsList.map((news) => (
            <div className="col-md-4 mb-4" key={news._id}>
              <div className="card news-card h-100 shadow-sm">
                <img
                  src={news.thumbnailImage}
                  className="card-img-top bg-light"
                  alt={news.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <p className="news-card-date">
                    {new Date(news.createdAt).toLocaleDateString()}
                  </p>
                  <h5 className="card-title news-card-title">{news.title}</h5>
                  <p className="card-text news-card-text">
                    {stripHtmlTags(news.description)?.substring(0, 80)}...
                  </p>
                  <Link to={`/news/${news._id}`} className="btn btn-dark d-flex align-items-center gap-2">
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
