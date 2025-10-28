import { CategoryType } from "../_Interfaces/Product.Typs";

export async function getAllCategories(): Promise<CategoryType[] | null> {
    try {
        const res = await fetch('https://ecommerce.routemisr.com/api/v1/categories');
        const finalRes = await res.json();
        return finalRes.data
        
    }
    catch (error) {
        console.log('final', error);
        return null;
    }
}
