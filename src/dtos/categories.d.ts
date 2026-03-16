type CategoriesApiResponse ={
    categories : Category[]
}

type Category = {
    id: number,
    title: string,
    description: string,
    categoryType: number
    categoryTypeDescription?: string
}