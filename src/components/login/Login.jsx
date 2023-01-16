import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth'


export default function LoginPage({ setIsLogin }) {

    const navigate = useNavigate()

    const handleGoogleLogin = () => {
        const auth = getAuth()
        const provider = new GoogleAuthProvider()

        signInWithPopup(auth, provider)
            .then(res => {
                localStorage.setItem('user', JSON.stringify(res.user))
                setIsLogin(true)
                navigate('/', { replace: true })
            })
            .catch(err => {
                setIsLogin(false)
                navigate('/', { replace: false })
                console.log(err)
            })

    }

    const handleEmailPassword = (e) => {
        e.preventDefault()

        let email = e.target.email.value;
        let password = e.target.password.value;

        if (!email || !password) {
            return alert('Tolong check email atau password!')
        }

        if (password.length < 6) {
            return alert("Password Kamu harus lebih dari 6 character!")
        }

        const auth = getAuth()
        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                localStorage.setItem('user', JSON.stringify(result.user))
                setIsLogin(true)
                navigate("/", { replace: true })
            })
            .catch((err) => {
                alert("Terjadi kesalahan")
                navigate("/", { replace: false })
                setIsLogin(false)
                console.log(err)
            })
    }

    return (
        <>
            <div className='w-screen h-screen flex justify-center items-center bg-slate-100 sm:text-xs '>
                <div className='flex flex-col bg-white gap-10 w-[500px] sm:w-[300px] h-[400px] px-10 py-4 mx-4 rounded-md '>
                    <div className='text-2xl flex space-x-1 items-center justify-center '>
                        <h1 className='text-orange-500'> Login </h1>
                        <p>Page</p>
                    </div>

                    <form
                        onSubmit={handleEmailPassword}
                        className='flex flex-col gap-4'
                        autoComplete='off'
                    >
                        <div className='flex flex-col gap-2'>
                            <input
                                id='email'
                                type="email"
                                className='border-[1px] border-slate-400 outline-orange-300 p-2 rounded-md ' placeholder='Email' />

                            <input
                                id='password'
                                type="password"
                                className='border-[1px] border-slate-400 outline-orange-300 p-2 rounded-md ' placeholder='Password' />
                        </div>


                        <div className='flex flex-col gap-2'>

                            <button
                                type='submit'
                                className='bg-orange-500 text-white rounded-md h-[40px] hover:bg-orange-400 duration-300  '
                            >Login</button>


                            <button
                                onClick={handleGoogleLogin}
                                type='button'
                                className='bg-blue-500 text-white rounded-md h-[40px] hover:bg-blue-400 duration-300  '
                            >Gunakan Google</button>
                        </div>

                        <div className='text-sm mt-4'>
                            <p>Kamu Belum Punya Akun?</p>
                            <Link to={'/register'} className='bg-slate-100 text-orange-500 hover:text-black duration-300 '>Register Sekarang</Link>
                        </div>
                    </form>
                </div>
            </div>




        </>
    );
}
