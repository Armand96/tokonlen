import { useEffect, Suspense } from 'react'
import { useSelector } from 'react-redux'

// redux
import { RootState } from '../redux/store'

// utils
import { changeHTMLAttribute } from '../utils'
import React from 'react'

interface DefaultLayoutProps {
	layout: {
		layoutType: string
		layoutWidth: string
		sideBarTheme: string
		sideBarType: string
	}
	children?: any
}

const DefaultLayout = (props: DefaultLayoutProps) => {
	const { layoutTheme } = useSelector((state: RootState) => ({
		layoutTheme: state.Layout.layoutTheme,
	}))

	useEffect(() => {
		changeHTMLAttribute('data-mode', layoutTheme)
	}, [layoutTheme])

	// get the child view which we would like to render
	const children = props['children'] || null

	return (
		<>			
			{/* <Suspense fallback={<LoadingScreen />}>{children}</Suspense> */}
		</>
	)
}

export default DefaultLayout
