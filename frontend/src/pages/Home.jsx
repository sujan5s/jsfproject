import React from "react";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <div>
      <Hero />
      <div className="container">
        <h2>Shop All Plants</h2>
        <p>Find beautiful indoor and outdoor plants from trusted nurseries.</p>
      </div>
    </div>
  );
}