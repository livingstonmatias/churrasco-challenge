import { Product } from '../../domain/product'
import { ProductRepository } from '../../domain/product.repository'
import httpClient from '../httpClient'

const repository:ProductRepository = {
    getProducts(){
        return httpClient
            .get<Product[]>('/products')
            .then(({ data:products })=> products.map(product=> new Product(product)))
    },
    addProduct(product){
        const { _id, ...productWithoutId } = product
        return httpClient
            .post('/addproduct', productWithoutId)
            .then(response=> response.data)
    }
}

export default repository
