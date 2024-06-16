export type CartItem = {
    id: number;
    name: string;
    shortDesc: string;
    longDesc?: string;
    imag: string;
    minQty: number;
    quantity: number;
    price: number;
    discount?: number;
    category:string;   
}

