import { APICore } from "./apiCore";

const api = new APICore()

function postLinkType(body: any, update: any = "") {
    return api.createWithFile(`api/admin/link_type${update && `/${update}`}`, body)
}

function getLinkType(params:any = "") {
    const baseUrl = `api/admin/link_type${params}`
    return api.get(baseUrl).then((res) => res.data)
}

export { postLinkType, getLinkType }
