import { useActionState } from "react"
import { z, ZodError } from "zod"
import { AxiosError } from "axios"

import { api } from "../services/api"

import { Input } from "../components/Input"
import { Button } from "../components/Button"

const signInScheme = z.object({
    email: z.email({ message: "E-mail inválido" }),
    password: z.string().trim().min(1, { message: "Informe a senha" }),
})

export function SignIn() {
    // Utilizaremos o useActionState no lugar do useState
    // const [isLoading, setIsLoading] = useState(false);

    // Utilizando useActionState
    // const [state, action, isPending] = useActionState(actionFunction, initialState)
    // state: o valor de estado retornado pela ação (pode ser um objeto com mensagens, erros etc.)

    // action: função que você usa para executar a ação.

    // isPending: booleano que indica se a ação está sendo executada no momento.

    // actionFunction: a função (geralmente uma server action) que será chamada.

    // initialState: valor inicial do estado.

    const [ state, formAction, isLoading ] = useActionState(signIn, null);

    async function signIn(prevState: any, formData: FormData) {
        // Novo recurso do react 19 onde podemos recuperar os dados do formulario sem criar estados
        // Para isso na função definimos o parametro como FormData
        // No input definimos o name="email"
        // Atraves do formData.get("email") recuperamos o valor do input
        
        try {
            const data = signInScheme.parse({
                email: formData.get("email"),
                password: formData.get("password"),
            })

            // Realizando o login na API e obtendo token JWT
            const response = await api.post("/Login", data) 
            
        } catch (error) {
            console.log(error);

            if(error instanceof ZodError) {
                return { message: error.issues[0].message };
            }

            if(error instanceof AxiosError) {
                return { message: error.response?.data.message }
            }

            return { message: "Não foi possível entrar!" };
        }
    }

    return (
        <form action={formAction} className="w-full flex flex-col gap-4"> 
            <Input name="email" required legend="E-mail" type="email" placeholder="seu@email.com"/>

            <Input name="password" required legend="Senha" type="password" placeholder="123456"
            />

            {/* Retornamos o erro encontrado com o Zod caso exista. 
                O state guarda o retorno mandado.
                Quando o usuário realiza o sigIn e acontece um erro de validação do Zod retornamos para o state a menssagem de validação do Zod
            */}
            <p className="text-sm text-red-600 text-center my-4 font-medium">
                {state?.message}
            </p>

            <Button type="submit" isLoading={isLoading}>Entrar</Button>

            <a 
                href="/signup"
                className="text-sm font-semibold text-gray-100 mt-10 mb-4
                text-center hover:text-green-800 transition ease-linear"
            >
                Criar conta
            </a>
        </form>
    )
}