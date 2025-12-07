import React from "react";

import "./OrderStatus.css";

import { useOrderStatus } from "../../contexts/OrderStatusContext";

function OrderStatus() {
  const { orders, loading, updateStatus } = useOrderStatus();

  const getStatusClass = (status) => {
    return status === "Completed" ? "status-completed" : "status-pending";
  };

  if (loading) {
    return (
      <div className="order-container">
        <div className="order-container-loading">
          Loading orders from backend...
        </div>
      </div>
    );
  }

  return (
    <div className="order-container">
      <h2 className="order-title">Order Status (Live Backend Data)</h2>
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order, index) => (
          <div key={order.id} className="order-card">
            <div className="order-info">
              <h3>Order #{order.id}</h3>
              <p>
                <strong>Customer:</strong> {order.customer}
              </p>
              <p>
                <strong>Total:</strong> ${order.total.toFixed(2)}
              </p>
            </div>
            <div className="status-section">
              {order.status === "Pending" ? (
                // PENDING, Show dropdown with Completed option
                <select
                  className="status-dropdown"
                  value="Pending"
                  onChange={(e) => {
                    console.log(
                      "🔄 Changing order",
                      order.id,
                      "from Pending to",
                      e.target.value
                    );
                    updateStatus(index, e.target.value);
                  }}
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>
              ) : order.status === "Completed" ? (
                // COMPLETED
                <div className={`status-badge ${getStatusClass("Completed")}`}>
                  Completed
                </div>
              ) : (
                // INVALID/NULL, Show full dropdown
                <select
                  className="status-dropdown"
                  defaultValue=""
                  onChange={(e) => {
                    console.log(
                      "🔄 Setting order",
                      order.id,
                      "to",
                      e.target.value
                    );
                    updateStatus(index, e.target.value);
                  }}
                >
                  <option value="">Select Status</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                </select>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default OrderStatus;
