import { Product } from "./product"

export interface ProductRepository {
    getProducts(): Promise<Product[]>
    addProduct(data:Product): Promise<Product>
}