import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './NewsDetails.css';

export default function NewsDetails() {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentNews, setRecentNews] = useState([]);

  useEffect(() => {
    fetchNewsDetail();
    fetchRecentNews();
  }, [id]);

  const fetchNewsDetail = async () => {
    try {
      const res = await fetch(`http://3.223.253.106:1111/api/news/getNews/${id}`);
      const data = await res.json();
      if (data.success) {
        setNews(data.news);
      } else {
        console.error("News not found");
      }
    } catch (err) {
      console.error("Error fetching news:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentNews = async () => {
    try {
      const res = await fetch("http://3.223.253.106:1111/api/news/getAllNews");
      const data = await res.json();
      if (data.success) {
        const filtered = data.news.filter((item) => item._id !== id).slice(0, 3);
        setRecentNews(filtered);
      }
    } catch (err) {
      console.error("Error fetching recent news:", err);
    }
  };

  if (loading) return <div className="container my-5 text-center">Loading news...</div>;
  if (!news) return <div className="container my-5 text-center">News not found.</div>;

  return (
    <div className="container my-5 news-detail-page">
      <div className="row">
        <div className="col-lg-8">
          <img src={news.thumbnailImage} className="img-fluid rounded mb-4 news-cover" alt="Cover" />
          <p className="news-date">{new Date(news.createdAt).toLocaleDateString()}</p>
          <h1 className="news-title">{news.title}</h1>
          <div
            className="news-content"
            dangerouslySetInnerHTML={{ __html: news.description }}
          ></div>
          {news.contentImages?.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`content-${i}`}
              className="img-fluid rounded my-3"
              style={{ width: "100%", objectFit: "cover" }}
            />
          ))}
        </div>

        <div className="col-lg-4">
          <div className="card shadow-sm p-3 recent-news-card">
            <h4 className="mb-3">Recent News</h4>
            {recentNews.map((item) => (
              <Link to={`/news/${item._id}`} className="recent-news-item d-flex mb-3" key={item._id}>
                <img
                  src={item.thumbnailImage}
                  alt="thumb"
                  className="recent-news-thumb me-3"
                  style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "6px" }}
                />
                <div>
                  <p className="recent-news-date mb-1">{new Date(item.createdAt).toLocaleDateString()}</p>
                  <h6 className="recent-news-title mb-0">{item.title}</h6>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
