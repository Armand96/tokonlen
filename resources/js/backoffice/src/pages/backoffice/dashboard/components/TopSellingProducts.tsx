import React from 'react'
import { Link } from 'react-router-dom'

interface TopSellingProductsProps {
	products: {
		product: string
		price: number
		orders: number
		quantity: string
		seller: string
	}[]
}

const TopSellingProducts = ({ products }: TopSellingProductsProps) => {
	return (
		<div className="card">
			<div className="card-header flex justify-between items-center">
				<h4 className="card-title">Produk Paling Banyak dikunjungi</h4>
				<Link to="#" className="btn btn-sm !text-sm bg-info text-white">
					Export <i className="ri-download-line ms-1"></i>
				</Link>
			</div>
			<div className="relative overflow-x-auto">
				<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
					<thead className="bg-light/40 border-b border-gray-100 dark:bg-light/5 dark:border-b-gray-700">
						<tr>
							<th className="py-1.5 px-4">Produk</th>
							<th className="py-1.5 px-4">Kategori</th>
							<th className="py-1.5 px-4">Pengunjung</th>
						</tr>
					</thead>
					<tbody>
						{(products || []).map((product, idx) => (
							<tr key={idx}>
								<td className="p-4">{product.product}</td>
								<td className="p-4">{product.quantity}</td>
								<td className="p-4">{product.seller}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<div className="text-center">
				<Link to="/backoffice/products" className="btn text-primary underline font-bold mb-2">
					Lihat Semua
				</Link>
			</div>
		</div>
	)
}

export default TopSellingProducts
