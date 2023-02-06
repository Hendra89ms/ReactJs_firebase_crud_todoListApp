import React, { useState, useEffect } from 'react'
import { IconButton } from '@chakra-ui/react'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'
import SpinnerPage from '../spinner/Spinner'
import Todo_Services from '../../service/todo_services'
import { Navbar, Footer } from '../../components'


export default function ListTodo({ getTodoId, setLogin }) {
    const [state, setState] = useState({
        todos: [],
        loading: false,
        error: ''
    })

    const [user, setUser] = useState()

    // mengget semua data
    const getAllDocs = async () => {

        try {
            setState({ ...state, loading: true })

            // respon dari services
            const resp = await Todo_Services.dataUser(userAuth.uid)

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

    const userAuth = JSON.parse(localStorage.getItem('user'))


    useEffect(() => {
        document.title = 'Todo List App'

        getAllDocs()
        setUser(JSON.parse(localStorage.getItem('user')))
        userAuth.uid
    }, [])

    return (
        <>

            {
                state.loading ? <SpinnerPage /> : (

                    <div className='flex flex-col w-full min-h-screen relative '>
                        <Navbar setIsLogin={setLogin} />

                        <div className='flex flex-wrap gap-x-10 gap-y-4 pt-20 sm:w-[900px] justify-center items-center mx-auto px-10 sm:px-0 my-4 sm:my-10'>

                            {
                                state.todos.map((todo) => {
                                    return (
                                        <div key={todo.id} className='flex flex-col w-[300px] min-h-[200px]  border-slate-400 border-[1px] rounded-md px-3 py-4 bg-gray-400 text-white  '>
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

                        <Footer />

                    </div>
                )
            }


        </>
    )
}
