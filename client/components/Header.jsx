// Import Components
import { NavBar } from "./index.js";

// Import Utls
import { useAppCtx } from "../utils/AppProvider";


//import from Chakra
import { Image } from '@chakra-ui/react'
import { Box, Flex, Spacer } from "@chakra-ui/react";

export default function Header(props) {

  // Bring in color pallet
  const colorPallet = props.colorPallet

  const { user } = useAppCtx();

  return (
    <Box p="10px 20px" backgroundColor={colorPallet.c1}>
      <Flex
        as="nav"
        flexDir="column"
        justify-content="space-between"
        align-items="center"
        w="100%"
      >
        <Flex>
          <a href="/"><Image height="4rem" src={"/assets/images/Giftify.png"} alt='logo' /></a>
          <Spacer />
          <Box>
            {user?._id !== undefined && (
              <NavBar colorPallet={colorPallet}/>
            )}
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
