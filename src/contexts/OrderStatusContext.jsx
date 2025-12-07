import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

import { orderAPI } from "../services/orderStatus.js";

const OrderStatusContext = createContext();

export const useOrderStatus = () => {
  const context = useContext(OrderStatusContext);
  if (!context) {
    throw new Error("useOrderStatus must be used within OrderStatusProvider");
  }
  return context;
};

export const OrderStatusProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [isStatusSelected, setIsStatusSelected] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders from backend JSON file
  const fetchOrders = useCallback(async () => {
    try {
      console.log("🌐 Context: Fetching orders from backend...");
      setLoading(true);
      const data = await orderAPI.getOrders();
      console.log("✅ Context: Loaded orders:", data.length);

      setOrders(data);
      // Reset selection state based on current orders
      setIsStatusSelected(new Array(data.length).fill(false));
    } catch (error) {
      console.error("❌ Context: Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Update order status → Backend JSON file
  const updateStatus = useCallback(
    async (index, newStatus) => {
      try {
        console.log(
          "🚀 Context: Updating order status...",
          orders[index]?.id,
          newStatus
        );

        const updatedOrder = await orderAPI.updateOrderStatus(
          orders[index].id,
          newStatus
        );

        // Update local state
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === updatedOrder.id ? updatedOrder : order
          )
        );

        // Mark as selected (permanent status text)
        setIsStatusSelected((prev) => {
          const newSelected = [...prev];
          newSelected[index] = true;
          return newSelected;
        });

        console.log("✅ Context: Status updated successfully");
      } catch (error) {
        console.error("❌ Context: Failed to update status:", error);
        // Optional refetch on error
        fetchOrders();
      }
    },
    [orders, fetchOrders]
  );

  // Initial load
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const value = {
    orders,
    isStatusSelected,
    loading,
    updateStatus,
    refetchOrders: fetchOrders,
  };

  return (
    <OrderStatusContext.Provider value={value}>
      {children}
    </OrderStatusContext.Provider>
  );
};
