import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    const res = await fetch(`http://localhost:8080/api/cart/${userId}`);
    const data = await res.json();

    setCart(data);
    calculateTotal(data);
  };

  const calculateTotal = (items) => {
    let sum = 0;
    items.forEach((item) => (sum += item.price * item.quantity));
    setTotal(sum);
  };

  const updateQuantity = async (itemId, change) => {
    const res = await fetch(
      `http://localhost:8080/api/cart/update/${itemId}?change=${change}`,
      { method: "PUT" }
    );

    if (res.ok) loadCart();
  };

  const removeItem = async (itemId) => {
    const res = await fetch(`http://localhost:8080/api/cart/remove/${itemId}`, {
      method: "DELETE",
    });

    if (res.ok) loadCart();
  };

  const handleOrderNow = () => {
    alert("Order placed successfully! (Backend connection coming soon)");
    navigate("/orders");
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">🛒 Your Cart</h2>

      <div className="cart-flex">
        
        {/* LEFT SIDE - ITEMS */}
        <div className="cart-items">
          {cart.length === 0 ? (
            <p className="empty-cart">Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div className="cart-card" key={item.id}>
                <img
                  src={`http://localhost:8080${item.imageUrl}`}
                  alt={item.plantName}
                />

                <div className="cart-info">
                  <h3>{item.plantName}</h3>
                  <p className="price">₹{item.price}</p>

                  <div className="qty-box">
                    <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                  </div>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        {/* RIGHT SIDE - TOTAL SECTION */}
        <div className="cart-summary">
          <h3>Order Summary</h3>
          <p className="summary-total">Total: ₹{total}</p>
          <button
            className="order-now-btn"
            onClick={handleOrderNow}
            disabled={cart.length === 0}
          >
            ⚡ Order Now
          </button>
        </div>
      </div>
    </div>
  );
}
