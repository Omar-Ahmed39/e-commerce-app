"use server"

import { getUserToken } from "_/Utils/Utils"
import { revalidatePath, revalidateTag } from "next/cache"


export async function AddProduct(productId: string) {
    const userToken = await getUserToken()

    if (userToken) {

        const res = await fetch('https://ecommerce.routemisr.com/api/v1/cart', {
            method: 'POST',
            body: JSON.stringify({productId}),
            headers: {
                'Content-Type': 'application/json',
                token: userToken as string
            }
        })

        const final = await res.json()
        
        if (final.status === 'success') {
            revalidateTag('cart')
            return final.numOfCartItems
        }
        return null

    }


}