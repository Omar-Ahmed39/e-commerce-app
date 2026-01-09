export type ProductType = {
    images:string[],
    title: string,
    price: number,
    imageCover: string,
    category: CategoryType,
    brand: BrandType,
    ratingsAverage: number,
    id: string,
    priceAfterDiscount?: number,
    description: string,
    quantity: number
}
export type MetaDataType ={
    currentPage : number,
    numberOfPages:number,
    nextPage? : number,
    prevPage? : number
}

export type CategoryType = {
    _id: string,
    name: string,
    image: string
}

export type BrandType = {
    _id: string,
    name: string,
    image: string
}