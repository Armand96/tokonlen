import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.js'
import { store } from './redux/store.js'
import 'remixicon/fonts/remixicon.css'

const container = document.getElementById('root')
if (container) {
	const root = createRoot(container)
	root.render(
		<Provider store={store}>
			<BrowserRouter basename={'/admin'}>
				<App />
			</BrowserRouter>
		</Provider>
	)
}
