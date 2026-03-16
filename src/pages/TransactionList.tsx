import { useState, useEffect } from "react";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";

import { api } from "../services/api";
import { formatCurrency } from "../utils/formatCurrency";
import { TRANSACTION_TYPES } from "../utils/transactionType";

import { ListLayout } from "../components/ListLayout";
import { TransactionItem, type TransactionItemProps } from "../components/TransactionItem";

const PER_PAGE = 5;

export function TransactionList() {
    const [name, setName] = useState("");
    const [page, setPage] = useState(1);
    const [totalOfPage, setTotalOfPage] = useState(0);
    const [transactions, setTransactions] = useState<TransactionItemProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    async function fetchTransactions() {
        try {
            setIsLoading(true);
            const currentCategories = await getCategories() || [];

            const response = await api.get<TransactionsPaginationAPIResponse>('/Transactions', {
                params: {
                    searchTitle: name.trim() || undefined,
                    page: page,
                    pageSize: PER_PAGE
                }
            });

            const apiTransactions = response.data?.transactions ?? [];

            const mappedTransactions = apiTransactions.map((transaction) => {
                const categoryFound = currentCategories.find(cat => cat.id === transaction.categoryID);

                return {
                    id: transaction.id,
                    user: transaction.user?.name ?? "Usuário N/A",
                    title: transaction.title ?? "Sem título",
                    description: transaction.description ?? "",
                    amount: formatCurrency(transaction.amount ?? 0),
                    transactionType: TRANSACTION_TYPES[transaction.transactionType as keyof typeof TRANSACTION_TYPES] ?? "N/A",
                    category: categoryFound?.title ?? "Geral"
                };
            });

            setTransactions(mappedTransactions);
            setTotalOfPage(response.data?.totalPages ?? 0);

        } catch (error) {
            console.error(error);
            setTransactions([]);

            if (error instanceof AxiosError) {
                const apiMessages = error.response?.data.errorMessages;
                const messageToShow = Array.isArray(apiMessages) ? apiMessages.join('\n') : apiMessages;
                alert(messageToShow || "Erro inesperado do servidor");
            } else {
                alert("Não foi possível carregar as transações");
            }
        } finally {
            setIsLoading(false);
        }
    }

    async function getCategories() {
        try {
            const response = await api.get<CategoriesApiResponse>(`/Category`);
            return response.data.categories ?? [];
        } catch (error) {
            console.error("Erro ao buscar categorias:", error);
            return [];
        }
    }

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setPage(1); // Volta para a primeira página na pesquisa
        fetchTransactions();
    }

    function handlePagination(action: "next" | "previous") {
        setPage((prevPage) => {
            if (action === "next" && prevPage < totalOfPage) return prevPage + 1;
            if (action === "previous" && prevPage > 1) return prevPage - 1;
            return prevPage;
        });
    }

    useEffect(() => {
        fetchTransactions();
    }, [page]);

    return (
        <ListLayout
            title="Transações"
            buttonText="Criar Transação"
            onButtonClick={() => navigate("/transaction-register")}
            onSearch={setName}
            onSubmitSearch={onSubmit}
            isEmpty={!isLoading && transactions.length === 0}
            pagination={{
                current: page,
                total: totalOfPage,
                onNext: () => handlePagination("next"),
                onPrevious: () => handlePagination("previous")
            }}
        >
            {isLoading ? (
                <div className="flex justify-center py-10 text-gray-200">Carregando...</div>
            ) : (
                transactions.map((item) => (
                    <TransactionItem key={item.id} data={item} />
                ))
            )}
        </ListLayout>
    );
}