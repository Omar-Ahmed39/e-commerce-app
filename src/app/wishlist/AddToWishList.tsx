"use client"
import React, { useState } from 'react'
import { AddItem, deleteItem } from './WishList.action'
import toast from 'react-hot-toast'


export default function AddToWishList({ itemId, isProductdetails = false, wish }: { itemId: string, isProductdetails?: boolean, wish?: boolean }) {

    const [isLoading, setisLoading] = useState(false)
    const [active, setActive] = useState(wish)
    async function handleAddToWishList() {
        setisLoading(true)
        const res = await AddItem(itemId)
        if (res) {
            setisLoading(false)
            toast.success('added to WishList')
        }
        else {
            setisLoading(false)
            toast.error('An error accurred')
        }
    }


    async function handlPressOnIcon() {
        if (wish == true) {
            const res = await deleteItem(itemId)
            if (res) {
                setActive(false)
                toast.success('Product removed successfully from wish list')
            } else {
                toast.error('An error occurred.')
            }
        } else {
            const res = await AddItem(itemId)
            if (res) {
                setActive(true)
                toast.success('added to WishList')
            }
            else {
                toast.error('An error accurred')
            }
        }
    }

    return (
        <>
            {isProductdetails ? <button onClick={handleAddToWishList} className='w-full p-2 rounded-lg cursor-pointer text-xl font-semibold border-2  border-black hover:bg-black hover:text-white duration-300'>{isLoading ? <i className="fa fa-spinner fa-spin text-2xl text-black" ></i> : 'Add to Wishlist'}</button> : <i onClick={handlPressOnIcon} className={`fa fa-heart text-2xl cursor-pointer duration-200 ${active ? 'text-red-600' : 'text-[#88411b]'} `}></i>}
        </>
    )
}
