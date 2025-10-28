"use server"
import { getUserToken } from "_/Utils/Utils"
import { CartItemType } from "../cart/CartItemsType";

export async function getAddedProduct(): Promise<CartItemType | null> {
    const userToken = await getUserToken()

    if (userToken) {
        const res = await fetch('https://ecommerce.routemisr.com/api/v1/cart', {
            headers: {
                token: userToken as string
            },
            cache: "force-cache",
            next: { tags: ['cart'] }
        })
        const final = await res.json();
        return final
    }
    return null
}


