import { Outlet, useLocation } from "react-router"; // Importe o useLocation
import { Header } from "./Header";
import { Navigation } from "./Navigation";

export function AppLayout() {
    const location = useLocation();

    // Define quais rotas não devem exibir a navegação
    const isConfirmPage = location.pathname === "/confirm";

    return (
        <div className="w-screen h-screen bg-gray-400 flex flex-col items-center text-gray-100">
            <main className="w-full md:w-auto">
                <Header />
                {!isConfirmPage && <Navigation />}
                <Outlet />
            </main>
        </div>
    );
}