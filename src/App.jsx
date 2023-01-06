import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'
import { AddTodo, ListTodo, EditTodo, LoginPage, RegisterPage } from './components'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export default function App() {
  const [todoId, setTodoId] = useState('')
  let [isLogin, setIsLogin] = useState(false)


  const getTodoHandler = (id) => {

    setTodoId(id)
  }

  useEffect(() => {
    const auth = getAuth()
    onAuthStateChanged(auth, (result) => {
      console.log(result.email)
      if (result) {
        setIsLogin(true)
        return
      }
      setIsLogin(false)
    })
  }, [])

  if (isLogin) {
    return (
      <Routes>
        <Route path='/' element={<ListTodo getTodoId={getTodoHandler} />} />
        <Route path='/addTodo' element={<AddTodo />} />
        <Route path={`/editTodo/:id`} element={<EditTodo id={todoId} setTodoId={setTodoId} />} />
      </Routes>
    )
  }

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



  return (
    <>
      <Routes>
        <Route path='/' element={<LoginPage setIsLogin={setIsLogin} />} />
        <Route path='/register' element={<RegisterPage setIsLogin={setIsLogin} />} />
      </Routes>
    </>
  );
}
