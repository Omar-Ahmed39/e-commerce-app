"use server"

import { getUserToken } from "_/Utils/Utils"
import { PaymentType } from "./page"
import { revalidatePath } from "next/cache"

export async function checkOut(cartId: string, shippingAddress: PaymentType)  {

    const userToken = await getUserToken()
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, {
        method: "POST",
        body: JSON.stringify({ shippingAddress }),
        headers: {
            token: userToken as string,
            'Content-Type': 'application/json',
        }
    })

    const final =await res.json()
    console.log (final);
    if (final.status === 'success') {
        revalidatePath('/cart')
        return true
    }
    return false
    
}