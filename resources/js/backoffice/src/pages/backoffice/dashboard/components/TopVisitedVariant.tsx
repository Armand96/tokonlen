import React from 'react'
import { HelperFunction } from '../../../../helpers/HelpersFunction'


const TopVisitedVariant = ({ data }: any) => {
	return (
		<div className="card">
			<div className="card-header flex justify-between items-center">
				<h4 className="card-title">Summary</h4>
			</div>
			<div className="relative overflow-x-auto">
				<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
					<thead className="bg-light/40 border-b border-gray-100 dark:bg-light/5 dark:border-b-gray-700">
						<tr>
							<th className="py-1.5 px-4">Produk</th>
							<th className="py-1.5 px-4">Variant</th>
							<th className="py-1.5 px-4">Size</th>
							<th className="py-1.5 px-4">Harga Tambahan</th>
							<th className="py-1.5 px-4">Jumlah view</th>
						</tr>
					</thead>
					<tbody>
						{(data?.topTenVisitedVariant || []).map((product, idx) => (
							<tr key={idx}>
								<td className="p-4 text-wrap">{product?.product?.name}</td>
								<td className="p-4">{product?.variant}</td>
								<td className="p-4">{product?.size}</td>
								<td className="p-4">{HelperFunction.FormatToRupiah(product?.additional_price)}</td>
								<td className="p-4">{product?.links_visitors_count}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

		</div>
	)
}

export default TopVisitedVariant
