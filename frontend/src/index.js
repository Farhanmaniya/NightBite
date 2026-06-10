import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import { Toaster } from "react-hot-toast";
import SplashScreen from "./components/SplashScreen";

const root = ReactDOM.createRoot(document.getElementById("root"));

const Root = () => {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {/* App always mounted — no white flash */}
      <CartProvider>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#1E293B",
              color: "#F1F5F9",
              border: "1px solid #334155",
              fontFamily: "'Poppins', sans-serif",
              fontSize: "14px",
            },
            success: {
              iconTheme: {
                primary: "#FF6B35",
                secondary: "#F1F5F9",
              },
            },
          }}
        />
        <App />
      </CartProvider>

      {/* Splash sits on top and fades out */}
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
    </>
  );
};
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);
