import React from "react";

export default function CartPage() {
  return (
    <div className="container">
      <h2>Your Cart</h2>
      <div className="card">
        <p>No items yet.</p>
        <a href="/plants" className="btn">Start Shopping</a>
      </div>
    </div>
  );
}