import React from 'react';
import { HamburgerIcon } from '@chakra-ui/icons'

export default function Navbar({ username }) {

    return (
        <>
            <div className='w-full bg-slate-200 fixed z-50 '>
                <div className='flex justify-between items-center mx-auto sm:w-[700px] h-[40px] px-4  '>
                    <div>
                        <h2 className='text-lg text-center'><span className='text-orange-500'>Todo-List</span> App</h2>
                    </div>

                    <div className='flex items-center gap-1'>
                        <h1>{username}</h1>
                        <div className='bg-slate-400 w-[35px] h-[35px] rounded-full flex justify-center items-center'>
                            <p className='text-white'>HM</p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
