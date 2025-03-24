import { useEffect, Suspense } from 'react'
import { useSelector } from 'react-redux'

// redux
import { RootState } from '../redux/store'

// utils
import { changeHTMLAttribute } from '../utils'
import React from 'react'

const loading = () => <div />

const DefaultLayout = ({children}) => {
	const { layoutTheme } = useSelector((state: RootState) => ({
		layoutTheme: state.Layout.layoutTheme,
	}))

	useEffect(() => {
		changeHTMLAttribute('data-mode', layoutTheme)
	}, [layoutTheme])


	return (
		<>			
			<Suspense fallback={loading()}>{children}</Suspense>
		</>
	)
}

export default DefaultLayout
