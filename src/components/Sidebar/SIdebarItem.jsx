import React from 'react'
import Notifications from './Notification'
import Home from './Home'
import CreatePost from './CreatePost'
import ProfileLink from './ProfileLink'
import Search from './Search'

const SIdebarItem = () => {
  return <>
  <Home></Home>
  <Search/>
  <Notifications></Notifications>

  <CreatePost></CreatePost>
  <ProfileLink></ProfileLink>

  </>
}

export default SIdebarItem