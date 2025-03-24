 interface Discount {
    id: number
    product_id: number
    variant_id: number
    discount_percentage: string
    discount_amount: string
    start_date: string
    end_date: string
    product: Product
    variant: any,
    is_active: number
  }
  
   interface Product {
    id: number
    name: string
    slug: string
    description: string
    price: string
    stock: number
    brand: string
    release_date: string
    category_id: number
    visited: number
    is_active: number
    final_price: number
    discount_price: number
    discount: Discount
  }

  interface PostDiscountTypes {
    "product_id"?: number,
    "variant_id"?: number, 
    "discount_percentage"?: string,
    "discount_amount"?: number,
    "start_date": string,
    "end_date": string,
    "_method": string
  }
  
  

export { Discount, PostDiscountTypes }
