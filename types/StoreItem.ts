export type StoreItem = {
    id: number;
    name: string;
    shortDesc: string;
    longDesc?: string;
    imag: string;
    minQty: number;
    currQty: number;
    price: number;
    discount?: number; 
    category: string; 
    isFavorite?: boolean; // Add this field to manage favorite status
  };
  
  export type SortableKeys = keyof Pick<StoreItem, 'price' | 'name'>;
  
