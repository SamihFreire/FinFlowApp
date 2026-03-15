import { useState, useEffect } from "react"
import { AxiosError } from "axios";
import { useNavigate } from "react-router"

import { api } from "../services/api";

import searchSvg from "../assets/search.svg"
import { formatCurrency } from "../utils/formatCurrency";

import { Input } from "../components/Input"
import { Button } from "../components/Button";
import { Pagination } from "../components/Pagination";
import { TransactionItem,  type TransactionItemProps } from "../components/TransactionItem";
import { TRANSACTION_TYPES } from "../utils/transactionType";

const PER_PAGE = 5;

export function Dashboard() {
    const [name, setName] = useState("");
    const [page, setPage] = useState(1);
    const [totalOfPage, setTotalOfPage] = useState(0);
    const [transactions, setTransactions] = useState<TransactionItemProps[]>([]);

    const navigate = useNavigate();

    async function fetchTransactions() {
        try {

            const currentCategories = await getCategories() || [];

            const response = await api.get<TransactionsPaginationAPIResponse>('/Transactions', {
            params: {
                searchTitle: name.trim() || undefined, 
                page: page,
                pageSize: PER_PAGE
            }
        });

            setTransactions(
                response.data.transactions.map((transaction) => ({
                    id: transaction.id,
                    user: transaction.user.name,
                    title: transaction.title,
                    description: transaction.description,
                    amount: formatCurrency(transaction.amount),
                    transactionType: TRANSACTION_TYPES[transaction.transactionType as unknown as keyof typeof TRANSACTION_TYPES] ,
                    category: currentCategories.find(cat => cat.id == transaction.categoryID)?.title!
                }))
            )

            setTotalOfPage(response.data.totalPages);

        } catch (error) {
            console.log(error)
            
            if(error instanceof AxiosError) {
                const apiMessages = error.response?.data.errorMessages;

                const messageToShow = Array.isArray(apiMessages) 
                    ? apiMessages.join('\n') 
                    : apiMessages;

                return alert(messageToShow || "Erro inesperado do servidor");
            }

            alert("Não foi possível carregar");
        }
        
    }

    async function getCategories() {
        try {
            const response = await api.get<CategoriesApiResponse>(`/Category`);

            const fetchedCategories = response.data.categories.map((category) => ({
                id: category.id,
                title: category.title,
                description: category.description,
                categoryType: category.categoryType
            }));

            return fetchedCategories;

        } catch (error) {
            console.log(error)

            if(error instanceof AxiosError) {
                const apiMessages = error.response?.data.errorMessages;

                const messageToShow = Array.isArray(apiMessages) 
                    ? apiMessages.join('\n') 
                    : apiMessages;

                return alert(messageToShow || "Erro inesperado do servidor");
            }

            alert("Não foi possível carregar");
        }
    }

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();

        fetchTransactions();
    }

    function hadlePagination(action: "next" | "previous") {
        setPage((prevPage) => {
            if(action === "next" && prevPage < totalOfPage){
                return prevPage + 1;
            }

            if(action === "previous" && prevPage > 1){
                return prevPage - 1;
            }

            return prevPage;
        })
    }

    useEffect(() => {
        fetchTransactions()
    }, [page])


    return (
        <div className="bg-gray-500 rounded-xl p-10 md:min-w-[768px]">
            {/* Cabeçalho com Título e Botão */}
            <div className="flex items-center justify-between">
                <h1 className="text-gray-100 font-bold text-xl">Transações</h1>
                
                <Button 
                    onClick={() => navigate("/transaction-register")} 
                    className="bg-green-100 text-gray-500 hover:bg-green-100/80 px-4 py-2 rounded-md font-semibold text-sm transition-colors"
                >
                    Nova Transação
                </Button>
            </div>

            <form onSubmit={onSubmit} className="flex flex-1 items-center justify-between pb-6 border-b-[1px] border-b-gray-400 md:flex-row gap-2 mt-6">
                <Input placeholder="Pesquisar pelo título da transação" onChange={(e) => setName(e.target.value)}/>

                <Button type="submit" variant="icon">
                    <img src={searchSvg} alt="Ícone de pesquisar" className="w-5" />
                </Button>
            </form>

            <div className="my-6 flex flex-col gap-4 max-h-[323px] overflow-y-scroll">
                    {transactions.map((item) => (
                        <TransactionItem key={item.id} data={item} href={`/refund/${item.id}`} />
                    ))}
                </div>

                <Pagination current={page} total={totalOfPage} 
                onNext={() => hadlePagination("next")} onPrevious={() => hadlePagination("previous")} />
        </div>
    )
}