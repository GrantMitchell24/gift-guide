import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import howTo from '../assets/icons/howTo.png'

export default function HomePage() {
  return (
    <>
      <Box flexDir="row" m="10px">
        <Flex flexDir="column" align="left" w="100%">
          <Heading size="lg">Welcome!</Heading>
          <Text>Create your list & check it twice!</Text>
        </Flex>
      </Box>
      <Box boxSize='sm'>
       <Image src={howTo} alt='How To' />
      </Box>


<Box>
<P1>1.Create your own wish list for friends & family to see what you want this holiday season!</P1>
<P2>2.Create or add mutiple groups to seperate sides of families and or friends, so you can see what they want as well!</P2>
<P3>3.Everyone will see what has already been purchased from all the groups you are a part of, except for you of course!</P3>
</Box>
</>
 
);
}
