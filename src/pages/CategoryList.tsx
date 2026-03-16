import { useState, useEffect } from "react";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";

import { api } from "../services/api";
import { CATEGORY_TYPES } from "../utils/categoriesType";

import { ListLayout } from "../components/ListLayout";
import { CategoryItem } from "../components/CategoryItem";

export function CategoryList() {
    const [name, setName] = useState("");
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    async function fetchCategories() {
        try {
            setIsLoading(true);

            const response = await api.get<CategoriesApiResponse>('/Category', {
                params: {
                    searchTitle: name.trim() || undefined
                }
            });

            const apiCategories = response.data?.categories ?? [];

            const mappedCategories = apiCategories.map((category) => ({
                id: category.id,
                title: category.title ?? "Sem título",
                description: category.description ?? "",
                categoryType: category.categoryType,
                categoryTypeDescription: CATEGORY_TYPES[category.categoryType as keyof typeof CATEGORY_TYPES] ?? "N/A"
            }));

            setCategories(mappedCategories);

        } catch (error) {
            console.error(error);
            setCategories([]);

            if (error instanceof AxiosError) {
                const apiMessages = error.response?.data.errorMessages;
                const messageToShow = Array.isArray(apiMessages) ? apiMessages.join('\n') : apiMessages;
                alert(messageToShow || "Erro inesperado do servidor");
            } else {
                alert("Não foi possível carregar as categorias");
            }
        } finally {
            setIsLoading(false);
        }
    }

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        fetchCategories();
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <ListLayout
            title="Categorias"
            buttonText="Criar Categoria"
            onButtonClick={() => navigate("/category-register")}
            onSearch={setName}
            onSubmitSearch={onSubmit}
            isEmpty={!isLoading && categories.length === 0}
        >
            {isLoading ? (
                <div className="flex justify-center py-10 text-gray-200">Carregando categorias...</div>
            ) : (
                categories.map((item) => (
                    <CategoryItem key={item.id} data={item} />
                ))
            )}
        </ListLayout>
    );
}