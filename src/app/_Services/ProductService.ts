import { ProductType } from "../_Interfaces/Product.Typs";

export async function getAllProducts(params: {
    'price[gte]': string,
    'price[lte]': string,
    sort: string,
    category: string,
    search:string
}): Promise<ProductType[] | null> {


    const { search, ...finalParams } = params

    const URLParams = new URLSearchParams(finalParams);



    try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products?` + `${URLParams}`, {

        });
        const finalRes = await res.json();
        return finalRes.data

    }
    catch (error) {
        console.log(error);
        return null;
    }
}


export async function getProductDetails(id: string): Promise<ProductType | null> {
    try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
        const finalRes = await res.json()
        return finalRes.data

    } catch (error) {
        return null
    }
}