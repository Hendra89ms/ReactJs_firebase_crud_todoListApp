import React from 'react';
import { Spinner } from '@chakra-ui/react'

export default function SpinnerPage() {

    return (
        <>
            <div className='w-full h-screen flex justify-center items-center'>
                <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                />
            </div>
        </>
    );
}
