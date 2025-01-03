import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";


const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found. Ensure #root exists in public/index.html.");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
    <App />
);