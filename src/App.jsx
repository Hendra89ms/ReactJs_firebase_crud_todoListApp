import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import { AddTodo, ListTodo, EditTodo, LoginPage, RegisterPage, Profile, SpinnerPage } from './components'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Todo_Services from './service/todo_services';

export default function App() {
  const [todoId, setTodoId] = useState('')
  let [isLogin, setIsLogin] = useState(false)
  const [loading, setLoading] = useState(false)

  const getTodoHandler = (id) => {

    setTodoId(id)
  }

  useEffect(() => {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {

      if (user) {
        console.log('User Telah Login')
        return setIsLogin(true)
      }

      setIsLogin(false)
      console.log('User Belum Login...')
    })
  }, [])


  if (isLogin) {
    return (
      loading ? <SpinnerPage />
        : <Routes>
          <Route path='*' element={<ListTodo getTodoId={getTodoHandler} setLogin={setIsLogin} />} />
          <Route path='/dashboard' element={<ListTodo getTodoId={getTodoHandler} setLogin={setIsLogin} />} />
          <Route path='/addTodo' element={<AddTodo />} />
          <Route path={`/editTodo/:id`} element={<EditTodo id={todoId} setTodoId={setTodoId} />} />
          <Route path='/profile' element={<Profile setIsLogin={setIsLogin} />} />
        </Routes >
    )
  }


  return (
    <>
      {
        loading ? <SpinnerPage /> : (
          <Routes>
            <Route path='*' element={<LoginPage setIsLogin={setIsLogin} />} />
            <Route path='/login' element={<LoginPage setIsLogin={setIsLogin} />} />
            <Route path='/register' element={<RegisterPage setIsLogin={setIsLogin} />} />
          </Routes>
        )
      }

    </>
  );
}
