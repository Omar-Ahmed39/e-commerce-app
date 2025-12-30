import Link from 'next/link'
import React from 'react'

export default function HomeHeader() {
    return (
        <header className='bg-gradient-to-r from-[#1F3155] to-[#0F8196] py-10 p-4 text-center flex justify-center'>
            <div>
                <p className='font-semibold  text-5xl  text-white   md:mx-0 md:w-90 mb-5'>Discover the Latest Fashion Trends</p>
                <Link href='products' className='bg-[#FC7732] block w-fit mx-auto  text-white font-semibold py-4 px-8 rounded-lg duration-300 hover:bg-[#f1611a] cursor-pointer'>Shop Now</Link>
            </div>
        </header>


    )
}
