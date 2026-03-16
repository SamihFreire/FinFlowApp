import { useState, useEffect, use } from "react"
import { z, ZodError } from "zod"
import { AxiosError } from "axios"
import { useNavigate, useParams } from "react-router"

import { api } from "../services/api"

import { Input } from "../components/Input"
import { Select } from "../components/Select"
import { Button } from "../components/Button"
import { TextArea } from "../components/TextArea";
import returnSvg from "../assets/return.svg"
import { categoryTypeOptions } from "../utils/categoriesType"

const categorySchema = z.object({
    title: z.string().nonempty({ message: "Preencha o título da categoria" }),

    description: z.string().min(3, { message: "Informe uma descrição clara para sua transação" }).max(400, { message: "A descrição da transação ultrapassou o tamanho máximo de 400 caracteres." }),

    categoryType: z.coerce.number({ message: "Informe um valor válido" })
        .min(0, { message: "Valor inválido" })
        .max(2, { message: "Valor inválido" }),
})

export function Categories() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [categoryType, setCategoryType] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const params = useParams<{ id: string }>()

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (params.id) {
            return navigate(-1);
        }

        try {
            setIsLoading(true);

            const data = categorySchema.parse({
                title,
                description,
                categoryType: Number(categoryType)
            })

            await api.post("/Category", {
                ...data
            });

            // Criamos um state para sinalizar para a navegação que ela esta indo por um submit
            navigate("/confirm", { state: { fromSubmit: true } });
        } catch (error) {
            console.log(error);

            // Erro vindo da validação do Zod
            // Verificamos se o erro é uma instacia de Zod
            if (error instanceof ZodError) {
                return alert(error.issues[0].message)
            }

            // Retornando o erro recebido via API
            if (error instanceof AxiosError) {
                const apiMessages = error.response?.data.errorMessages;
                const messageToShow = Array.isArray(apiMessages) ? apiMessages.join('\n') : apiMessages;
                alert(messageToShow || "Erro inesperado do servidor");
            }

            alert("Não foi possível cadastrar!");
        } finally {
            setIsLoading(false); // Desativando carregamento
        }

    }

    return (
        <form onSubmit={onSubmit} className="bg-gray-500 w-full rounded-b-xl flex flex-col p-10 gap-6 lg:min-w-lg">
            <header className="relative">
                <button
                    type="button"
                    onClick={() => navigate("/")}

                    className="flex items-center gap-2 text-gray-200 hover:text-green-100 transition-colors mb-4 text-sm font-medium cursor-pointer"
                >
                    <img src={returnSvg} alt="Ícone de voltar" />
                    Voltar
                </button>

                <h1 className="text-xl font-bold text-gray-100">
                    Cadastro de categoria
                </h1>

                <p className="text-sm text-gray-200 mt-2 mb-4">
                    Dados da categoria para classificação das transações.
                </p>
            </header>

            <Input required legend="Título da categoria" value={title} onChange={(e) => setTitle(e.target.value.toUpperCase())} disabled={!!params.id} />

            <TextArea required legend="Descrição" value={description} onChange={(e) => setDescription(e.target.value.toUpperCase())} disabled={!!params.id} />

            <Select required legend="Tipo" value={categoryType} onChange={(e) => setCategoryType(e.target.value)} disabled={!!params.id}>
                {
                    categoryTypeOptions.map((categoryType) => (
                        <option key={categoryType.value} value={categoryType.value}>
                            {categoryType.label}
                        </option>
                    ))
                }
            </Select>

            <Button type="submit" isLoading={isLoading}>Cadastrar</Button>
        </form>
    )
}