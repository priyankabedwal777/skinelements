import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./AppRouter";
import "./styles/index.css";

const GOOGLE_ID =
  import.meta.env.Google_Client_ID ||
  "356389324877-66f9r1m6hvacghboebidigv3uot2rkip.apps.googleusercontent.com";

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_ID}>
      <AuthProvider>
        <DataProvider>
          <BrowserRouter>
            <div className="min-h-screen bg-gray-50">
              <AppRouter />
              <Toaster position="top-right" reverseOrder={false} />
            </div>
          </BrowserRouter>
        </DataProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
