import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppProvider from "./utils/AppProvider";

//import components
import { Header, ProtectedRoute } from "./components";

//import pages for utilization in app.jsx
import { HomePage, AuthPage, Logout, PrivatePage } from "./pages/";

//import bootstrap - may need to remove?
import "bootstrap/dist/css/bootstrap.min.css";

//app.jsx function
export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Header />
        <div className="container pt-5">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<AuthPage />} />

            <Route
              path="/private"
              element={
                <ProtectedRoute>
                  <PrivatePage />
                </ProtectedRoute>
              }
            />

            <Route path="/logout" element={<Logout />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}
