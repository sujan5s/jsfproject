import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

export default function Plants() {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    // You can replace with real API later
    setPlants([
      { id: 1, name: "Fiddle Leaf Fig", category: "Indoor", price: 499, imageUrl: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6" },
      { id: 2, name: "Snake Plant", category: "Indoor", price: 299, imageUrl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314" },
      { id: 3, name: "Rose", category: "Outdoor", price: 199, imageUrl: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6" },
    ]);
  }, []);

  return (
    <div className="container">
      <h2>All Plants</h2>
      <div className="grid">
        {plants.map((p) => (
          <ProductCard key={p.id} plant={p} />
        ))}
      </div>
    </div>
  );
}