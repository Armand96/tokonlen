import React from 'react'

interface StatisticsWidgetProps {
	variant: string
	cardTitle: string
	stats: string
	icon: string
}

const StatisticsWidget = ({ icon, cardTitle, stats, variant}: StatisticsWidgetProps) => {

	return (
		<div className="card">
			<div className="p-6">
				<div className="flex justify-between">
					<div className="grow overflow-hidden">
						<h5 className="text-base/3 text-gray-400 font-normal mt-0" >
							{cardTitle}
						</h5>
						<h3 className="text-2xl my-6">{stats}</h3>
					</div>
					<div className="shrink">
							<i className={` text-5xl  ${icon} ${variant}`}></i>
					</div>
				</div>
			</div>
		</div>
	)
}

export default StatisticsWidget
