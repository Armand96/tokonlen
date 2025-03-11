 interface Variants {
  id: number
  product_id: number
  variant: string
  size: string
  additional_price: string
  stock: number
  visited: number
  is_active: number
  final_price: any
  discount_price: number
  discount: any
}

interface PostVariantsTypes {
  "product_id": number,
  "variant": string,
  "size": string,
  "additional_price": number,
  "stock":number,
  "is_active": boolean
}
  

export { Variants, PostVariantsTypes }
