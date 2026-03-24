import { ProductRepository } from "../../../repositories/product/product.repositories";
import { BuyOutputDto, ListOutputDto, ProductService, SellOutputDto } from "../product.service";

export class ProductServiceImplementation implements ProductService {

    private constructor(readonly repository: ProductRepository) { }

    public static build(repository: ProductRepository) {
        return new ProductServiceImplementation(repository)
    }

    public async sell(id: string, amount: number): Promise<SellOutputDto> {
        const aProduct = await this.repository.find(id)

        if (!aProduct) {
            throw new Error("O produto " + id + " não foi encontrado")
        }

        aProduct.sell(amount)

        await this.repository.update(aProduct)

        const output: SellOutputDto = {
            id: aProduct.Id,
            balance: aProduct.quantity
        }

        return output
    }
    public async buy(id: string, amount: number): Promise<BuyOutputDto> {
        const aProduct = await this.repository.find(id)

        if (!aProduct) {
            throw new Error("O produto " + id + " não foi encontrado")
        }

        aProduct.increaseStock(amount)

        await this.repository.update(aProduct)

        const output: BuyOutputDto = {
            id: aProduct.Id,
            balance: aProduct.quantity
        }

        return output
    }
    public async list(): Promise<ListOutputDto> {
        const aProduct = await this.repository.list()

        const products = aProduct.map((p) => {
            return {
                id: p.Id,
                name: p.name,
                price: p.price,
                balance: p.quantity
            }
        })

        const output: ListOutputDto = {
            products,
        }

        return output
    }
}