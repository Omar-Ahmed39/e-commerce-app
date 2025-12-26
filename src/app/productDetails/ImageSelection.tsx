"use client"
import React, { useState } from 'react'

export default function ImageSelection({ imageCover, imageList, imgTittle }: { imageCover: string | undefined, imageList: string[] | undefined, imgTittle: string | undefined }) {

    const [imge, setimge] = useState(imageCover)

    return (
        <>
            <img src={imge} alt={imgTittle} className='w-full' />
            <div className='grid grid-flow-col-dense gap-2 mt-4'>
                {imageList?.map(img =>
                    <img key={img} src={img} alt={imgTittle} onClick={() => { setimge(img) }} className=' h-20 w-20 object-center rounded-full cursor-pointer' />
                )}
            </div>
        </>
    )
}
