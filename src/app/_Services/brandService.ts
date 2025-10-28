import { BrandType } from "../_Interfaces/Product.Typs";

export async function getAllBrands(): Promise<BrandType[] | null> {
    try {
        const res = await fetch('https://ecommerce.routemisr.com/api/v1/brands');
        const finalRes = await res.json();
        return finalRes.data
    }
    catch (error) {
        console.log('final', error);
        return null;
    }
}