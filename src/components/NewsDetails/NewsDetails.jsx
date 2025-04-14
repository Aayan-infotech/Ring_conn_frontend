import React from 'react';
import { Link } from 'react-router-dom';
import './NewsDetails';

export default function NewsDetails() {
  const newsItem = {
    title: 'Breaking News: React 19 Released!',
    date: 'April 13, 2025',
    image: 'https://source.unsplash.com/1200x500/?news,technology',
    content: `React 19 introduces exciting new features like improved server components,
              automatic memoization, and enhanced developer tooling. This major release focuses
              on performance and better developer experience. Stay tuned for deeper insights!`,
  };

  const recentNews = [
    {
      id: 1,
      title: 'News Headline 1',
      date: 'April 10, 2025',
      image: 'https://source.unsplash.com/100x100/?stocks,market',
    },
    {
      id: 2,
      title: 'News Headline 2',
      date: 'April 11, 2025',
      image: 'https://source.unsplash.com/100x100/?ai,technology',
    },
    {
      id: 3,
      title: 'News Headline 3',
      date: 'April 12, 2025',
      image: 'https://source.unsplash.com/100x100/?space,rocket',
    },
  ];

  return (
    <div className="container my-5 news-detail-page">
      <div className="row">
        <div className="col-lg-8">
          <img src={newsItem.image} className="img-fluid rounded mb-4 news-cover" alt="Cover" />
          <p className="news-date">{newsItem.date}</p>
          <h1 className="news-title">{newsItem.title}</h1>
          <p className="news-content">{newsItem.content}</p>
        </div>

        <div className="col-lg-4">
          <div className="card shadow-sm p-3 recent-news-card">
            <h4 className="mb-3">Recent News</h4>
            {recentNews.map((news) => (
              <Link to={`/news/${news.id}`} className="recent-news-item d-flex mb-3" key={news.id}>
                <img src={news.image} alt="thumb" className="recent-news-thumb me-3" />
                <div>
                  <p className="recent-news-date mb-1">{news.date}</p>
                  <h6 className="recent-news-title mb-0">{news.title}</h6>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
