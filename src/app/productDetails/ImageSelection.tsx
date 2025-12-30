"use client"
import React, { useState } from 'react'

export default function ImageSelection({ imageCover, imageList, imgTittle }: { imageCover: string | undefined, imageList: string[] | undefined, imgTittle: string | undefined }) {

    const [imge, setimge] = useState(imageCover)

    return (
        <>
            <img src={imge} alt={imgTittle} className='w-full border-2 rounded-2xl' />
            <div className='grid grid-cols-5 gap-2  mt-4'>
                {imageList?.map(img =>
                    <img key={img} src={img} alt={imgTittle} onClick={() => { setimge(img) }} className=' h-25 w-20 object-center rounded-2xl border-2 cursor-pointer hover:border-[#FC7732] duration-200 ' />
                )}
            </div>
        </>
    )
}
