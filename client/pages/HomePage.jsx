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
    bgImage="url(/assets/images/background2.jpg)"
    bgSize="cover"
    bgRepeat="no-repeat"
    >
      <Box flexDir="row" m="10px">
        <Flex flexDir="column" align="left" w="100%">
          <Heading size="2xl" color={colorPallet.c4}>Welcome to Giftify!</Heading>
          <Text color={colorPallet.c4} p="10px 0px 20px 0px">Create your list & check it twice!</Text>
          <List color={colorPallet.c4}>
        <ListItem>1. Create your own wish list for friends & family!</ListItem>
        <ListItem>2. Create groups with your families and or friends!</ListItem>
        <ListItem>3. Everyone will see what has already been purchased from your list, except for you of course!</ListItem>
      </List>
        </Flex>
      </Box>
    </Box>

  );
}
