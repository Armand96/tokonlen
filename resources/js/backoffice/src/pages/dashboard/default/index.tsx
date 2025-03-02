// components
import Statistics from './components/Statistics'
import RevenueChart from './components/RevenueChart'
import TotalSalesChart from './components/TotalSalesChart'
import TopSellingProducts from './components/TopSellingProducts'
import RevenueByLocation from './components/RevenueByLocation'
import { PageBreadcrumb } from '../../../components'
// dummy data
import { products } from './data'
import React from 'react'

const DefaultDashboard = () => {
	return (
		<>
			<PageBreadcrumb title="Dashboard" subName="Menu" />
			{/* <Statistics /> */}

		
		</>
	)
}

export default DefaultDashboard
