"use server"
import { getUserToken } from "_/Utils/Utils"
import { revalidatePath } from "next/cache"
import { ProductType } from "../_Interfaces/Product.Typs"

export async function AddItem(productId: string) {
    const userToken = await getUserToken()

    if (userToken) {

        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                token: userToken as string
            },
            body: JSON.stringify({ productId }),
            cache:'force-cache'
        })
        const final = await res.json()

        
        if (final.status === 'success') {
            revalidatePath('/wishlist');
            return final.data
        }
        return false
    }
}

export async function getWishListItems() : Promise<ProductType[]|null>{
    const userToken = await getUserToken()

    if (userToken) {
        const res = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist', {
            headers: {
                token: userToken as string
            },
            cache: "force-cache",
            next:{tags:['wishlist']}
        })
        const final = await res.json();        
        console.log('nnnnnnn' , final);

        return final.data
    }
    return null
}




export async function deleteItem(itemId:string) {
    const userToken = await getUserToken()
    if (userToken) {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${itemId}`, {
            method: 'DELETE',
            headers: {
                token: userToken as string
            }
        })
        const final = await res.json();
        
        if (final.status === 'success') {
            revalidatePath('/wishlist');
            return final.message
        }
        return false
    }
}

