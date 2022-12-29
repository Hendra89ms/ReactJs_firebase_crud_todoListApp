import React, { useState, useEffect } from 'react';
import { Button, Input, IconButton, Textarea } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom';
import { ArrowBackIcon } from '@chakra-ui/icons'
import Todo_Services from '../../service/todo_services';
import { useParams } from 'react-router-dom';
import SpinnerPage from '../spinner/Spinner';

export default function EditTodo({ id, setTodoId }) {

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

    // state
    const [state, setState] = useState({
        todos: {
            todo: "",
            ket: "",
            date: getToday(),
            time: getTime()
        },
        loading: false,
        error: ""
    })

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

    let editHandler = async () => {

        try {
            const docSnap = await Todo_Services.getTodo(id)

            setState({
                ...state,
                todos: {
                    todo: docSnap.data().todo,
                    ket: docSnap.data().ket
                }
            })
        } catch (error) {
            setState({
                ...state,
                error: error.message
            })
        }

    }

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        let todo = e.target.todo.value;
        let ket = e.target.ket.value;

        if (!todo || !ket) {
            return alert('You must input data!')
        }


        try {
            setState({ ...state, loading: true })

            await Todo_Services.updateTodo(id, state.todos).then(res => {
                return navigate('/', { replace: true })
            })


        } catch (error) {
            setState({
                ...state,
                error: error.message
            })
            navigate('/editTodo/${id}', { replace: false })
        }
    }

    useEffect(() => {
        if (id !== undefined && id !== '') {
            editHandler()
        }
    }, [id])

    return (
        <>
            {
                state.loading ? <SpinnerPage /> : <div className='flex flex-col mb-20 max-w-[500px] h-full m-auto '>
                    <Link to={'/'}>
                        <IconButton
                            icon={<ArrowBackIcon />}
                            className='mx-6 mt-5 mb-16' />
                    </Link>

                    <h1 className='text-center text-lg'>Edit Your <span className='text-orange-500 '>Todo</span></h1>
                    <hr />

                    <div className='px-7 flex flex-col gap-4'>
                        <img src="https://images.pexels.com/photos/7015034/pexels-photo-7015034.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="todo" className='object-cover rounded-lg mt-8 h-[250px]' />

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
            }
        </>
    );
}
