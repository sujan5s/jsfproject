import React from "react";

export default function ProductCard({ plant }) {
  return (
    <div className="product-card">
      <img src={plant.imageUrl} alt={plant.name} />
      <h3>{plant.name}</h3>
      <p>{plant.category}</p>
      <p><strong>₹{plant.price}</strong></p>
      <a href={`/product/${plant.id}`} className="btn">View Details</a>
    </div>
  );
}