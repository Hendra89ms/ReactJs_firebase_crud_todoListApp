import React, { useState } from 'react'
import { Button, Input, IconButton, Textarea } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { Link, useNavigate } from 'react-router-dom'
import Todo_Services from '../../service/todo_services'
import { useEffect } from 'react'

export default function AddTodo() {

    function getToday() {
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1; // Januari adalah bulan ke-0
        const year = date.getFullYear();

        return `${day} - ${month} - ${year}`;
    }

    function getTime() {
        const date = new Date();
        return date.toLocaleString('id-ID', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
    }

    const user = JSON.parse(localStorage.getItem('user'))

    // state
    const [state, setState] = useState({
        todos: {
            userId: user.uid,
            todo: "",
            ket: "",
            date: getToday(),
            time: getTime()
        },
        loading: false,
        error: ""
    })

    useEffect(() => {
        state.todos.userId
    }, [state])

    // handle perubahan inputan
    const handelChange = (e) => {
        setState({
            ...state,
            todos: {
                ...state.todos,
                [e.target.name]: e.target.value
            }
        })
    }

    let navigate = useNavigate()

    // submit form
    const handleSubmit = async (e) => {
        e.preventDefault()

        let todo = e.target.todo.value;
        let ket = e.target.ket.value;

        if (!todo || !ket) {
            return alert('You must input data!')
        }

        try {
            setState({ ...state, loading: true })
            let response = Todo_Services.addTodo(state.todos)

            if (response) {
                navigate('/', { replace: true })
            }

        } catch (error) {
            setState({
                ...state,
                error: error.message
            })
            navigate('/addTodo', { replace: false })
        }



    }



    return (
        <>
            {
                state.loading ? <SpinnerPage /> : (
                    <div className='flex flex-col mb-20 max-w-[500px] h-full m-auto '>
                        <Link to={'/'}>
                            <IconButton icon={<ArrowBackIcon />} className='mx-6 mt-5 mb-16' />
                        </Link>


                        <h1 className='text-center text-lg'>Add Your <span className='text-orange-500 '>Todo</span></h1>
                        <hr />

                        <div className='px-7 flex flex-col gap-4'>
                            <img src="https://www.jotform.com/blog/wp-content/uploads/2018/08/to-do-list-compressor.jpg" alt="todo" className='object-cover rounded-lg mt-8' />

                            <form autoComplete='off' onSubmit={handleSubmit} className='flex flex-col gap-3'>
                                <Input
                                    type="text"
                                    placeholder='Your Todo'
                                    name='todo'
                                    onChange={handelChange}
                                    value={state.todos.todo}
                                    textTransform='lowercase'
                                />
                                <Textarea
                                    border={'1px'}
                                    borderColor={'gray.200'}
                                    textTransform='lowercase'
                                    name='ket'
                                    placeholder='Keterangan'
                                    onChange={handelChange}
                                    value={state.todos.ket}
                                />

                                <Button type='submit' bg={'blue.400'} color='white' >Submit</Button>

                            </form>
                        </div>
                    </div>
                )

            }

        </>
    )
}
