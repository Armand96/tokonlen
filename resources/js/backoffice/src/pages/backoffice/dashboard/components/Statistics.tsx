import React from 'react'
import StatisticsWidget from './StatisticsWidget'

const Statistics = ({ data }: any) => {
	return (
		<div className="grid 2xl:grid-cols-6 md:grid-cols-3 grid-cols-1 gap-6 mb-6">

			<div className="2xl:col-span-2  md:col-span-0">
				<StatisticsWidget icon='ri-box-1-line' variant={'text-green-500'} cardTitle={'Total produk'} stats={data?.totalProduct}  />
			</div>

			<div className="2xl:col-span-2 md:col-span-0">
				<StatisticsWidget icon='ri-discount-percent-line' variant={'text-blue-500'} cardTitle={'Total Diskon Aktif'}  stats={data?.totalDisc}  />
			</div>

			<div className="2xl:col-span-2  md:col-span-0  ">
				<StatisticsWidget icon=' ri-sparkling-line' variant={'text-yellow-500'} cardTitle={'Total variant'}  stats={data?.totalVariant}  />
			</div>

		</div>
	)
}

export default Statistics
