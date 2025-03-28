import { APICore } from "./apiCore";

const api = new APICore()

function PostVariants(body: any, update: any = "") {
    return api.create(`api/admin/variant${update && `/${update}`}`, body)
}

function PostVariantsBulks(body: any, update: any = "") {
    return api.create(`api/admin/variant_bulk_insert${update && `/${update}`}`, body)
}


function GetVariants(params:any = "") {
    const baseUrl = `api/admin/variant${params}`
    return api.get(baseUrl).then((res) => res.data)
}

function PostVariantsImage(body: any, update: any = "") {
    return api.createWithFile(`api/admin/variant_image_single${update && `/${update}`}`, body)
}

function PostDeleteVariantsImage(body: any, update: any = "") {
    return api.create(`api/admin/mass_delete_variant_image${update && `/${update}`}`, body)
}

export { PostVariants, GetVariants, PostVariantsImage, PostVariantsBulks, PostDeleteVariantsImage }
