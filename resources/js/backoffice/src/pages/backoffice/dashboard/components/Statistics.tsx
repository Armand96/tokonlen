import React from 'react'
import StatisticsWidget from './StatisticsWidget'
import { HelperFunction } from '../../../../helpers/HelpersFunction'

const Statistics = ({ data }: any) => {
	return (
		<div className="grid 2xl:grid-cols-6 md:grid-cols-3 grid-cols-1 gap-6 mb-6">

			<div className="2xl:col-span-2  md:col-span-0">
				<StatisticsWidget icon='ri-box-1-line' variant={'text-green-500'} cardTitle={'Total produk'} stats={data?.totalProduct}  />
			</div>

			<div className="2xl:col-span-2 md:col-span-0">
				<StatisticsWidget icon='ri-dashboard-line' variant={'text-blue-500'} cardTitle={'Total Kategori'}  stats={data?.totalCategory}  />
			</div>

			<div className="2xl:col-span-2  md:col-span-0  ">
				<StatisticsWidget icon=' ri-sparkling-line' variant={'text-yellow-500'} cardTitle={'Total variant'}  stats={data?.totalProductVariantDisc}  />
			</div>

			{/* <div className="2xl:col-span-6 lg:col-span-3  md:col-span-0 ">
				<StatisticsWidget icon='ri-percent-line' variant={'text-blue-500'} cardTitle={'Total produk dan variant yang diskon'}  stats={'54,214'}  />
			</div>

			
			<div className="2xl:col-span-2 md:col-span-0 ">
				<StatisticsWidget icon=' ri-price-tag-3-line' variant={'text-green-500'} cardTitle={' Diskon Produk Aktif'}  stats={'54,214'}  />
			</div> */}

			{/* <div className="2xl:col-span-3 lg:col-span-1 md:col-span-0">
				<StatisticsWidget icon='ri-percent-line' variant={'text-red-500'} cardTitle={'  Diskon Produk non aktif'}  stats={'54,214'}  />
			</div> */}

			{/* <div className="2xl:col-span-2 md:col-span-0">
				<StatisticsWidget icon='ri-price-tag-3-line' variant={'text-yellow-500'} cardTitle={' Diskon Variant Aktif'}  stats={'54,214'}  />
			</div>

			<div className="2xl:col-span-2 md:col-span-0">
				<StatisticsWidget icon='ri-price-tag-3-line' variant={'text-red-500'} cardTitle={' Diskon non aktif'}  stats={'54,214'}  />
			</div> */}

			{/* <div className="2xl:col-span-3 lg:col-span-1 md:col-span-0">
				<StatisticsWidget icon='ri-percent-line' variant={'text-red-500'} cardTitle={' Diskon Variant non aktif'}  stats={'54,214'}  />
			</div> */}

			{/* <div className="2xl:col-span-6 lg:col-span-3 col-span-0">
				<StatisticsWidget icon='ri-external-link-line' variant={'text-green-400'} cardTitle={'Jumlah tipe Link'}  stats={'54,214'}  />
			</div>

			<div className="2xl:col-span-2 md:col-span-0 ">
				<StatisticsWidget icon='ri-links-line' variant={'text-cyan-400'} cardTitle={'Total Klik tokopedia'}  stats={'54,214'}  />
			</div>

			<div className="2xl:col-span-2 md:col-span-0 ">
				<StatisticsWidget icon='ri-links-line' variant={'text-green-400'} cardTitle={'Total Klik tokopedia'}  stats={'54,214'}  />
			</div>


			<div className="2xl:col-span-2 md:col-span-0 ">
				<StatisticsWidget icon='ri-links-line' variant={'text-sky-400'} cardTitle={'Total Klik tokopedia'}  stats={'54,214'}  />
			</div> */}



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
