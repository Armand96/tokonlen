import React from 'react'
import StatisticsWidget from './StatisticsWidget'

const Statistics = () => {
	return (
		<div className="grid 2xl:grid-cols-5 md:grid-cols-3 gap-6 mb-6">
			<div className="2xl:col-span-1 col-span-3">
			<StatisticsWidget icon='ri-line-chart-fill' variant={'bg-success'} cardTitle={'Pengunjung hari ini'} title={'Pengunjung hari ini'} change={''} stats={'54,214'} dataSince={''} classname={'apex-charts'} chartSeries={[58, 42]} colors={['#47ad77', '#e3e9ee']} />
			</div>

			<div className="2xl:col-span-1 md:col-span-0 ">
				<StatisticsWidget icon='ri-line-chart-fill' variant={'bg-success'} cardTitle={'Kemarin'} title={'Pengunjung hari ini'} change={''} stats={'54,214'} dataSince={''} classname={'apex-charts'} chartSeries={[58, 42]} colors={['#47ad77', '#e3e9ee']} />
			</div>

			<div className="2xl:col-span-1 lg:col-span-0 ">
				<StatisticsWidget icon='ri-line-chart-fill' variant={'bg-success'} cardTitle={'minggu lalu'} title={'Pengunjung hari ini'} change={''} stats={'54,214'} dataSince={''} classname={'apex-charts'} chartSeries={[58, 42]} colors={['#47ad77', '#e3e9ee']} />
			</div>

			<div className="2xl:col-span-1 lg:col-span-0 ">
				<StatisticsWidget icon='ri-line-chart-fill' variant={'bg-success'} cardTitle={'Bulan ini'} title={'Pengunjung hari ini'} change={''} stats={'54,214'} dataSince={''} classname={'apex-charts'} chartSeries={[58, 42]} colors={['#47ad77', '#e3e9ee']} />
			</div>
			

			{/* <div className="2xl:col-span-1 lg:col-span-2">
				<StatisticsWidget variant={'bg-danger'} cardTitle={'Orders'} title={'Number of Orders'} change={'1.08%'} stats={'7,543'} dataSince={'Since last month'} classname={'apex-charts'} chartSeries={[34, 66]} colors={['#3e60d5', '#e3e9ee']} />
			</div> */}

			{/* <div className="2xl:col-span-1 lg:col-span-2">
				<StatisticsWidget variant={'bg-danger'} cardTitle={'Revenue'} title={'Average Revenue'} change={'7.00%'} stats={'$9,254'} dataSince={'Since last month'} classname={'apex-charts'} chartSeries={[87, 13]} colors={['#16a7e9', '#e3e9ee']} />
			</div>

			<div className="2xl:col-span-1 lg:col-span-3">
				<StatisticsWidget variant={'bg-success'} cardTitle={'Growth'} title={'Growth'} change={'4.87%'} stats={'+ 20.6%'} dataSince={'Since last month'} classname={'apex-charts'} chartSeries={[45, 55]} colors={['#ffc35a', '#e3e9ee']} />
			</div> */}

		
		</div>
	)
}

export default Statistics
