import React from 'react'
import { PageBreadcrumb } from '../../../components'
import dayjs from 'dayjs'
import Statistics from './components/Statistics'
import TopSellingProducts from './components/TopSellingProducts'
import { products } from './data'


function getGreeting(): string {
    const hour = dayjs().hour();
    
    if (hour >= 5 && hour < 12) {
        return "Selamat Pagi";
    } else if (hour >= 12 && hour < 15) {
        return "Selamat Siang";
    } else if (hour >= 15 && hour < 18) {
        return "Selamat Sore";
    } else {
        return "Selamat Malam";
    }
}

const Dashboard = () => {
	return (
		<>
			<PageBreadcrumb title="Dashboard" subName="Backoffice" />
			<p className='text-2xl text-gray-800 font-semibold text-center'>{getGreeting()}, Admin</p>
			<div className="mt-5">
			<Statistics />
			<TopSellingProducts products={products} />
			</div>
		</>
	)
}

export default Dashboard
