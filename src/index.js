import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/store";
import reportWebVitals from "./reportWebVitals";
import { BankUserProvider } from "./container/Admin/Pages/UserManagements/BankUser/utils/BankUserContext";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Routes";
import { CorporateUserProvider } from "./container/Admin/Pages/UserManagements/CorporateUser/utils/CorporateUserContext";
import { Loader } from "./components/elements";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Suspense>
      <BankUserProvider>
        <CorporateUserProvider>
          <RouterProvider router={router}>
            <App />
          </RouterProvider>
        </CorporateUserProvider>
      </BankUserProvider>
    </Suspense>
  </Provider>

  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
