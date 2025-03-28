import { APICore } from "./apiCore";

const api = new APICore()

function postBanner(body: any, update: any = "") {
    return api.createWithFile(`api/admin/banner${update && `/${update}`}`, body)
}


function getBanner(params:any = "") {
    const baseUrl = `api/admin/banner${params}`
    return api.get(baseUrl).then((res) => res.data)
}

export { postBanner, getBanner }
