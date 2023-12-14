// Import Utils
import { useAppCtx } from "../utils/AppProvider";

// Import Chakra
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { ListItem, OrderedList, Button } from '@chakra-ui/react'
import { Link as ChakraLink } from "@chakra-ui/react";

export default function HomePage(props) {
  // Bring in logged in user info
  const { user } = useAppCtx();

  // Bring in color pallet
  const colorPallet = props.colorPallet

  return (
    <Box
      fontSize='xl'
      minH="80vh"
      p={10}
      width="100vw"
      minW="320px"
      bgImage="url(/assets/images/northfolk-Ts0g6PHe1q0-unsplash.jpg)"
      bgSize="cover"
      bgRepeat="no-repeat"
    >
      <Box 
      flexDir="row" 
      m="10px"
      >
        <Flex flexDir="column" align="left">
          <Heading size="2xl" color={colorPallet.c4}>Welcome to Giftify!</Heading>
          <Text color={colorPallet.c4} p="10px 0px 20px 0px">Create your list & check it twice!</Text>
          <OrderedList color={colorPallet.c4} maxW="600px">
            <ListItem>Create your own wish list for friends & family!</ListItem>
            <ListItem>Create groups with your families and or friends!</ListItem>
            <ListItem>Everyone will see what has already been purchased from your list, except for you of course!</ListItem>
          </OrderedList>
          {user._id === undefined &&
            <ChakraLink href="/auth" m="40px 80px" w="80px">
              <Button width="80px" colorScheme="green">Login</Button>
            </ChakraLink>
          }

        </Flex>
      </Box>
    </Box>

  );
}
