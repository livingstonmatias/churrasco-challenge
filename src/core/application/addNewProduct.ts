import { Product } from '../domain/product'
import ProductRepository from '../infrastructure/repositories/product'

const addNewProduct = async (product:Product) =>{
    try {
        const products = await ProductRepository.addProduct(product)
        return products
    } catch (error) {
        return null
    }
}

export default addNewProduct