import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [plantsCount, setPlantsCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [latestOrders, setLatestOrders] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    loadCounts();
    loadLatestOrders();
  }, []);

  const loadCounts = async () => {
    try {
      const plantsRes = await fetch("http://localhost:8080/api/plants");
      const plantsData = await plantsRes.json();
      setPlantsCount(plantsData.length);

      const ordersRes = await fetch("http://localhost:8080/api/orders/admin/all");
      const ordersData = await ordersRes.json();
      setOrdersCount(ordersData.length);

      const usersRes = await fetch("http://localhost:8080/api/auth/all");
      const usersData = await usersRes.json();
      setUsersCount(usersData.length);

    } catch (error) {
      console.error("Error loading dashboard data:", error);
    }
  };

  const loadLatestOrders = async () => {
    const res = await fetch("http://localhost:8080/api/orders/admin/all");
    const data = await res.json();
    setLatestOrders(data.slice(-5).reverse());
  };

  return (
    <div className="admin-dashboard">
      <h2 className="dashboard-title">📊 Admin Dashboard</h2>

      {/* Top Cards Section */}
      <div className="dashboard-cards">
        <div className="dash-card plants">
          <h3>{plantsCount}</h3>
          <p>Total Plants</p>
        </div>

        <div className="dash-card orders">
          <h3>{ordersCount}</h3>
          <p>Total Orders</p>
        </div>

        <div className="dash-card users">
          <h3>{usersCount}</h3>
          <p>Total Users</p>
        </div>
      </div>

      {/* Latest Orders */}
      <div className="latest-orders">
        <h3>🧾 Latest Orders</h3>

        {latestOrders.length === 0 ? (
          <p>No recent orders.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>User ID</th>
                <th>Total Price</th>
                <th>Items</th>
              </tr>
            </thead>

            <tbody>
              {latestOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.userId}</td>
                  <td>₹{order.totalPrice}</td>
                  <td>{order.items.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Manage Buttons */}
      <div className="dashboard-actions">
        <button className="dash-btn" onClick={() => navigate("/admin/products")}>
          🌱 Manage Products
        </button>
        <button className="dash-btn" onClick={() => navigate("/admin/orders")}>
          📦 View All Orders
        </button>
      </div>
    </div>
  );
}