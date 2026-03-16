import type { ReactNode } from "react";
import { Button } from "./Button";
import { Input } from "./Input";
import { Pagination } from "./Pagination";
import searchSvg from "../assets/search.svg";

type ListLayoutProps = {
    title: string;
    buttonText?: string;
    onButtonClick?: () => void;
    onSearch: (value: string) => void;
    onSubmitSearch: (e: React.FormEvent) => void;
    isEmpty?: boolean;
    pagination?: {
        current: number;
        total: number;
        onNext: () => void;
        onPrevious: () => void;
    };
    children: ReactNode;
    footer?: ReactNode; // Novo campo para os totalizadores
};

export function ListLayout({
    title, buttonText, onButtonClick, onSearch, onSubmitSearch, isEmpty, pagination, children, footer
}: ListLayoutProps) {
    return (
        <div className="bg-gray-500 rounded-b-2xl p-4 md:p-4 w-full shadow-xl">
            <div className="flex items-center justify-between">
                <h1 className="text-gray-100 font-bold text-xl">{title}</h1>
                {buttonText && (
                    <Button onClick={onButtonClick} className="bg-green-100 text-gray-500 px-4 py-2 rounded-md font-semibold text-sm hover:bg-green-100/80 transition-colors">
                        {buttonText}
                    </Button>
                )}
            </div>

            <form onSubmit={onSubmitSearch} className="flex items-center justify-between pb-6 border-b border-gray-400 gap-2 mt-6">
                <Input placeholder={`Pesquisar ${title.toLowerCase()}...`} onChange={(e) => onSearch(e.target.value)} />
                <Button type="submit" variant="icon">
                    <img src={searchSvg} alt="Pesquisar" className="w-5" />
                </Button>
            </form>

            <div className="my-6 flex flex-col gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {isEmpty ? (
                    <div className="flex flex-col items-center justify-center py-10 opacity-50">
                        <p className="text-gray-100 italic text-sm">Nenhum registro encontrado.</p>
                    </div>
                ) : (
                    children
                )}
            </div>

            {/* Rodapé para Paginação e Totalizadores */}
            <div className="flex flex-col gap-6">
                {pagination && pagination.total > 1 && (
                    <div className="pt-4 border-t border-gray-400/30">
                        <Pagination {...pagination} />
                    </div>
                )}

                {footer && (
                    <div className="mt-2">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
}