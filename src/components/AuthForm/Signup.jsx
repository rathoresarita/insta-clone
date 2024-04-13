import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { Input, InputGroup, InputRightElement,Button, Alert, AlertIcon } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import useSignUpWithEmailAndPassword from '../../hooks/useSignUpWithEmailAndPassword'

const Signup = () => {


  const [inputs, setInputs] = useState({

    fullName: '',
    username: '',
    email: '',
    password: '',



  })

  const [showPassword, setShowPassword] = useState(false)
  const{loading,error,signup}= useSignUpWithEmailAndPassword()
  return <>

    <Input
      placeholder='Email'
      fontSize={14}
      type='email'
      value={inputs.email}
      onChange={(e) => { setInputs({ ...inputs, email: e.target.value }) }}
      size={'sm'}

    >



    </Input>


    <Input
      placeholder='Username'
      fontSize={14}
      type="text"
      value={inputs.username}
      onChange={(e) => { setInputs({ ...inputs, username: e.target.value }) }}
      size={'sm'}

    ></Input>



    <Input
      placeholder='FullName'
      fontSize={14}
      type='text'
      value={inputs.fullName}

      size={'sm'}
      onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
    >

    </Input>

    <InputGroup>
    {error &&(<Alert
    status='error' fontSize={13}p={2} borderRadius={4}>
<AlertIcon
fontSize={12}
>

  {error.message}
</AlertIcon>

    </Alert>)}


      <Input
        placeholder='Password'
        fontSize={14}
        type={showPassword ? 'text' : 'password'}
        value={inputs.password}
        size={'sm'}
        onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
      >

      </Input>

      <InputRightElement h='full'>

        <Button variant={'ghost'} size={'sm'} onClick={() => setShowPassword()}>

          {showPassword ? <ViewIcon /> : <ViewOffIcon />}
        </Button>


      </InputRightElement>

    </InputGroup>

    <Button w={'full'} colorScheme='blue' size={'sm'} fontSize={14}
    isLoading={loading}
    onClick={()=>signup(inputs)}

    >

    Sign Up
    </Button>

  </>

}

export default Signup