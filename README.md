# FinFlow App

## Sobre o projeto

O **FinFlow App** é uma aplicação web moderna de gerenciamento financeiro desenvolvida em **React**. Ele oferece uma interface intuitiva e responsiva para que os usuários possam monitorar suas transações, gerenciar categorias e visualizar saldos consolidados em tempo real.

O projeto foi construído focando em **User Experience (UX)**, utilizando uma interface limpa com componentes modulares e estilização avançada com **Tailwind CSS**.

### ⚙️ Backend (API)

Esta aplicação depende da **FinFlow API** para funcionar. Você pode encontrar os detalhes técnicos e o guia de instalação do backend no repositório oficial:
👉 **[FinFlow API - Repositório GitHub](https://github.com/SamihFreire/FinFlow)**

### Tecnologias e Bibliotecas

- **React + Vite**: Base do projeto para alta performance e desenvolvimento ágil.
- **Tailwind CSS**: Estilização baseada em utilitários para um design moderno e responsivo.
- **Lucide React**: Biblioteca de ícones elegantes e consistentes.
- **React Router**: Gerenciamento de rotas e navegação dinâmica.
- **Axios**: Cliente HTTP para comunicação com a API .NET.
- **Zod**: Validação de esquemas para garantir a integridade dos dados no frontend.
- **JWT (JSON Web Token)**: Gerenciamento de autenticação segura para acesso aos recursos da API.

### Features

- **Autenticação Segura**: Sistema de login utilizando tokens JWT para proteção de dados e sessões de usuário.
- **Dashboard Financeira**: Visualização clara de receitas, despesas e saldo líquido através de totalizadores inteligentes.
- **Navegação Responsiva**: Menu superior que se adapta a diferentes tamanhos de tela (Mobile-first).
- **Busca e Paginação**: Listagem de usuários e transações com filtros de pesquisa e controle de páginas.
- **Fluxo de Confirmação**: Feedback visual imediato após a realização de cadastros.
- **Clean UI**: Design focado em produtividade, utilizando uma paleta de cores sóbria e tipografia legível.

### Construído com

![badge-react]
![badge-vite]
![badge-tailwind]
![badge-typescript]

## Getting Started

Siga os passos abaixo para rodar a aplicação em sua máquina local.

### Requisitos

* Node.js (versão 18 ou superior)
* Gerenciador de pacotes (NPM ou Yarn)
* **FinFlow API** rodando localmente (ou em um servidor acessível)

### Instalação e Execução

1. **Clone o repositório**:
   ```sh
   git clone [https://github.com/SamihFreire/FinFlowApp.git](https://github.com/SamihFreire/FinFlowApp.git)
   ```
2. **Instale as dependências**:
   ```sh
   npm install
   # ou
   yarn install
   ```
3. **Configure a URL da API**:
   Verifique o arquivo src/services/api.ts (ou seu arquivo de configuração) e certifique-se de que a baseURL aponta para onde sua API .NET está rodando:
    ```sh
    const api = axios.create({
      baseURL: "https://localhost:7200" // Porta padrão da sua API .NET
    });
    ```
4. **Inicie o servidor de desenvolvimento**:
   ```sh
   npm run dev
   ```


[badge-react]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[badge-vite]: https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white
[badge-tailwind]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[badge-typescript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
