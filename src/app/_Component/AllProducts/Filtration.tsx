"use client"
import { CategoryType } from '_/app/_Interfaces/Product.Typs'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { FieldValues, useForm } from 'react-hook-form'

export type FilterType = {
    price: {
        gte: string,
        lte: string,
    }
    sort: string,
    category: string
}

export default function Filtration({ catagories }: { catagories: CategoryType[] | null }) {

    const { handleSubmit, register } = useForm()
    const allCatagories = catagories
    const searchParams = useSearchParams()
    const setUrl = new URLSearchParams(searchParams)
    const router = useRouter()
    const currentPath = usePathname()

    function myHandleSubit(data: FilterType | FieldValues) {

        data.price.gte ? setUrl.set('price[gte]', data.price.gte) : setUrl.delete('price[gte]')
        data.price.lte ? setUrl.set('price[lte]', data.price.lte) : setUrl.delete('price[lte]')
        data.sort != 'nothing' ? setUrl.set('sort', data.sort) : setUrl.delete('sort')
        data.category != 'all' ? setUrl.set('category[in]', data.category) : setUrl.delete('category[in]')
        router.push(`${currentPath}?${setUrl.toString()}`)
    }
    
    return (
        <form className='grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-5' onSubmit={handleSubmit(myHandleSubit)}>
            <div>
                <label htmlFor="search" className='block mb-2 text-lg text-[#1F2B4C]'>Search</label>
                <input type="text" id="#search" placeholder='Search Product' className='w-full rounded-lg' {...register('search')} />
            </div>
            <div>
                <label htmlFor="category" className='block mb-2 text-lg text-[#1F2B4C]'>Category</label>
                <select id='#category' className='w-full rounded-lg' {...register('category')}>
                    <option value="all">All</option>
                    {allCatagories?.map((category) => { return <option key={category._id} value={category._id}>{category.name}</option> })}
                </select>
            </div>
            <div>
                <label htmlFor="sort" className='block mb-2 text-lg text-[#1F2B4C]'>Sort By</label>
                <select id='#sort' className='w-full rounded-lg' {...register('sort')}>
                    <option value="nothing">Nothing</option>
                    <option value="price">Price:Low to High</option>
                    <option value="-price" >Price:High to Low</option>
                </select>
            </div>
            <div>
                <label htmlFor="range" className='block mb-2 text-lg text-[#1F2B4C]'>Price Range</label>
                <div className='grid grid-cols-2 gap-1 '>
                    <input type="text" id="#range" placeholder='Min Price' className=' rounded-lg' {...register('price[gte]')} />
                    <input type="text" placeholder='Max Price' className=' rounded-lg' {...register('price[lte]')} />
                </div>
            </div>
            <button type='submit'>Apply</button>
        </form>
    )
}
