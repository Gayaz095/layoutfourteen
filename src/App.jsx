import React from "react";
import Counter from "./components/counter/Counter";
import OrderStatus from "./components/orderstatus/OrderStatus";

import {
  OrderStatusProvider,
  useOrderStatus,
} from "./contexts/OrderStatusContext";

function AppContent() {
  const { loading } = useOrderStatus();
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f0f2f5" }}>
      {/* <Counter /> */}
      {!loading && <OrderStatus />}
    </div>
  );
}

function App() {
  return (
    <>
      <div>
        {/* <Counter/> */}
        {/* Order Status Section */}
        <OrderStatusProvider>
          <AppContent />
        </OrderStatusProvider>
      </div>
    </>
  );
}

export default App;
