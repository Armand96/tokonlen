import { APICore } from './apiCore'

const api = new APICore()

function PostSize(body: any, update: any = "") {
	return api.create(`api/admin/size${update && `/${update}`}`, body)
}


function GetSize(params: any = "") {
	const baseUrl = `api/admin/size${params}`
	return api.get(baseUrl).then((res) => res.data)
}

export {  PostSize, GetSize }
