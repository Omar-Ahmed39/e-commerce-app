import { getAllProducts } from '_/app/_Services/ProductService';
import Link from 'next/link';
import React from 'react'
import AddToCartBtn from '../AddToCart/AddToCartBtn';
import AddToWishList from '_/app/wishlist/AddToWishList';
import Filtration, { FilterType } from './Filtration';
import { getAllCategories } from '_/app/_Services/Categoryservice';

export default async function AllProducts({params}:  {params : {
    'price[gte]': string,
    'price[lte]': string,
    sort: string,
    category: string,
    search:string
}}  ) {

    const products = await getAllProducts(params);
    const {search} = params;    
    const catagories = await getAllCategories()

    return (
        <>
            <section className='home container mx-auto p-4'>
                <h1 className='text-3xl font-semibold pb-5 text-[#1F2B4C]'>Featured Products</h1>
                <Filtration catagories={catagories} />
                <div className='grid md:grid-cols-2 xl:grid-cols-4 gap-5'>
                    {products?.map(({ imageCover, ratingsAverage, priceAfterDiscount, price, title, id }) => {  
                        return title.split(' ', 2).join(' ').toLowerCase()?.includes(`${search?.trim().toLowerCase()}`) || search == undefined ? <div key={id} className='bg-gray-50 p-5 rounded-2xl hover:shadow-[0px_0px_20px_#1F2B4C] duration-300'>
                            <Link href={`productDetails/${id}`} >
                                <figure className='relative'>
                                    <img src={imageCover} alt={title} className='w-full' />
                                    {priceAfterDiscount && <span className='bg-[#1F2B4C] text-white block w-14 text-center absolute top-2 left-2'>{Math.ceil(((price - priceAfterDiscount) / price) * 100)}%</span>}
                                </figure>
                                <h4 className='text-[#1F2B4C] font-semibold text-lg py-2'>{title.split(' ', 2).join(' ')}</h4>
                                <div className='flex justify-between pb-2'>
                                    {priceAfterDiscount ? <div>
                                        <span className='font-semibold text-[#FC7732] text-lg mr-2' >${priceAfterDiscount.toLocaleString('en-US', {
                                            style: 'decimal',
                                            currency: 'USD',
                                        })}</span>
                                        <span className='font-semibold text-gray-700 text-sm line-through '>${price.toLocaleString('en-US', {
                                            style: 'decimal',
                                            currency: 'USD',
                                        })}</span>
                                    </div> : <span className='font-semibold text-[#FC7732] text-lg '>${price.toLocaleString('en-US', {
                                        style: 'decimal',
                                        currency: 'USD',
                                    })}</span>}

                                    <span className='text-lg text-[#1F2B4C] font-semibold'><i className='fa fa-star text-yellow-400'></i>{ratingsAverage}</span>
                                </div>
                            </Link>
                            <div className='text-center gap-2 flex justify-around items-center'>
                                <AddToCartBtn prodId={id} />
                                <AddToWishList itemId={id} />
                            </div>
                        </div> :  undefined
                    })}
                </div>
            </section>
        </>
    )
}
