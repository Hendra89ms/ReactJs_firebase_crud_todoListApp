import React from 'react';

export default function Footer() {
    return (
        <>
            <div className='mx-auto sm:w-[900px] w-full h-[70px] bg-slate-200  flex flex-col justify-center items-center rounded-tl-2xl rounded-tr-2xl'>
                <div className='flex justify-center items-center '><h2 className='text-lg '><span className='text-orange-500 '>Todo-List</span> App</h2> @copyRight 2023</div>
                <p>Developer By Hendra Ms</p>
            </div>
        </>
    );
}
