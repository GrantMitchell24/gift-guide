import React from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppProvider from "./utils/AppProvider";


//import components
import { Header, ProtectedRoute, Footer } from "./components";

//import pages for utilization in app.jsx
import {
  HomePage,
  AuthPage,
  Logout,
  GroupsPage,
  AccountPage,
  WishListPage
} from "./pages/";

//import Box from Chakra
import { Box, Flex } from "@chakra-ui/react";

//app.jsx function
export default function App() {

//-------------------------------------------------------------------
// Color Pallet
// https://coolors.co/palette/386641-6a994e-a7c957-f2e8cf-bc4749

const [colorPallet, setColorPallet] = useState({
  c1: "#386641", // Dark Green
  c2: "#6A994E", // Middle Green
  c3: "#A7C957", // Light Green
  c4: "#F2E8CF", // Off White
  c5: "#BC4749", // Red
})
//-------------------------------------------------------------------

  return (
    <AppProvider>
      <BrowserRouter>
        <Box minH="100vh" backgroundColor={colorPallet.c1}>
        <Header colorPallet={colorPallet}/>
        <Box>
          <Flex flexDir="column">
            <Routes>
              <Route path="/" element={<HomePage colorPallet={colorPallet}/>} />
              <Route 
                path="/auth" 
                element={<AuthPage colorPallet={colorPallet}/>} 
              />

              <Route
                path="/account"
                element={
                  <ProtectedRoute>
                    <AccountPage colorPallet={colorPallet} />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/mygroups"
                element={
                  <ProtectedRoute>
                    <GroupsPage colorPallet={colorPallet} />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/wishlist/:userId"
                element={
                  <ProtectedRoute>
                    <WishListPage colorPallet={colorPallet}/>
                  </ProtectedRoute>
                }
              />

              <Route path="/logout" element={<Logout />} />
            </Routes>
          </Flex>
        </Box>
        <Footer colorPallet={colorPallet}/>
        </Box>
      </BrowserRouter>
    </AppProvider>
  );
}
