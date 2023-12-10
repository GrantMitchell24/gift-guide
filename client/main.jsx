import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

//import Chakra
import { ChakraProvider } from "@chakra-ui/react";

//inject App.jsx into 'root' in index.html
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
