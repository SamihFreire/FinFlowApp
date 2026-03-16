import { useState, useEffect } from "react";
import { AxiosError } from "axios";
import { api } from "../services/api";
import { formatCurrency } from "../utils/formatCurrency"; // Assumindo que existe

import { ListLayout } from "../components/ListLayout";
import { UserItem, type UserItemProps } from "../components/UsersItem";

const PER_PAGE = 3;

export function UserList() {
    const [name, setName] = useState("");
    const [page, setPage] = useState(1);
    const [totalOfPage, setTotalOfPage] = useState(0);
    const [users, setUsers] = useState<UserItemProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Estado para os totalizadores
    const [summary, setSummary] = useState({
        totalRevenue: 0,
        totalExpense: 0,
        balance: 0
    });

    async function fetchUsers() {
        try {
            setIsLoading(true);
            const response = await api.get<UsersApiResponse>('/User/pagination-lista-usuarios', {
                params: {
                    searchTitle: name.trim() || undefined,
                    page: page,
                    pageSize: PER_PAGE
                }
            });

            const apiData = response.data;
            setUsers(apiData?.users ?? []);
            setTotalOfPage(apiData?.totalPages ?? 0);

            //Atualiza os totais baseados na pesquisa atual
            setSummary({
                totalRevenue: apiData?.totalRevenue ?? 0,
                totalExpense: apiData?.totalExpense ?? 0,
                balance: apiData?.balance ?? 0
            });

        } catch (error) {
            console.error(error);
            setUsers([]);
            if (error instanceof AxiosError) {
                alert(error.response?.data.errorMessages?.[0] || "Erro ao carregar usuários");
            }
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, [page]);

    const TotalsFooter = (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-gray-400">
            <div className="bg-gray-400/30 p-4 rounded-xl border border-gray-400/50">
                <p className="text-gray-200 text-xs font-bold uppercase tracking-wider">Receitas</p>
                <h3 className="text-green-100 text-xl font-mono">{formatCurrency(summary.totalRevenue)}</h3>
            </div>
            <div className="bg-gray-400/30 p-4 rounded-xl border border-gray-400/50">
                <p className="text-gray-200 text-xs font-bold uppercase tracking-wider">Despesas</p>
                <h3 className="text-red-500 text-xl font-mono">{formatCurrency(summary.totalExpense)}</h3>
            </div>
            <div className={`p-4 rounded-xl border ${summary.balance >= 0 ? 'bg-green-100/10 border-green-100/20' : 'bg-red-500/10 border-red-500/20'}`}>
                <p className="text-gray-200 text-xs font-bold uppercase tracking-wider">Saldo Geral</p>
                <h3 className={`text-xl font-mono ${summary.balance >= 0 ? 'text-green-100' : 'text-red-500'}`}>
                    {formatCurrency(summary.balance)}
                </h3>
            </div>
        </div>
    );

    return (
        <ListLayout
            title="Usuários e Saldos"
            onSearch={setName}
            onSubmitSearch={(e) => { e.preventDefault(); setPage(1); fetchUsers(); }}
            isEmpty={!isLoading && users.length === 0}
            footer={!isLoading && users.length > 0 && TotalsFooter}
            pagination={{
                current: page,
                total: totalOfPage,
                onNext: () => setPage(p => p + 1),
                onPrevious: () => setPage(p => p - 1)
            }}
        >
            {isLoading ? (
                <div className="flex justify-center py-10 text-gray-200 animate-pulse">Carregando dados financeiros...</div>
            ) : (
                users.map((user) => <UserItem key={user.id} data={user} />)
            )}
        </ListLayout>
    );
}