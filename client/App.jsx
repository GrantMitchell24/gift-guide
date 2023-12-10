import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppProvider from "./utils/AppProvider";

//import components
import { Header, ProtectedRoute, Footer, NavBar } from "./components";

//import pages for utilization in app.jsx
import {
  HomePage,
  AuthPage,
  Logout,
  PrivatePage,
  PurchasedPage,
} from "./pages/";

//import bootstrap - may need to remove?
// import "bootstrap/dist/css/bootstrap.min.css";

//import Box from Chakra
import { Box, Flex } from "@chakra-ui/react";

//app.jsx function
export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Header />
        <Box>
          <Flex flexDir="column">
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

              <Route
                path="/private/purchased"
                element={
                  <ProtectedRoute>
                    <PrivatePage />
                    <PurchasedPage />
                  </ProtectedRoute>
                }
              />

              <Route path="/logout" element={<Logout />} />
            </Routes>
          </Flex>
        </Box>
        <Footer />
      </BrowserRouter>
    </AppProvider>
  );
}