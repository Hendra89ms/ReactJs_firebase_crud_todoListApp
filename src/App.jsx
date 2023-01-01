import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'
import { AddTodo, ListTodo, EditTodo, LoginPage, RegisterPage } from './components'
import { useNavigate } from 'react-router-dom'

export default function App() {
  const [todoId, setTodoId] = useState('')
  let [isLogin, setIslogin] = useState(false)
  let navigate = useNavigate()

  const getTodoHandler = (id) => {

    setTodoId(id)
  }

  if (isLogin) {
    return (
      <Routes>
        <Route path='/' element={<ListTodo getTodoId={getTodoHandler} />} />
        <Route path='/addTodo' element={<AddTodo />} />
        <Route path={`/editTodo/:id`} element={<EditTodo id={todoId} setTodoId={setTodoId} />} />
      </Routes>
    )
  }

  return (
    <>
      <Routes>
        <Route path='/' element={<LoginPage setLogin={setIslogin} />} />
        <Route path='/register' element={<RegisterPage />} />
      </Routes>
    </>
  );
}
