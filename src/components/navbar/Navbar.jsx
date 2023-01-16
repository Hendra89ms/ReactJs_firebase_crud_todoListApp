import React, { useState, useEffect } from 'react';
import { Avatar } from '@chakra-ui/react'
import { Icon } from '@iconify/react';
import { getAuth, signOut } from 'firebase/auth'
import { useNavigate, Link } from 'react-router-dom';

export default function Navbar({ setIsLogin }) {
    const [user, setUser] = useState()

    const [show, setShow] = useState(false)
    const navigate = useNavigate()

    const handleShow = () => {
        setShow(true)
    }

    const clickOutside = () => {
        setShow(false)
    }

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')))
    }, [])

    // logOut
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



    return (
        <>

            <div className=' w-screen fixed z-50  ' >

                <div className='flex justify-between bg-slate-200  items-center h-[70px] px-4 sm:w-[900px] sm:mx-auto rounded-bl-2xl rounded-br-2xl '>
                    <div>
                        <h2 className='text-lg text-center'><span className='text-orange-500'>Todo-List</span> App</h2>
                    </div>

                    <div className='flex justify-center items-center gap-0 relative '>
                        <h1 className='w-[100px] sm:w-[150px] truncate '>{user?.email}</h1>

                        <Avatar name={user?.email} src={user?.photoURL} className='cursor-pointer' onClick={handleShow} />

                    </div>

                    {
                        show && (
                            <div className='w-screen h-screen absolute top-0 left-0 bottom-0 right-0 ' onClick={clickOutside}>
                                <div className='flex flex-col absolute top-[55px] right-[40px] w-[200px] sm:right-[230px] gap-2 py-4 bg-slate-100'>

                                    <Link to={'/profile'} className='gap-2 sm:gap-0 flex justify-center items-center cursor-pointer hover:bg-gradient-to-b from-orange-300 to-orange-100 w-full duration-300'>
                                        <Icon icon="gg:profile" color="black" fontSize={17} />
                                        <p className=' sm:p-[8px] rounded-md '>Profil</p>
                                    </Link>
                                    <hr />

                                    <div
                                        className='flex gap-2 sm:gap-0 justify-center items-center cursor-pointer hover:bg-gradient-to-b from-orange-300 to-orange-100 w-full duration-300'
                                        onClick={handleLogOut}
                                    >
                                        <Icon icon="material-symbols:logout" color="black" fontSize={17} />
                                        <p className=' sm:p-[8px] rounded-md '>LogOut</p>
                                    </div>




                                </div>
                            </div>
                        )
                    }


                </div>
            </div>







        </>
    );
}
