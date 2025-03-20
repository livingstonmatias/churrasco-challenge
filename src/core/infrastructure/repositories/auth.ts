import { AuthRepository } from '../../domain/auth.repository'
import httpClient from '../httpClient'

const repository:AuthRepository= {
    login(username:string, password:string){
        return httpClient
            .post('/login',{ username, password})
            .then(response=> response.data)
    }
}

export default repository