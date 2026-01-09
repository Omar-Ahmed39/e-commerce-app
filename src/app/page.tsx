import React from 'react'

import HomeHeader from './_Component/HomeHeader/HomeHeader';
import DynamicSwiper from './_Component/MySwiper/DynamicSwiper/DynamicSwiper';
import AllProducts from './_Component/AllProducts/AllProducts';
import { FilterType } from './_Component/AllProducts/Filtration';



export default async function Home({ searchParams }: { searchParams:Promise<{
    'price[gte]': string,
    'price[lte]': string,
    sort: string,
    category: string,
    search:string
}>  }) {



  const params = await searchParams;

  

  return (
    <>
      <HomeHeader />
      <DynamicSwiper />
      <AllProducts params={params}/>
      
    </>
  )
}
