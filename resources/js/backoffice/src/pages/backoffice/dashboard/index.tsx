import React, { useEffect, useState } from 'react'
import { PageBreadcrumb } from '../../../components'
import dayjs from 'dayjs'
import Statistics from './components/Statistics'
import { GetDashboard } from '../../../helpers/api/Dashboard'
import LoadingScreen from '../../../components/Loading/loading'
import TopVisitedProduct from './components/TopVisitedProduct'
import TopVisitedVariant from './components/TopVisitedVariant'
import TopVisitedProductMonthly from './components/TopVisitedProductMonthly'
import TopVisitedVariantMonthly from './components/TopVisitedVariantMonthly'

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
    const [loading, setLoading] = useState(false);
    const [dashboardData, setDashboardData] = useState<any>([])

    useEffect(() => {
        setLoading(true)
        GetDashboard().then((res) => {
            setDashboardData(res)
            setLoading(false)
        })
    }, []);


    return (
        <>
            {loading && <LoadingScreen />}
            <PageBreadcrumb title="Dashboard" subName="Backoffice" />
            <p className='text-2xl text-gray-800 font-semibold text-center'>{getGreeting()}, Admin</p>
            <div className="mt-5">
                <Statistics data={dashboardData} />
            </div>
            <div className="mt-5">
                <p className="text-gray-800 text-xl font-semibold mb-4">10 Produk Terbanyak Dilihat</p>
                <div className="mb-5">
                <TopVisitedProduct data={dashboardData} />
                </div>
                <TopVisitedProductMonthly data={dashboardData} />
            </div>
            <div className="mt-5">
                <p className="text-gray-800 text-xl font-semibold mb-4">10 Variant Terbanyak Dilihat</p>
                <div className="mb-5">
                <TopVisitedVariant data={dashboardData} />
                </div>
                <TopVisitedVariantMonthly data={dashboardData} />
            </div>
        </>
    )
}

export default Dashboard
