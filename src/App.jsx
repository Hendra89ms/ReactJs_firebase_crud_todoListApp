import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'
import AddTodo from './components/todo/AddTodo';
import EditTodo from './components/todo/Edit_todo';
import ListTodo from './components/todo/ListTodo';

export default function App() {
  const [todoId, setTodoId] = useState('')

  const getTodoHandler = (id) => {

    setTodoId(id)
  }

  return (
    <>
      <Routes>
        <Route path='/' element={<ListTodo getTodoId={getTodoHandler} />} />
        <Route path='/addTodo' element={<AddTodo />} />
        <Route path={`/editTodo/:id`} element={<EditTodo id={todoId} setTodoId={setTodoId} />} />
      </Routes>
    </>
  );
}
