import AuthRepository from '../infrastructure/repositories/auth'
import { TokenNotFoundExeption } from '../domain/exeptions/tokenNotFound.exeption'

const login = async (username:string, password:string)=>{
    try {
        const { token } = await AuthRepository.login(username,password)
        if(!token){
            throw new TokenNotFoundExeption()
        }
        return token
    } catch (error) {
        if(error instanceof TokenNotFoundExeption){
            console.error(TokenNotFoundExeption)
        }
    }
}

export default login