import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

try {
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    throw new Error("Root element not found. Make sure index.html has <div id='root'></div>");
  }
  createRoot(rootElement).render(<App />);
} catch (error) {
  console.error("Failed to initialize React application:", error);
  // Store error globally for debugging
  (window as any).__REACT_INIT_ERROR__ = error;
}
