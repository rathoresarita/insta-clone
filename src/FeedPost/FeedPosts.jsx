import { Container, Flex, SkeletonCircle, Skeleton, Box, VStack,Text } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import FeedPost from './FeedPost'
import useGetFeedPosts from '../hooks/useGetFeedPost'

const FeedPosts = () => {

    const { isLoading, posts } = useGetFeedPosts()

    return (
        <Container maxW={"container.sm"} py={10} px={2}>

            {isLoading && [0, 1, 2].map((_, index) => (
                <VStack
                    key={index} gap={4} alignItems={'flex-start'} mb={10}
                >

                    <Flex gap="2" alignItems={'flex-start'}>

                        <SkeletonCircle size='10'>

                            <VStack gap={2} alignItems={'flex-start'}>
                                <Skeleton height="10px" w={'200px'}></Skeleton>

                                <Skeleton height="10px" w={'200px'}></Skeleton>


                            </VStack>
                        </SkeletonCircle>
                    </Flex>



                    <Skeleton w={'full'}>
                        <Box h={'400px'}> contnent Wrappped

                        </Box>

                    </Skeleton>

                </VStack>
            ))}


{!isLoading && posts.length > 0 && posts.map((post) => <FeedPost key={post.id} post={post} />)}
			{!isLoading && posts.length === 0 && (
				<>
					<Text fontSize={"md"} color={"red.400"}>
						Dayuum. Looks like you don&apos;t have any friends.
					</Text>
					<Text color={"red.400"}>Stop coding and go make some!!</Text>
				</>
			)}


        </Container>
    )
}

export default FeedPosts