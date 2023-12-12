import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppProvider from "./utils/AppProvider";


//import components
import { Header, ProtectedRoute, Footer } from "./components";

//import pages for utilization in app.jsx
import {
  HomePage,
  AuthPage,
  Logout,
  PrivatePage,
  PurchasedPage,
  GroupsPage,
  AccountPage,
  WishListPage
} from "./pages/";

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
                    {/* <PrivatePage /> */}
                    <PurchasedPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/account"
                element={
                  <ProtectedRoute>
                    <AccountPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/mygroups"
                element={
                  <ProtectedRoute>
                    <GroupsPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/wishlist/:userId"
                element={
                  <ProtectedRoute>
                    <WishListPage />
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
