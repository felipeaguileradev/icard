import React from "react";
import { ToastContainer } from "react-toastify";
import { Button } from "semantic-ui-react";
import "./App.scss";
import { AuthProvider } from "./context";
import { Navigation } from "./routes";

const App = () => {
  return (
    <AuthProvider>
      <Navigation />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
    </AuthProvider>
  );
};

export default App;
