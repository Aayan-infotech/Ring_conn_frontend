import React from 'react';
import { Link } from 'react-router-dom';
import './News.css';
import { FiArrowRight } from "react-icons/fi";


export default function News() {
  return (
    <div className="container my-4">
      <h1 className="text-center mb-4 news-heading">Latest News Updates</h1>
      <div className="row">
        {[1, 2, 3].map((item) => (
          <div className="col-md-4 mb-4" key={item}>
            <div className="card news-card h-100 shadow-sm">
              <img
                src={`https://source.unsplash.com/600x400/?news,world&sig=${item}`}
                className="card-img-top bg-light"
                alt="News"
              />
              <div className="card-body">
                <p className="news-card-date">April {10 + item}, 2025</p>
                <h5 className="card-title news-card-title">News Headline {item}</h5>
                <p className="card-text news-card-text">
                  A short summary of news article {item}. Stay informed with the latest headlines.
                </p>
                <Link to={`/news/${item}`} className="btn btn-dark align-items-center gap-2">
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
