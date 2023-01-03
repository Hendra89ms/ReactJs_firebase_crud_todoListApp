import React, { useState, useEffect } from 'react'
import { IconButton } from '@chakra-ui/react'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'
import SpinnerPage from '../spinner/Spinner'
import Todo_Services from '../../service/todo_services'
import { Navbar } from '../navbar'

export default function ListTodo({ getTodoId }) {
    const [state, setState] = useState({
        todos: [],
        loading: false,
        error: ''
    })

    // mengget semua data
    const getAllDocs = async () => {

        try {
            setState({ ...state, loading: true })

            // respon dari services
            const resp = await Todo_Services.getAllTodo()

            // mapping mereturn object dari firebase
            const todos = resp.docs.map((item) => {
                return { ...item.data(), id: item.id }
            });

            setState({ ...state, todos: todos })

        } catch (error) {
            setState({
                ...state,
                error: error.message
            })
        }


    }

    // delete todo
    const deleteHandler = async (id) => {
        let resp = await Todo_Services.deleteTodo(id)
        getAllDocs()
    }

    useEffect(() => {
        getAllDocs()
    }, [])

    return (
        <>



            {
                state.loading ? <SpinnerPage /> : (
                    <div>
                        <Navbar />

                        <div className='flex flex-col mb-20 sm:w-[700px] h-full mx-auto '>

                            <div className='flex flex-wrap justify-center items-center mt-14 gap-4'>

                                {
                                    state.todos.map((todo) => {
                                        return (
                                            <div key={todo.id} className='w-[300px] min-h-[200px] border-slate-400 border-[1px] rounded-md px-3 py-4 bg-gray-400 text-white '>
                                                <div className='flex gap-4 justify-end '>
                                                    <Link to={`/editTodo/${todo.id}`}>
                                                        <IconButton
                                                            icon={<EditIcon color='blue.400' />}
                                                            onClick={() => getTodoId(todo.id)}
                                                        />
                                                    </Link>
                                                    <IconButton
                                                        icon={<DeleteIcon color='red.400' />}
                                                        onClick={() => { deleteHandler(todo.id) }}
                                                    />
                                                </div>

                                                <h1 className='capitalize mt-4'>{todo.todo}</h1>
                                                <hr className='bg-orange-500 ' />
                                                <p>{todo.ket}</p>


                                                <div className='flex gap-2 mt-4 justify-end'>
                                                    <p>Dibuat pada </p>
                                                    <div className='flex gap-3'>
                                                        <h3>{todo.time},</h3>
                                                        <p>{todo.date}</p>
                                                    </div>
                                                </div>

                                            </div>
                                        )
                                    })
                                }


                            </div>


                            <Link to={'/addTodo'} className='flex justify-center items-center'>
                                <button
                                    className='w-[80px] h-[80px] rounded-full bg-orange-500 text-white text-[40px] fixed bottom-[100px] left-[250px] border-0 outline-none sm:bottom-[40px] sm:right-0 sm:left-[800px] '
                                >
                                    +</button>
                            </Link>

                        </div>
                    </div>


                )
            }
        </>
    )
}
