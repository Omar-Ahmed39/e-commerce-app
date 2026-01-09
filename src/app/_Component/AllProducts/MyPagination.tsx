"use client"
import React, { useState, useTransition } from 'react'
import { Pagination } from '@mui/material';

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { MetaDataType } from '_/app/_Interfaces/Product.Typs'



export default function MyPagination(metaData: { metaData: MetaDataType | undefined }) {
  const currentPath = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const URLParams = new URLSearchParams(searchParams)

  const [isPending, startTransition] = useTransition()
  function handleChange(_: React.ChangeEvent<unknown>, value: string) {
    window.scroll({
      top:0,
      behavior: "smooth"
    })
    value == '1' ? URLParams.delete('page') : URLParams.set('page', value)
    startTransition(() => {
      router.push(`${currentPath}?${URLParams.toString()}`)
    })
  }


  return (
    <>
      {isPending && <div className='w-full h-screen bg-black/50 fixed inset-0 z-[50] flex justify-center items-center'>
        <i className="fa fa-spinner fa-spin text-6xl text-white flex" ></i>
      </div>}
      <Pagination count={metaData.metaData?.numberOfPages} variant="outlined" className='w-fit mx-auto mt-10' shape='rounded' sx={{
        '& .MuiPaginationItem-root.Mui-selected': {
          backgroundColor: '#FC7732',
          color: 'white',
        },
        '& .MuiPaginationItem-root.Mui-selected:hover': {
          backgroundColor: '#e64a19',
        },
      }} onChange={(e, v) => { handleChange(e, v.toString()) }} page={metaData.metaData?.currentPage} />
    </>
  )

}
