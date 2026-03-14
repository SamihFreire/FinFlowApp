import { useState, useEffect, use } from "react"
import { useNavigate, useParams } from "react-router"
import { NumericFormat } from 'react-number-format';
import { z, ZodError } from "zod"
import { AxiosError } from "axios"

import { api } from "../services/api"

import { Input } from "../components/Input"
import { Button } from "../components/Button"
import { Select } from "../components/Select"
import { transactionTypeOptions } from "../utils/transactionType";
import { TextArea } from "../components/TextArea";

const transactionSchema = z.object({
    title: z.string().min(3, { message: "Informe um título claro para sua transação" }).max(30,"A descrição da transação ultrapassou o tamanho máximo de 30 caracteres."),
    
    description: z.string().min(3, { message: "Informe uma descrição clara para sua transação" }).max(400, { message: "A descrição da transação ultrapassou o tamanho máximo de 400 caracteres." }),                           
    
    amount: z.coerce.number({ message: "Informe um valor válido" })
                    .positive({ message: " Informe um valor válido e superior a 0" }),  

    transactionType: z.coerce.number({ message: "Informe um valor válido" })
                             .min(0, { message: "Valor inválido" })
                             .max(1, { message: "Valor inválido" }),

    categoryID: z.coerce.number({ message: "Informe um valor válido" })
                    .positive({ message: " Informe um valor válido e superior a 0" }),
    
                    // coerce.number é um recurso do Zod que serve para forçar (ou converter) automaticamente um valor para número, mesmo que ele venha como string.
    userId: z.coerce.number({ message: "Informe um valor válido" })
                    .positive({ message: " Informe um valor válido e superior a 0" })
})


export function Transaction() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState<number | undefined>();
    const [category, setCategory] = useState("");
    const [user, setUser] = useState("");
    const [transactionType, setTransactionType] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState<Category[]>([])
    const [users, setUsers] = useState<User[]>([])

    const navigate = useNavigate();
    const params = useParams<{ id: string }>()

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();

        if(params.id) {
            return navigate(-1);
        }

        try {
            setIsLoading(true);

            const data = transactionSchema.parse({
                title,
                description,
                amount,
                transactionType: Number(transactionType),
                categoryID: Number(category),
                userId:  Number(user)
            })

            await api.post<TransactionsApiResponse>("/Transactions", {
                ...data
            });
    
            // Criamos um state para sinalizar para a navegação que ela esta indo por um submit
            navigate("/confirm", { state: { fromSubmit: true } });
        } catch (error) {
            console.log(error)

            if(error instanceof ZodError) {
                return alert(error.issues[0].message)
            }

            if(error instanceof AxiosError) {
                const apiMessages = error.response?.data.errorMessages;

                const messageToShow = Array.isArray(apiMessages) 
                    ? apiMessages.join('\n') 
                    : apiMessages;

                return alert(messageToShow || "Erro inesperado do servidor");
            }

            alert("Não foi possível realizar o cadstro")
        } finally {
            setIsLoading(false);
        }

    }

    async function getCategories() {
        try {
            const response = await api.get<CategoriesApiResponse>(`/Category`);

            setCategories(
                response.data.categories.map((category) => ({
                    id: category.id,
                    title: category.title,
                    description: category.description,
                    categoryType: category.categoryType
                }))
            )
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

    async function getUsers() {
        try {
            const response = await api.get<UsersApiResponse>(`/User/lista-usuarios`);

            setUsers(
                response.data.users.map((user) => ({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    age: user.age
                }))
            )
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

    useEffect(() => {
        getCategories();
        getUsers();
    }, []);

    return (
        <form onSubmit={onSubmit} className="bg-gray-500 w-full rounded-xl flex flex-col p-10 gap-6 lg:min-w-lg">
            <header>
                <h1 className="text-xl font-bold text-gray-100">
                    Cadastro de transação
                </h1>
                
                <p className="text-sm text-gray-200 mt-2 mb-4">
                    Dados da transação para gestão financeira.
                </p>
            </header>

            <Input required legend="Título da transação" value={title} onChange={(e) => setTitle(e.target.value.toUpperCase())} disabled={!!params.id} />
            <TextArea required legend="Descrição" value={description} onChange={(e) => setDescription(e.target.value.toUpperCase())} disabled={!!params.id} />

            <div className="flex gap-4">
                <Select required legend="Categoria" value={category} onChange={(e) => setCategory(e.target.value.toUpperCase())} disabled={!!params.id}>
                    {
                        // Percorremos a lista de categorias com suas chaves
                        // Para cada chave de categoria buscamos na lista de categorias o seu nome
                        categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.title}
                            </option>
                        ))
                    }
                </Select>

                <Select required legend="Tipo" value={transactionType} onChange={(e) => setTransactionType(e.target.value)} disabled={!!params.id}>
                    {
                        transactionTypeOptions.map((transactionType) => (
                            <option key={transactionType.value} value={transactionType.value}>
                                {transactionType.label}
                            </option>
                        ))
                    }
                </Select>

                <NumericFormat customInput={Input} 
                    legend="Valor" 
                    thousandSeparator="." 
                    decimalSeparator="," 
                    prefix="R$ " 
                    decimalScale={2} 
                    fixedDecimalScale
                    allowNegative={false}
                    placeholder="R$ 0,00"
                    onValueChange={(values) => {
                        const { floatValue } = values;
                        setAmount(floatValue); 
                    }}
                />
            </div>

            <div className="flex gap-4">
                
                <Select required legend="Responsável" value={user} onChange={(e) => setUser(e.target.value)} disabled={!!params.id}>
                        {
                            users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))
                        }
                </Select>
            </div>        
            
            <Button type="submit" isLoading={isLoading}>{params.id ? "Voltar" : "Enviar"}</Button>
        </form>
    )
}