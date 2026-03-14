import { BrowserRouter, Route } from "react-router"

import { Loading } from "../components/Loading"

// Importando os dados do contexto
import { useAuth } from "../hooks/useAuth"

import { AuthRoutes } from "./AuthRoutes"
import { ManagerRoutes } from "./ManagerRoutes"

export function Routes() {
    const { session, isLoading } = useAuth();

    if(isLoading) {
        return <Loading />
    }

    // Renderiza e decide o conteúdo baseado na session
    return (
        <BrowserRouter>
            {session?.name ? <ManagerRoutes /> : <AuthRoutes />}
        </BrowserRouter>
    )
}