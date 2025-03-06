 interface Products {
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
    category: Category
    image: Image
    discount: Discount
  }
  
interface Category {
    id: number
    name: string
    slug: string
    parent_id: any
    image: string
    image_thumb: any
    is_active: number
  }
  
interface Image {
    id: number
    product_id: number
    image: string
    image_thumb: string
    default: number
  }
  
interface Discount {
    id: number
    product_id: number
    variant_id: number
    discount_percentage: string
    discount_amount: string
    start_date: string
    end_date: string
  }
  

interface WebSettingsCreateUpdate {
    name: string;
    value: string;
    is_active: boolean;
}

export { Products, WebSettingsCreateUpdate }
