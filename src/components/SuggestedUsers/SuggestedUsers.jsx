import React from 'react'
import SuggestedHeader from './SuggestedHeader';
import SuggestedUser from './SuggestedUser'

import { VStack, Flex, Text, Box, Link } from '@chakra-ui/react'
import useGetSuggestedUsers from '../../hooks/useGetSuggestedUsers';

const SuggestedUsers = () => {


    const { isLoading, suggestedUsers } = useGetSuggestedUsers();

    console.log('suggested',suggestedUsers)

	// optional: render loading skeleton
	if (isLoading) return null;
    return <VStack py='{8}' px={6} gap={4}>

        <SuggestedHeader></SuggestedHeader>

        {/* <Flex alignItems={'center'} justifyContent={'space-between'} w={'full'}>
            <Text fontSize={12} fontWeight={'bold'} color={'gray.500'}>
                Suggested for you
            </Text>

            <Text fontSize={12} fontWeight={'bold'} color={'gray.500'} _hover={{ color: 'gray.400' }}>
                See All
            </Text>

        </Flex> */}

{suggestedUsers
.length !==0 &&(<Flex alignItems={'center'} justifyContent={'space-between'} w={'full'}>
<Text fontSize={12} fontWeight={'bold'} color={'gray.500'}>
    Suggested for you
</Text>

<Text fontSize={12} fontWeight={'bold'} color={'gray.500'} _hover={{ color: 'gray.400' }}>
    See All
</Text>

</Flex>)}

        {
            suggestedUsers.map((user) => (

                <SuggestedUser user={user} key={user.id}></SuggestedUser>

            ))

        }



        <Box fontSize={12} color={"gray.500"} mt={5} alignSelf={'start'}>
            O 2023 Built  By {''}
            <Link href='https://www.youtube.com/asaprogrammer' target='_blank' color="blue.500" fontSize={14}>

                As a Programmer
            </Link>
        </Box>

    </VStack>


}

export default SuggestedUsers