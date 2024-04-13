import { Flex, GridItem, Text, Image, useDisclosure, Modal, ModalOverlay, Box, ModalCloseButton, ModalHeader, ModalContent, ModalBody, Avatar, VStack, Button } from '@chakra-ui/react'

import { Divider } from '@chakra-ui/react';
import Comment from '../Comment/Comment'
import Caption from '../Comment/Caption'

import React, { useState } from 'react'

import { AiFillHeart } from 'react-icons/ai'
import { FaComment } from 'react-icons/fa'

import { MdDelete } from 'react-icons/md'
import useUserProfileStore from '../../store/useUserProfileStore'

import PostFooter from '../../FeedPost/PostFooter'
import useAuthStore from '../../store/authStore';
import useShowToast from '../../hooks/useShowToast';
import { deleteObject, ref } from 'firebase/storage';
import { arrayRemove, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { firestore, storage } from '../../firebase/firebase';
import usePostStore from '../../store/postStore'


const ProfilePost = ({ post }) => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const userProfile = useUserProfileStore((state) => state.userProfile)
  console.log('postsssss', post)

   console.log('userProfilessss',userProfile)
  const showToast = useShowToast()
  const [isDeleting, setIsDeleting] = useState(false)
  const deletePost = usePostStore(state => state.deletePost)
  const decrementPostCount = useUserProfileStore((state) => state.deletePost)

  const authUser = useAuthStore((state) => state.user)


  const handleDeletePost = async () => {
    if (!window.confirm("are you sure you want to delete this post")) return;

    if (isDeleting) return
    try {

      const imageRef
        = ref(storage, `posts/${post.id}`)
      await deleteObject(imageRef)
      const userRef = doc(firestore, "userss", authUser.uid)
      await deleteDoc(doc(firestore, "posts", post.id))

      await updateDoc(userRef, {
        posts: arrayRemove(post.id)
      })
      deletePost(post.id)
      decrementPostCount(post.id)
      showToast("Success", "Post deleted Succesfully ", "success")

    } catch (error) {
      showToast("Error", error.message, "error")

    }
    finally {
      setIsDeleting(false)
    }
  }
  return (
    <>
      <GridItem
        cursor={'pointer'}
        borderRadius={4}
        overflow={'hidden'}
        border={'1px  solid'}
        borderColor={'whiteAlpha.300'}
        position={'relative'}
        aspectRatio={1 / 1}
        onClick={onOpen}


      >
        <Flex
          opacity={0}
          _hover={{ opacity: 1 }}
          position={'absolute'}
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg={'blackAlpha.700'}
          transition={'all 0.3s ease'}
          zIndex={1}
          justifyContent={'center'}


        >
          <Flex
            alignItems={'center'}
            justifyContent={'center'}
            gap={50}

          >

            <Flex>
              <AiFillHeart size={20}></AiFillHeart>
              <Text fontWeight={'bold'} ml={2}>{post.likes.length}</Text>
            </Flex>
            <Flex>

              <FaComment size={20} /><Text fontWeight={'bold'} ml={2}>{post.comments.length}

              </Text>
            </Flex>

          </Flex>


        </Flex>

        <Image src={post.imageURL} alt='profile post' width={'100%'} h={'100%'} objectFit={'cover'}></Image>
      </GridItem>
      <Modal isOpen={isOpen} onClose={onClose}
        isCentered={true}

        size={{ base: '3xl', md: "5xl" }}
      >
        <ModalOverlay />
        <ModalContent>

          <ModalCloseButton />
          <ModalBody bg={"black"} pb={5}>

            <Flex
              gap="4"
              w={{ base: "90%", sm: "70%", md: 'full' }} mx={'auto'}
              maxH={'90vh'}
              minH={'50vh'}
            >

              <Flex borderRadius={4} overflow={'hidden'} border={'1px solid'}
                borderColor={'whiteAlpha.300'}

                flex={1.5}
                justifyContent={"center"}
                alignItems={"center"}



              >
                <Image src={post.imageURL} alt='profile post'></Image>


              </Flex>

              <Flex flex={1} flexDir={'column'} px={10}
                display={{ base: 'none', md: "flex" }}
              >
                <Flex alignItems={'center'} justifyContent={'space-between'}>
                  <Flex alignItems={'center'} gap={4}

                  >

                    <Avatar src={userProfile.profilePicURL} size={'sm'} name='As a Programmer' />
                    <Text fontWeight={'bold'} fontSize={12}>

                      {userProfile.username}
                    </Text>

                  </Flex>

                  {authUser?.uid === userProfile.uid && (<Button _hover={{ bg: "whiteAlpha.30", color: 'red.600' }} borderRadius={4} p={1}
                    bg={"transparent"}
                    onClick={handleDeletePost}
                    isLoading={isDeleting}

                  >

                    <MdDelete size={20} cursor='pointer'></MdDelete>
                  </Button>)}


                  {/* <Button _hover={{ bg: "whiteAlpha.30", color: 'red.600' }} borderRadius={4} p={1}
                  bg={"transparent"}
                  
                  >

                    <MdDelete size={20} cursor='pointer'></MdDelete>
                 </Button> */}


                </Flex>
                <Divider my={4} bg={"gray.500"} />
                <VStack w={'full'} alignItems={'start'} maxH={'350px'} overflowY={'auto'}>
                {post.caption &&  <Caption post={post}/>}

{/* comments */}
                  {post.comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} />
                  ))}

                </VStack>
                <Divider my={4} bg={'gray.8000'}></Divider>

                <PostFooter isProfilePage={true} post={post} />
              </Flex>
            </Flex>
          </ModalBody>


        </ModalContent>
      </Modal>
    </>
  )
}

export default ProfilePost