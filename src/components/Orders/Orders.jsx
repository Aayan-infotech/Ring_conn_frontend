import React, { useEffect, useState } from 'react';
import './Orders.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://3.223.253.106:1111/api/Order/history/${userId}`);
        setOrders(response.data.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    if (userId) fetchOrders();
  }, [userId]);

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center fw-bold">My Orders</h2>
      <div className="row">
        {orders.map((order, index) => (
          <div key={index} className="col-md-6">
            <div className="card mb-4 shadow-sm order-card">
              <div className="card-header d-flex justify-content-between">
                <span>Order ID: <strong>{order._id}</strong></span>
                <span className={`order-status ${order.orderStatus.toLowerCase()}`}>
                  {order.orderStatus}
                </span>
              </div>
              <div className="card-body">
                <p className="mb-1">Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                <p className="mb-1">Payment Source: <strong>{order.payment_source}</strong></p>
                <p className="mb-1">Transaction ID: <strong>{order.transactions[0]?.transactionID || 'N/A'}</strong></p>
                <p className="mb-3">Total: <strong>${order.orderPrice.toFixed(2)}</strong></p>

                <div className="mb-2">
                  <strong>Shipping Address:</strong>
                  <p className="mb-1">
                    {order.addresses?.find(addr => addr.type === 'delivery')?.address || 'N/A'}
                  </p>
                </div>

                <div className="d-flex flex-wrap gap-3">
                  {order.products.map((item, i) => (
                    <div key={i} className="product-preview text-center">
                      <img
                        src={item.color[0]}
                        alt={item.title}
                        className="img-thumbnail rounded"
                        style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                      />
                      <small>{item.title} x{item.quantity}</small>
                      <div className="text-muted" style={{ fontSize: '0.8rem' }}>
                        Size: {item.size.join(', ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
        {orders.length === 0 && (
          <div className="text-center text-muted mt-5">
            No orders found.
          </div>
        )}
      </div>
    </div>
  );
}
