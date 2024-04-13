import React from 'react'
import { useLocation } from 'react-router-dom'
import { Container, Flex, VStack, Box, Image, Spinner } from '@chakra-ui/react'
import SideBar from '../../components/Sidebar/Sidebar'
import { useAuthState } from 'react-firebase-hooks/auth'
import Navbar from '../../components/Navbar/Navbar'

import { auth } from '../../firebase/firebase'

export const PageLayout = ({ children }) => {
    const { pathname } = useLocation()
    const [user, loading, error] = useAuthState(auth)


    console.log('user', user)
    console.log('loading', loading)
    console.log('path', pathname)

    const canRenderSidebar = pathname !== "/auth" && user;

    const canRenderNavbar = !user && !loading && pathname !== '/auth'

    // console.log('canR',canRenderNavbar)

    console.log('canS', canRenderSidebar)
    const checkingUserIsAuth = !user && loading
    if (checkingUserIsAuth) {
        return <PageLayoutSpinner />


    }



    return (
        <Flex flexDirection={canRenderNavbar ? "column" : "row"}>
            {/* sidebar on the left */}

            {/* instead of adding the side bar componentt to every page we can add it only once to and wrap the children with it . this way we can have a side bar every pge except  the authpage */}


            {canRenderSidebar ? (<Box w={{ base: '70px', md: '240px' }} > <SideBar /> </Box>) : null}


            {canRenderNavbar ? <Navbar></Navbar> : null}

            {/* pageContnent on the right */}
            <Box flex={1} width={{ base: "calc(100%-70px)", md: "calc(100%-240px)" }} mx={'auto'}>
                {children}
            </Box>


        </Flex >
    )
}

const PageLayoutSpinner = () => {
    return (

        <Flex flexDir='column' h='100vh' alignItems='center' justifyContent='center'>

            <Spinner size={'xl'}></Spinner>
        </Flex>
    )
}