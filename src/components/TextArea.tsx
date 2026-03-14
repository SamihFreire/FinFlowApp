type Props = React.ComponentProps<"textarea"> & {
    legend?: string,
}


export function TextArea({ legend, ...rest }: Props) {
    return (
        <fieldset className="flex flex-1 text-gray-200 focus-within:text-green-100">
            { legend && (
                <legend className="uppercase text-xxs mb-2 text-inherit">{legend}</legend>
            )}

            <textarea 
                className="w-full min-h-[120px] rounded-lg border uppercase
                border-gray-300 p-4 text-sm text-gray-100 
                bg-transparent outline-none focus:border-2 focus:border-green-100 
                placeholder-gray-300 resize-none" 
                {...rest} 
            />
        </fieldset>
    )
}