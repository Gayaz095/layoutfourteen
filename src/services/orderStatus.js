const API_BASE_URL = "http://localhost:3001/api";

export const orderAPI = {
  getOrders: async () => {
    console.log("🌐 Fetching orders from:", `${API_BASE_URL}/orders`);
    const response = await fetch(`${API_BASE_URL}/orders`);
    console.log("📡 GET response status:", response.status);
    if (!response.ok) throw new Error("Failed to fetch orders");
    return response.json();
  },

  updateOrderStatus: async (id, status) => {
    console.log("🚀 Updating order", id, "to status:", status);
    const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    console.log("📡 PUT response status:", response.status);
    if (!response.ok) {
      const error = await response.text();
      console.error("❌ PUT error:", error);
      throw new Error("Failed to update status");
    }
    return response.json();
  },
};
