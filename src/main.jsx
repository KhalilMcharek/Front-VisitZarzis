import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux"; // Import Redux Provider
import store from "./redux/store"; // Import Redux store
import App from "./App.jsx";
import "../src/styles/app.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
         <App />
       </BrowserRouter>
    </Provider>
  </StrictMode>
);
