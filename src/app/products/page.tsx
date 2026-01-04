import React from 'react'
import AllProducts from '../_Component/AllProducts/AllProducts'
import { FilterType } from '../_Component/AllProducts/Filtration';

export const metadata = {
    title: 'Products',
};
export default async function page({ searchParams }: { searchParams: Promise<{
    'price[gte]': string,
    'price[lte]': string,
    sort: string,
    category: string,
    search:string
}> }) {

    const params = await searchParams;

    return (
        <>
            <AllProducts params={params} />
        </>
    )
}
