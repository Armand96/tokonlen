import { APICore } from "./apiCore";

const api = new APICore()

function PostProducts(body: any, update: any = "") {
    return api.create(`api/admin/product/${update}`, body)
}

function PostProductLink(body: any, update: any = "") {
    return api.create(`api/admin/product_link/${update}`, body)
}

function PostProductImages(body: any, update: any = "") {
    return api.create(`api/admin/product_link/${update}`, body)
}

function GetProducts(params:any = "") {
    const baseUrl = `api/admin/product${params}`
    return api.get(baseUrl).then((res) => res.data)
}

function GetBrands(params:any = "") {
    const baseUrl = `api/brand${params}`
    return api.get(baseUrl).then((res) => res.data)
}

export { PostProducts, GetProducts, PostProductLink, PostProductImages, GetBrands }
