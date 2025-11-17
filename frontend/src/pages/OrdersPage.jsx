import React, { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadSampleOrders();
  }, []);

  const loadSampleOrders = () => {
    // 🌸 SAMPLE FLOWER / PLANT ORDER DATA
    const sampleData = [
      {
        id: 101,
        userId: 6,
        orderDate: "2025-02-10T12:00:00",
        totalPrice: 499,
        status: "Delivered",
        items: [
          {
            plantId: 1,
            name: "Rose Plant",
            quantity: 1,
            price: 499
          }
        ]
      },
      {
        id: 102,
        userId: 6,
        orderDate: "2025-02-12T09:30:00",
        totalPrice: 899,
        status: "Delivered",
        items: [
          {
            plantId: 2,
            name: "Orchid Flower Plant",
            quantity: 1,
            price: 899
          }
        ]
      }
    ];

    setOrders(sampleData);
  };

  return (
    <div className="orders-container">
      <h2 className="orders-title">📦 Your Orders</h2>

      {orders.length === 0 ? (
        <p className="no-orders">You have no orders yet.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div className="order-card" key={order.id}>
              <h3>Order #{order.id}</h3>

              <p className="order-date">
                📅 Placed on:{" "}
                {new Date(order.orderDate).toLocaleDateString()}
              </p>

              <p className="order-total">💰 Total Amount: ₹{order.totalPrice}</p>

              <p className="status delivered">✔ {order.status}</p>

              <h4>Items:</h4>
              <ul>
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    🌿 {item.name} — {item.quantity} × ₹{item.price}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}