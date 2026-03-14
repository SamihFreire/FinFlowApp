type CategoriesApiResponse ={
    categories : Category[]
}

type Category = {
    id: number,
    description: string,
    categoryType: number
}