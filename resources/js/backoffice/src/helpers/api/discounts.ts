import { APICore } from "./apiCore";

const api = new APICore()

function PostDiscount(body: any, update: any = "") {
    return api.create(`api/admin/discount${update && `/${update}`}`, body)
}


function GetDiscount(params:any = "") {
    const baseUrl = `api/admin/discount${params}`
    return api.get(baseUrl).then((res) => res.data)
}

export { PostDiscount, GetDiscount }
