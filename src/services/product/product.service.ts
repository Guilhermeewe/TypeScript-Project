export interface SellOutputDto {
    id: string
    balance: number
}

export interface BuyOutputDto {
    id: string
    balance: number
}

export interface ListOutputDto {
    products: {
        id: string
        name: string
        price: number
        balance: number
    }[]
}

export interface ProductService {
    sell(id: string, amount: number): Promise<SellOutputDto>
    buy(id: string, amount: number): Promise<BuyOutputDto>
    list(id: string): Promise<ListOutputDto>
}