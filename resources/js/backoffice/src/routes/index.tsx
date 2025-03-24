import React from 'react'
import { Navigate, Route, RouteProps } from 'react-router-dom'

// components
import PrivateRoute from './PrivateRoute'

// auth
const Login = React.lazy(() => import('../pages/auth/Login'))
const Logout = React.lazy(() => import('../pages/auth/Logout'))

// error
const Error404 = React.lazy(() => import('../pages/error/Error404'))
const Error500 = React.lazy(() => import('../pages/error/Error500'))

// 
const Dashboard = React.lazy(() => import('../pages/backoffice/dashboard'))
const Produk = React.lazy(() => import('../pages/backoffice/Products'))
const Categories = React.lazy(() => import('../pages/backoffice/categories'))
const Variants = React.lazy(() => import('../pages/backoffice/variants'))
const Discounts = React.lazy(() => import('../pages/backoffice/Discount'))
const Size = React.lazy(() => import('../pages/backoffice/sizes'))
const LinkType = React.lazy(() => import('../pages/backoffice/linkTypes'))
const Banners = React.lazy(() => import('../pages/backoffice/banners'))
const WebSettings = React.lazy(() => import('../pages/backoffice/webSettings'))



export interface RoutesProps {
	path: RouteProps['path']
	name?: string
	element?: RouteProps['element']
	route?: any
	exact?: boolean
	icon?: string
	header?: string
	roles?: string[]
	children?: RoutesProps[]
}

// dashboards
const BackOffice: RoutesProps = {
	path: '/dashboard',
	name: 'Dashboard',
	icon: 'home',
	header: 'Navigation',
	children: [
		{
			path: '/',
			name: 'Root',
			element: <Navigate to="/backoffice/dashboard" />,
			route: PrivateRoute,
		},
		{
			path: '/backoffice/dashboard',
			name: 'Dashboard',
			element: <Dashboard />,
			route: PrivateRoute,
		},
		{
			path: '/backoffice/products',
			name: 'products',
			element: <Produk />,
			route: PrivateRoute,
		},
		{
			path: '/backoffice/categories',
			name: 'categories',
			element: <Categories />,
			route: PrivateRoute,
		},
		{
			path: '/backoffice/variants',
			name: 'Variants',
			element: <Variants />,
			route: PrivateRoute,
		},
		{
			path: '/backoffice/sizes',
			name: 'Size',
			element: <Size />,
			route: PrivateRoute,
		},
		{
			path: '/backoffice/link-types',
			name: 'link-type',
			element: <LinkType />,
			route: PrivateRoute,
		},
		{
			path: '/backoffice/discounts',
			name: 'discounts',
			element: <Discounts />,
			route: PrivateRoute,
		},
		{
			path: '/backoffice/banners',
			name: 'banners',
			element: <Banners />,
			route: PrivateRoute,
		},
		{
			path: '/backoffice/web-settings',
			name: 'websettings',
			element: <WebSettings />,
			route: PrivateRoute,
		},
	],
}



// auth
const authRoutes: RoutesProps[] = [
	{
		path: '/auth/login',
		name: 'Login',
		element: <Login />,
		route: Route,
	},
	{
		path: '/auth/logout',
		name: 'Logout',
		element: <Logout />,
		route: Route,
	},
]

// public routes
const otherPublicRoutes = [
	{
		path: '*',
		name: 'Error - 404',
		element: <Error404 />,
		route: Route,
	},
	{
		path: '/error-404',
		name: 'Error - 404',
		element: <Error404 />,
		route: Route,
	},
	{
		path: '/error-500',
		name: 'Error - 500',
		element: <Error500 />,
		route: Route,
	},
]

// flatten the list of all nested routes
const flattenRoutes = (routes: RoutesProps[]) => {
	let flatRoutes: RoutesProps[] = []

	routes = routes || []
	routes.forEach((item: RoutesProps) => {
		flatRoutes.push(item)
		if (typeof item.children !== 'undefined') {
			flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)]
		}
	})
	return flatRoutes
}

// All routes
const authProtectedRoutes = [BackOffice]
const publicRoutes = [...authRoutes, ...otherPublicRoutes]

const authProtectedFlattenRoutes = flattenRoutes([...authProtectedRoutes])
const publicProtectedFlattenRoutes = flattenRoutes([...publicRoutes])
export { publicRoutes, authProtectedRoutes, authProtectedFlattenRoutes, publicProtectedFlattenRoutes }
