// App.jsx
import React from 'react';
import { auth } from './firebase/firebase'
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage/AuthPage'
import { PageLayout } from './Layouts/PageLayout/PageLayout';
import ProfilePage from './pages/ProfilePage/ProfilePage'
import useAuthStore from './store/authStore'
import { useAuthState } from 'react-firebase-hooks/auth'

function App() {
  // const authUser = useAuthStore(state => state.user)
  // const authUser = useAuthStore(state => state.user)

  //more safe to check uthentication from firebase

  const [authUser, loading] = useAuthState(auth)
  return (
    <PageLayout>

      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to='/auth' />} />
        <Route path="/auth" element={!authUser ? <AuthPage /> : <Navigate to='/' />}></Route>
        <Route path='/:username' element={<ProfilePage />}></Route>

      </Routes>
    </PageLayout>


  );
}

export default App;
