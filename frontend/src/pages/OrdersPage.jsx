import React from "react";

export default function OrdersPage() {
  return (
    <div className="container">
      <h2>Your Orders</h2>
      <div className="card">
        <h3>Order #1001</h3>
        <p>Status: Delivered</p>
      </div>
      <div className="card">
        <h3>Order #1002</h3>
        <p>Status: Processing</p>
      </div>
    </div>
  );
}