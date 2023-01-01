import React from 'react';
import { Link } from 'react-router-dom';

export default function RegisterPage() {


    const submitForm = (e) => {
        e.preventDefault()

        let username = e.target.username.value;
        let password = e.target.password.value;
        let ulangi_password = e.target.ulangi_password.value;

        console.log({ username, password, ulangi_password })

        if (!username || !password || !ulangi_password) {
            return alert('Anda harus menginput data dengan benar!!!')
        }

        if (password !== ulangi_password) {
            return alert('Password harus sama');
        }



    }

    return (
        <>
            <div className='w-screen h-screen flex justify-center items-center bg-slate-100 sm:text-xs '>
                <div className='flex flex-col bg-white gap-10 w-[500px] sm:w-[300px] h-[450px] px-10 py-4 mx-4 rounded-md '>
                    <div className='text-2xl flex space-x-1 items-center justify-center '>
                        <h1 className='text-orange-500'> Register </h1>
                        <p>Page</p>
                    </div>

                    <form
                        onSubmit={submitForm}
                        className='flex flex-col gap-4'
                        autoComplete='off'
                    >
                        <div className='flex flex-col gap-2'>
                            <input
                                id='username'
                                type="text"
                                className='border-[1px] border-slate-400 outline-orange-300 p-2 rounded-md ' placeholder='Username' />

                            <input
                                id='password'
                                type="password"
                                className='border-[1px] border-slate-400 outline-orange-300 p-2 rounded-md ' placeholder='Password' />

                            <input
                                id='ulangi_password'
                                type="password"
                                className='border-[1px] border-slate-400 outline-orange-300 p-2 rounded-md ' placeholder='Ulangi Password' />
                        </div>


                        <div className='flex flex-col gap-2'>

                            <button
                                type='submit'
                                className='bg-orange-500 text-white rounded-md h-[40px] hover:bg-orange-400 duration-300  '
                            >Register</button>


                            <button
                                type='submit'
                                className='bg-orange-500 text-white rounded-md h-[40px] hover:bg-orange-400 duration-300  '
                            >Gunakan Google</button>
                        </div>

                        <div className='text-sm mt-4'>
                            <p>Kamu Sudah Punya Akun?</p>
                            <Link to={'/'} className='bg-slate-100 text-orange-500 hover:text-black duration-300 '>Login Sekarang</Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
