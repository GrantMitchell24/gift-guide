import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { Image } from '@chakra-ui/react'
import { List, ListItem, ListIcon, OrderedList, UnorderedList } from '@chakra-ui/react'

export default function HomePage(props) {

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
      <Box flexDir="row" m="10px">
        <Flex flexDir="column" align="left" w="100%">
          <Heading size="2xl" color={colorPallet.c4}>Welcome to Giftify!</Heading>
          <Text color={colorPallet.c4} p="10px 0px 20px 0px">Create your list & check it twice!</Text>
          <OrderedList color={colorPallet.c4} maxW="600px">
            <ListItem>Create your own wish list for friends & family!</ListItem>
            <ListItem>Create groups with your families and or friends!</ListItem>
            <ListItem>Everyone will see what has already been purchased from your list, except for you of course!</ListItem>
          </OrderedList>
        </Flex>
      </Box>
    </Box>

  );
}
