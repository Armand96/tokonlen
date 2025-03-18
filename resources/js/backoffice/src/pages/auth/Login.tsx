import { useEffect } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { AppDispatch, RootState } from '../../redux/store'
import { loginUser, resetAuth } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'

// form validation
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// components
import AuthLayout from '../../components/AuthPageLayout/AuthLayout'
import AuthContainer from '../../components/AuthPageLayout/AuthContainer'
import VerticalForm from '../../components/VerticalForm'
import FormInput from '../../components/FormInput'
import React from 'react'

interface UserData {
	email: string
	password: string
}

const Login = () => {
	const dispatch = useDispatch<AppDispatch>()

	const { user, userLoggedIn, loading, error } = useSelector((state: RootState) => ({
		user: state.Auth.user,
		loading: state.Auth.loading,
		error: state.Auth.error,
		userLoggedIn: state.Auth.userLoggedIn,
	}))

	useEffect(() => {
		dispatch(resetAuth())
	}, [dispatch])

	/*
  form validation schema
  */
	const schemaResolver = yupResolver(
		yup.object().shape({
			email: yup.string().required('Masukan Username anda'),
			password: yup.string().required('Masukan Password anda'),
		})
	)

	/*
  handle form submission
  */
	const onSubmit = (formData: UserData) => {
		dispatch(loginUser(formData['email'], formData['password']))
	}

	const location = useLocation()

	// redirection back to where user got redirected from
	const redirectUrl = location?.search?.slice(6) || '/'

	return (
		<>
			{(userLoggedIn || user) && <Navigate to={redirectUrl} />}
			<AuthContainer>
				<AuthLayout authTitle="Login" helpText="Silahkan Masukan Username dan Password untuk login"  >
					{
						error && <p className='text-center px-4 py-2 my-3 rounded-md bg-red-200 text-red-600 '>Email atau Password salah</p>
					}
					<VerticalForm<UserData> onSubmit={onSubmit} resolver={schemaResolver}>
						<FormInput label="Username" type="email" name="email" className="form-input" placeholder="Masukan Username" containerClass="mb-6 space-y-2" labelClassName="font-semibold text-gray-500" required />

						<FormInput label="Password" type="password" name="password" placeholder="Masukan password" className="form-input rounded-e-none" containerClass="mb-6 space-y-2" labelClassName="font-semibold text-gray-500" labelContainerClassName="flex justify-between items-center mb-2" required>
						</FormInput>

						<div className="text-center mb-6">
							<button className="btn bg-primary text-white" type="submit" disabled={loading}>
								Log In
							</button>
						</div>
					</VerticalForm>
				</AuthLayout>
			</AuthContainer>
	
		</>
	)
}

export default Login
