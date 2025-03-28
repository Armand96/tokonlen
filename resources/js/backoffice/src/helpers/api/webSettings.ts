import { APICore } from "./apiCore";

const api = new APICore()

function postWebSettings(body: any, update: any = "") {
    return api.create(`api/admin/web_setting${update && `/${update}`}`, body)
}

function postWebSettingsWithFile(body: any, update: any = "") {
    return api.createWithFile(`api/admin/web_setting_with_upload${update && `/${update}`}`, body)
}


function getWebSettings(params:any = "") {
    const baseUrl = `api/admin/web_setting${params}`
    return api.get(baseUrl).then((res) => res.data)
}

export { postWebSettings, getWebSettings, postWebSettingsWithFile }
