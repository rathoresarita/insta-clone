import React, { useState } from 'react'
import { Box, VStack, Image, Input, Button, Flex, Text, Center } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'
import GoogleAuth from '../AuthForm/GoogleAuth'

const AuthForm = () => {




    // const handleAuth = () => {
    //     console.log('inputs', inputs)
    //     if (!inputs.email || !inputs.password) {
    //         alert('please fill all the fields')
    //         return;
    //     }
    //     navigate("/")

    // }

    const [isLogin, setIsLogin] = useState(true)
    return <>
        <Box border={'1px solid gray'} borderRadius={4} padding={5}>
            <VStack spacing={4}>
                <Image src='/logo.png' h={24} cursor={'pointer'} alt="Instagam">


                </Image>

                {isLogin ? <Login></Login> : <Signup></Signup>}


                {/* {or text} */}

                <Flex alignItems={'center'} justifyContent={'center'} my={4} gap={1} width={'full'}>
                    <Box flex={2} h="1px" bg={"gray.400"} />
                    <Text mx={1} color={"white"}>OR</Text>
                    <Box flex={2} h={'1px'} bg={'gray.400'}></Box>

                </Flex>
                <GoogleAuth prefix={isLogin ? "Log in" : 'Sign up'}></GoogleAuth>

            </VStack>

        </Box>

        <Box border={'1px solid gray'} borderRadius={4} padding={5}>
            <Flex alignItems={'center'} justifyContent={'center'}>
                <Box mx={2} fontSize={14}>
                    {isLogin ? "Don't have account" : 'Already have an account?'}
                </Box>

                <Box onClick={() => setIsLogin(!isLogin)} color={"blue.500"} cursor={'pointer'}>
                    {isLogin ? "Sign Up" : "Log in"}

                </Box>


            </Flex>

        </Box>

    </>
}

export default AuthForm