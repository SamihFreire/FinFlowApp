import { Navigate, useLocation, useNavigate } from "react-router"
import okSvg from "../assets/ok.svg"
import { Button } from "../components/Button";

export function Confirm() {
    const location = useLocation();
    const navigate = useNavigate();

    // Apartir da tela de transaction quando o usuario faz submit é criado um estado fromSubmit
    // Recuperamos esse estado e caso nao exista usamos o Navigate para redirecionar para a página raiz
    if(!location.state?.fromSubmit) {
        return <Navigate to="/" />
    }

    return (
        <div className="bg-gray-500 lg:w-[512px] rounded-xl flex flex-col items-center p-10 gap-6">
            <h1 className="text-2xl font-bold text-center text-green-100">
                Cadastro realizado com sucesso!
            </h1>

            <img src={okSvg} alt="Ícone de OK" className="w-28" />

            <Button 
                onClick={() => navigate(-1)} 
                className="w-full bg-green-100 text-white hover:bg-green-200 transition ease-linear"
            >
                Novo cadastro
            </Button>

            <Button 
                onClick={() => navigate("/")}
                className="w-full bg-green-100 text-white hover:bg-green-200 transition ease-linear"
            >
                Ir para a Dashboard
            </Button>
        </div>
    )
}