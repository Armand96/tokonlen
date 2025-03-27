import ReactApexCharts from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
import React from 'react'

interface StatisticsWidgetProps {
	variant: string
	cardTitle: string
	title: string
	change: string
	stats: string
	dataSince: string
	classname: string
	chartSeries: number[]
	colors: string[]
	icon: string
	
}

const StatisticsWidget = ({ variant, cardTitle, title, stats, icon }: StatisticsWidgetProps) => {

	return (
		<div className="card">
			<div className="p-6">
				<div className="flex justify-between">
					<div className="grow overflow-hidden">
						<h5 className="text-base/3 text-gray-400 font-normal mt-0" title={title}>
							{cardTitle}
						</h5>
						<h3 className="text-2xl my-6">{stats}</h3>
						{/* <p className="text-gray-400 truncate">
							<span className={`${variant} rounded-md text-xs px-1.5 py-0.5 text-white me-1`}>
								<i className="ri-arrow-up-line"></i> {change}
							</span>
							&nbsp;
							<span>{dataSince}</span>
						</p> */}
					</div>
					<div className="shrink">
							<i className={` text-5xl  ${icon}`}></i>
					</div>
				</div>
			</div>
		</div>
	)
}

export default StatisticsWidget
