import React, { useState, useEffect } from 'react';
import { SpinnerPage } from '../spinner';
import { Avatar } from '@chakra-ui/react'
import { getAuth, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import Todo_Services from '../../service/todo_services';

export default function Profile({ setIsLogin }) {

    const [state, setState] = useState({
        loading: false,
        error: '',
        jumlahTodo: ""
    })
    const [user, setUser] = useState()
    const navigate = useNavigate()


    const handleLogOut = () => {
        const auth = getAuth()
        signOut(auth)
            .then(result => {
                localStorage.clear()
                setIsLogin(false)
                navigate('/', { replace: true })
            })
            .catch(err => {
                navigate('/', { replace: false })
                console.log(err)
            })
    }


    // jumlah semua data
    const getTotalData = async () => {
        try {
            setState({ ...state, loading: true })

            // respon dari services
            const resp = await Todo_Services.totalData(userID.uid)

            const totalTodos = resp.data().count

            setState({ ...state, loading: false, jumlahTodo: totalTodos })

        } catch (error) {
            setState({
                ...state,
                error: error.message
            })
        }
    }
    const userID = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        document.title = 'Profile'

        setUser(JSON.parse(localStorage.getItem('user')))
        userID.uid
        getTotalData()
    }, [])



    return (
        <>
            {
                state.loading ? <SpinnerPage /> : (
                    <div className='w-screen min-h-screen flex justify-center items-center bg-gradient-to-br from-red-500 to-red-400 px-10 sm:px-0'>

                        <div className='w-[500px] sm:w-[700px] bg-white h-[400px] flex flex-col justify-center items-center rounded-md gap-7'>
                            <h1 className=' text-2xl text-center'>Profile User</h1>

                            <div className='flex flex-col justify-center items-center'>
                                <Avatar name={user?.email} src={user?.photoURL} size={'2xl'} />
                                <p className='text-xl'>{user?.email}</p>

                                <p>Jumlah Kegiatan : <span className='font-bold'>{state.jumlahTodo}</span></p>
                            </div>

                            <button type='button' onClick={handleLogOut} className='bg-black text-white w-[200px] sm:w-[350px] p-2 hover:bg-slate-800 duration-300 rounded-md '>Logout</button>
                        </div>

                    </div>
                )
            }

        </>
    );
}
