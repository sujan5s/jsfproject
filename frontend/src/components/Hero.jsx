import React from "react";
import hero from "../assets/hero.jpg";
import { Link, useNavigate } from "react-router-dom";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1>Welcome to FloraConnect</h1>
        <p>Your one-stop destination for the healthiest, most beautiful plants from local nurseries.</p>
        <a href="/plants" className="btn">Shop All Plants →</a>
      </div>
    </section>
  );
}