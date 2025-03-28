import { APICore } from "./apiCore";

const api = new APICore()

function GetDashboard(params:any = "") {
    const baseUrl = `api/admin/data_dashboard${params}`
    return api.get(baseUrl).then((res) => res.data)
}



export { GetDashboard }
