export type CategoryItemProps = {
    id: number,
    title: string,
    description: string,
    categoryType: number
    categoryTypeDescription?: string
}

type Props = React.ComponentProps<"a"> & {
    data: CategoryItemProps
}

export function CategoryItem({ data }: Props) {
    const isExpense = data.categoryTypeDescription === "Despesa";

    return (
        <div
            className="flex items-start gap-4 hover:bg-green-100/5 rounded-md p-3 transition-colors border-b border-gray-400/20"
        >
            <div className={`mt-1 shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gray-400 font-bold ${isExpense ? "text-red-500" : "text-green-100"}`}>
                {isExpense ? "D" : "C"}
            </div>

            <div className="flex flex-1 flex-col gap-1 min-w-0">
                <div className="flex items-center justify-between">
                    <strong className="text-sm text-gray-100 uppercase truncate">{data.title}</strong>
                </div>

                <span className="text-xxs text-gray-200 uppercase tracking-wider">
                    {data.categoryTypeDescription}
                </span>

                <p className="text-xs text-gray-200 leading-relaxed mt-1 text-justify italic opacity-80 line-clamp-3 hover:line-clamp-none transition-all">
                    {data.description}
                </p>
            </div>
        </div>
    );
}