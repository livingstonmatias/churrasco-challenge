
type NullablePartial<T> = Partial<{
    [K in keyof T]: T[K] | null
}>

export class Product {
    _id: string
    SKU: string
    code: number
    name: string
    description: string
    pictures: Array<string>
    price: number
    currency: string
    __v: string

    constructor(props: NullablePartial<Product>){
        this._id= props._id || ''
        this.SKU= props.SKU || ''
        this.code= props.code || 0
        this.name= props.name || ''
        this.description= props.description || ''
        this.pictures= props.pictures || []
        this.price= props.price || 0
        this.currency= props.currency || ''
        this.__v= props.__v || ''
    }
}

