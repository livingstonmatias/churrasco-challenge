import ProductRepository from '../infrastructure/repositories/product'

const getAllProducts = async ()=>{
    try {
        const products = await ProductRepository.getProducts()
        return products
    } catch (error) {
        return null
    }
}

export default getAllProducts