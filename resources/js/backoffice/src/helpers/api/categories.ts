import { APICore } from "./apiCore";

const api = new APICore()

function PostCategories(body: any, update: any = "") {
    return api.createWithFile(`api/admin/category${update && `/${update}`}`, body)
}

function GetCategories(params:any = "") {
    const baseUrl = `api/admin/category${params}`
    return api.get(baseUrl).then((res) => res.data)
}



export { PostCategories, GetCategories }
