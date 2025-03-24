 interface Categories {
    id: number
    name: string
    slug: string
    parent_id: any
    image: string
    image_thumb: any
    is_active: number
    sub_cat: SubCat[]
  }
  
   interface SubCat {
    id: number
    name: string
    slug: string
    parent_id: number
    image: string
    image_thumb: any
    is_active: number
  }
  

interface PostCategoriesTypes {
    name: string;
    image_file: any;
    parent_id: number;
    is_active: number;
}

export { Categories, PostCategoriesTypes }
