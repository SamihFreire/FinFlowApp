// Instalamos o axios que é uma biblioteca essencial para consumir APIs
import axios from "axios"

export const api = axios.create({
    baseURL: "https://localhost:7200"
});