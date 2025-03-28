import { APICore } from './apiCore'

const api = new APICore()

// account
function login(params: { email: string; password: string }) {
	const baseUrl = 'api/login'
	return api.create(`${baseUrl}`, params)
}

function logout() {
	const baseUrl = '/logout'
	return api.create(`${baseUrl}`, {})
}



export { login, logout,  }
