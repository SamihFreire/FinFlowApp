export type UserItemProps = {
    id: number,
    name: string,
    email: number,
    age: number
}

type Props = React.ComponentProps<"a"> & {
    data: UserItemProps
}

export function UserItem({ data }: Props) {

    return (
        <div
            className="flex items-start gap-4 hover:bg-green-100/5 rounded-md p-3 transition-colors border-b border-gray-400/20"
        >
            <div className="flex flex-1 flex-col gap-1 min-w-0">
                <div className="flex items-center justify-between">
                    <strong className="text-sm text-gray-100 uppercase truncate">{data.name}</strong>

                    <div className="text-sm text-gray-100 font-bold whitespace-nowrap ml-4">
                        {data.age}
                        <small className="font-normal text-gray-200 mr-1"> ANOS</small>
                    </div>
                </div>

                <span className="text-xxs text-gray-200 uppercase tracking-wider">
                    {data.email}
                </span>
            </div>
        </div>
    );
}