import { LayoutDashboard, Tags, Users } from "lucide-react";
import { NavLink } from "react-router";

export function Navigation() {
    // Ajustamos o padding lateral (px) e o gap para serem menores em mobile
    const baseStyle = "flex items-center justify-center gap-2 px-4 md:px-8 py-3 font-semibold transition-all relative whitespace-nowrap";
    const activeStyle = "text-green-100 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-green-100 after:rounded-t-full";
    const inactiveStyle = "text-gray-200 hover:text-gray-100";

    return (
        <nav className="flex items-center justify-start md:justify-center gap-2 md:gap-4 bg-gray-500 rounded-t-2xl px-4 md:px-6 border-b border-gray-400 overflow-x-auto no-scrollbar">
            <NavLink to="/" className={({ isActive }) => `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`}>
                <LayoutDashboard size={18} /> 
                <span className="hidden sm:inline">Transações</span>
            </NavLink>
            
            <NavLink to="/category" className={({ isActive }) => `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`}>
                <Tags size={18} /> 
                <span className="hidden sm:inline">Categorias</span>
            </NavLink>
            
            <NavLink to="/user" className={({ isActive }) => `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`}>
                <Users size={18} /> 
                <span className="hidden sm:inline">Usuários</span>
            </NavLink>
        </nav>
    );
}