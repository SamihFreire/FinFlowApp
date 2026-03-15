type TransactionApiResponse = {
    id: number,
    title: string,
    description: string,
    amount: number,
    transactionType: number,
    categoryID: number,
    user: User
}

type TransactionsPaginationAPIResponse = {
    transactions : TransactionApiResponse[],
    totalCount: number,
    currentPage: number,
    pageSize: number,
    totalPages: number,
}