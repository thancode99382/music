import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "@fontsource/raleway/300.css";
import "@fontsource/raleway/400.css";
import "@fontsource/raleway/500.css";
import "@fontsource/raleway/700.css";
import SearchProvider from "./layouts/components/Siderbar/SearchProvider.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(

    <SearchProvider>
      <App />
    </SearchProvider>
  
);
