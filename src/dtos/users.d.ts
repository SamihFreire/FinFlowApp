// dtos -> abreviação para data transfer objects
// Onde guardaremos a representação dos dados que trafegam entre o Backend e o Frontend
// Criamos uma tipagem global definindo o arquivo nesse formato user.d.ts

type UserLoginApiResponse = {
    name: string,
    token: string
}

type UsersApiResponse ={
    users : User[]
}

type User = {
    id: number,
    name: string,
    email: number,
    age: number
}