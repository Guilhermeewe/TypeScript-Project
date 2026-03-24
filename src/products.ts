export interface ProductProps {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

export class Product {
    private constructor(readonly props: ProductProps) {

    }
}