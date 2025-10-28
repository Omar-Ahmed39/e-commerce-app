"use server"
import { getUserToken } from "_/Utils/Utils"
import { revalidatePath } from "next/cache"

export async function deleteItem(itemId: string) {
    const userToken = await getUserToken()

    if (userToken) {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${itemId}`, {
            method: 'DELETE',
            headers: {
                token: userToken as string
            }
        })
        const final = await res.json()
        if (final.status === 'success') {
            revalidatePath('/cart');
            return final.numOfCartItems
        }
        return null
    }
}


export async function deleteAllItems() {
    const userToken = await getUserToken()
    if (userToken) {
        const res = await fetch('https://ecommerce.routemisr.com/api/v1/cart', {
            method: 'DELETE',
            headers: {
                token: userToken as string
            }
        })
        const final = await res.json();
        if (final.message === 'success') {
            revalidatePath('/cart');
            return true
        }
        return false
    }
}

export async function changeCount(itemId: string, count: number) {
    const userToken = await getUserToken()

    if (userToken) {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${itemId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                token: userToken as string

            },
            body: JSON.stringify({ count })
        })
        const final = await res.json()
        if (final.status === 'success') {
            revalidatePath('/cart');
            return final.numOfCartItems
        }
        return null
    }
}