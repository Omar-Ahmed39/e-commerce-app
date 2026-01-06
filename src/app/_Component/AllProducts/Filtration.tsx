"use client"
import { CategoryType } from '_/app/_Interfaces/Product.Typs'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useTransition } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { Button } from "_/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "_/components/ui/dropdown-menu"

export type FilterType = {

    price: {
        gte: string,
        lte: string,
    }
    sort: string,
    category: string,
    search: string
}



export default function Filtration({ catagories }: { catagories: CategoryType[] | null }) {

    const allCatagories = catagories;
    const searchParams = useSearchParams();
    const setUrl = new URLSearchParams(searchParams);
    const router = useRouter();
    const currentPath = usePathname();

    const { handleSubmit, register } = useForm({
        defaultValues: {
            search: setUrl.get('search'),
            category: setUrl.get('category[in]'),
            sort: setUrl.get('sort'),
            'price[gte]': setUrl.get('price[gte]'),
            'price[lte]': setUrl.get('price[lte]')
        }
    });

    const [isPending, startTransition] = useTransition();


    function myHandleSubit(data: FilterType | FieldValues) {


        data.price.gte ? setUrl.set('price[gte]', data.price.gte) : setUrl.delete('price[gte]')
        data.price.lte ? setUrl.set('price[lte]', data.price.lte) : setUrl.delete('price[lte]')
        data.sort != 'nothing' && data.sort ? setUrl.set('sort', data.sort) : setUrl.delete('sort')
        data.category != 'all' && data.category ? setUrl.set('category[in]', data.category) : setUrl.delete('category[in]')
        data.search ? setUrl.set('search', data.search) : setUrl.delete('search')
        startTransition(() => {
            router.push(`${currentPath}?${setUrl.toString()}`, { scroll: false });
        });
    }



    return (

        <>
            {/* Filtration from lg screens to en */}

            <form className='  grid-cols-10 gap-3 mb-5 hidden lg:grid' onSubmit={handleSubmit(myHandleSubit)}>
                <div className='md:col-span-10 lg:col-span-3 '>
                    <label htmlFor="search" className='block mb-2 text-lg text-[#1F2B4C]'>Search</label>
                    <input type="text" id="#search" placeholder='Search Product' className='w-full rounded-lg' {...register('search')} />
                </div>
                <div className='md:col-span-5 lg:col-span-2 '>
                    <label htmlFor="category" className='block mb-2 text-lg text-[#1F2B4C]'>Category</label>
                    <select id='#category' className='w-full rounded-lg' {...register('category')}>
                        <option value="all">All</option>
                        {allCatagories?.map((category) => { return <option key={category._id} value={category._id}>{category.name}</option> })}
                    </select>
                </div>
                <div className='md:col-span-5 lg:col-span-2 '>
                    <label htmlFor="sort" className='block mb-2 text-lg text-[#1F2B4C]'>Sort By</label>
                    <select id='#sort' className='w-full rounded-lg' {...register('sort')}>
                        <option value="nothing">Nothing</option>
                        <option value="price">Price:Low to High</option>
                        <option value="-price" >Price:High to Low</option>
                    </select>
                </div>
                <div className='md:col-span-10 lg:col-span-3 '>
                    <label htmlFor="range" className='block mb-2 text-lg text-[#1F2B4C]'>Price Range</label>
                    <div className='flex  gap-1 '>
                        <input type="text" id="#range" placeholder='Min Price' className=' rounded-lg w-full' {...register('price[gte]')} />
                        <input type="text" placeholder='Max Price' className=' rounded-lg w-full' {...register('price[lte]')} />
                        <button type='submit' disabled={isPending} className='w-fit bg-[#102051] px-3 text-white rounded-lg cursor-pointer border-2 hover:border-[#102051] hover:bg-white hover:text-[#102051] duration-200 min-w-[80px] flex justify-center items-center'>
                            {isPending ? <i className="fa fa-spinner fa-spin text-xl"></i> : 'Apply'}
                        </button>
                    </div>
                </div>
            </form>


            {/* Filtration from sm screens to md */}

            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild className='w-full py-5 lg:hidden'>
                    <Button variant="outline" disabled={isPending} className='mb-8 bg-[#102051] px-3 text-white rounded-lg cursor-pointer border-2 hover:border-[#102051] hover:bg-white hover:text-[#102051]  duration-200 text-xl'>
                        {isPending ? <i className="fa fa-spinner fa-spin text-xl"></i> : 'Filters'}</Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className=" w-90  p-5 z-10 " align="center" >
                    <form onSubmit={handleSubmit(myHandleSubit)} className='w-full container'>
                        <div className='pb-2'>
                            <input type="text" id="#search" placeholder='Search Product' className='w-full rounded-lg ' {...register('search')} />
                        </div>
                        <DropdownMenuSeparator />
                        <div className=' pb-2'>
                            <label htmlFor="category" className='block mb-2 text-lg text-[#1F2B4C]'>Category</label>
                            <select id='#category' className='w-full rounded-lg' {...register('category')}>
                                <option value="all" >All</option>
                                {allCatagories?.map((category) => { return <option key={category._id} value={category._id}>{category.name}</option> })}
                            </select>
                        </div>
                        <DropdownMenuSeparator />
                        <div className=' pb-2'>
                            <label htmlFor="sort" className='block mb-2 text-lg text-[#1F2B4C]'>Sort By</label>
                            <select id='#sort' className='w-full rounded-lg' {...register('sort')}>
                                <option value="nothing" >Nothing</option>
                                <option value="price">Price:Low to High</option>
                                <option value="-price" >Price:High to Low</option>
                            </select>
                        </div>
                        <DropdownMenuSeparator />
                        <div className=' pb-2'>
                            <label htmlFor="range" className='block mb-2 text-lg text-[#1F2B4C]'>Price Range</label>
                            <div className='flex  gap-1'>
                                <input type="text" id="#range" placeholder='Min Price' className=' rounded-lg w-full' {...register('price[gte]')} />
                                <input type="text" placeholder='Max Price' className=' rounded-lg w-full' {...register('price[lte]')} />
                            </div>
                        </div>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem className='p-0'>
                            <button type='submit' className='w-full  bg-[#102051] px-3 py-2  text-white rounded-lg cursor-pointer border-2 hover:border-[#102051] hover:bg-white hover:text-[#102051]  duration-200'>Apply</button>
                        </DropdownMenuItem>

                    </form>
                </DropdownMenuContent>


            </DropdownMenu>


        </>
    )

}
