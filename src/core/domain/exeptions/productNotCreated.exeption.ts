export class ProductNotCreatedExeption extends Error {
    constructor(){
        super('Error al intentar agregar el producto.')
    }
}