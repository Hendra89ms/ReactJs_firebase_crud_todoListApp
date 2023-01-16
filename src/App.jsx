import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import { AddTodo, ListTodo, EditTodo, LoginPage, RegisterPage, Profile } from './components'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export default function App() {
  const [todoId, setTodoId] = useState('')
  let [isLogin, setIsLogin] = useState(false)


  const getTodoHandler = (id) => {

    setTodoId(id)
  }

  useEffect(() => {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      if (user) {
        return setIsLogin(true)
      }
      console.log('User Belum Login...')
      setIsLogin(false)
    })
  }, [])



  // get token
  const getFCMToken = () => {
    getToken(messaging, { vapidKey: import.meta.env.VITE_VAPID_KEY }).then((currentToken) => {
      if (currentToken) {
        console.info(currentToken)
      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
        // ...
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // ...
    });
  }

  if (isLogin) {
    return (
      <Routes>
        <Route path='*' element={<ListTodo getTodoId={getTodoHandler} setLogin={setIsLogin} />} />
        <Route path='/dashboard' element={<ListTodo getTodoId={getTodoHandler} setLogin={setIsLogin} />} />
        <Route path='/addTodo' element={<AddTodo />} />
        <Route path={`/editTodo/:id`} element={<EditTodo id={todoId} setTodoId={setTodoId} />} />
        <Route path='/profile' element={<Profile setIsLogin={setIsLogin} />} />
      </Routes>
    )
  }


  return (
    <>
      <Routes>
        {/* <Route path='/' element={<Navigate to={'/login'} />} /> */}
        <Route path='*' element={<LoginPage setIsLogin={setIsLogin} />} />
        <Route path='/login' element={<LoginPage setIsLogin={setIsLogin} />} />
        <Route path='/register' element={<RegisterPage setIsLogin={setIsLogin} />} />
      </Routes>
    </>
  );
}
