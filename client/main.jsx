import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ColorModeScript } from "@chakra-ui/react";
import theme from "./components/theme";
import * as ReactDOM from "react-dom/client";

//import Chakra
import { ChakraProvider } from "@chakra-ui/react";

//inject App.jsx into 'root' in index.html
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
