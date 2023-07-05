import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store";

const queryClient = new QueryClient();

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <Provider store={store}>
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <Router>
            <App />
          </Router>
        </QueryClientProvider>
      </React.StrictMode>
    </Provider>
  );
}
