// pages/HomePage.jsx
import { Container, Flex, Box } from '@chakra-ui/react';
import React from 'react';
import FeedPosts from '../FeedPost/FeedPosts'
import SuggestedUsers from '../components/SuggestedUsers/SuggestedUsers';
function HomePage() {
  return (
    <Container maxW={'container.lg'}>

      <Flex gap={20}>
        <Box flex={2} py={10} >
          < FeedPosts />
        </Box>
        <Box flex={3} mr={20}
          display={{ base: 'none', lg: "block" }}
          maxW={'300px'}


        >
          <SuggestedUsers></SuggestedUsers>
        </Box>
      </Flex>

    </Container>
  );
}

export default HomePage;
