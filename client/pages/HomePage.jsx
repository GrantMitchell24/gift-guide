import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { Image } from '@chakra-ui/react'
// import howTo from '../assets/i/howTo.png'

export default function HomePage() {
  return (
    <>
      <Box flexDir="row" m="10px">
        <Flex flexDir="column" align="left" w="100%">
          <Heading size="lg">Welcome!</Heading>
          <Text>Create your list & check it twice!</Text>
        </Flex>
      </Box>
      <Box boxSize='xl'>
        <Image src={"../assets/images/howTo.png"} alt='How To' />
      </Box>


      <Box>
        <p>1.Create your own wish list for friends & family to see what you want this holiday season!</p>
        <p>2.Create or add mutiple groups to seperate sides of families and or friends, so you can see what they want as well!</p>
        <p>3.Everyone will see what has already been purchased from all the groups you are a part of, except for you of course!</p>
      </Box>
    </>

  );
}
