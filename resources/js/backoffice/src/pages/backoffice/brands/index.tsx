// components

import React, { useState } from 'react'
import { PageBreadcrumb } from '../../../components'
import { Grid, _ } from 'gridjs-react'
import { ModalLayout } from '../../../components/HeadlessUI'

const Index = () => {
	const [modal, setModal] = useState(false)
	const columns = [
		{
			name: "Brand"
		},
		{
			name: 'Status',
			formatter: (cell) => _(<div>{cell === 1 ? "Active" : "Non Active"}</div>)
		},
		{
			name: 'Action',
			formatter: (cell) => _(<div>
				<button type="button" className={` btn bg-primary text-white`} onClick={() => setModal(true)}>
					Edit
				</button>
			</div>)
		}
	]

	const data = [
		['zahira', 1,],
		['zahira', 0,],
		['zahira', 1,]

	]

	return (
		<>
			<ModalLayout showModal={modal} toggleModal={() => setModal(!modal)}  placement=" justify-center items-start">
				<div className="duration-300 ease-in-out transition-all m-3 sm:mx-auto flex flex-col bg-white shadow-sm rounded dark:bg-gray-800">
					<div className="flex justify-between items-center py-2.5 px-4 border-b dark:border-gray-700">
						<h3 className="font-medium text-gray-600 dark:text-white text-lg">Edit Data</h3>
						<button className="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 dark:text-gray-200" type="button">
							<i className="ri-close-line text-2xl" onClick={() => setModal(false)} />
						</button>
					</div>
					<div className={`max-h-80 p-4 overflow-y-auto`}>
						<h5 className="mb-2.5 text-base">Text in a modal</h5>
						<p className="text-sm mb-4">Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
						<hr className="my-5 dark:border-gray-700" />
						<h5 className="mb-2.5 text-base">Overflowing text to show scroll behavior</h5>
						<p className="text-sm mb-4">Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
						<p className="text-sm mb-4">Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
						<p className="text-sm">Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
					</div>
					<div className="flex justify-end items-center gap-2 p-4 border-t dark:border-slate-700">
						<button className="btn bg-light text-gray-800 transition-all" onClick={() => setModal(false)} >
							Close
						</button>
						<button className="btn bg-primary text-white">
							Save Changes
						</button>
					</div>
				</div>
			</ModalLayout>
			<PageBreadcrumb title="Brands" subName="Backoffice" />
			<div className="dark:bg-gray-800 bg-white px-4 py-4">
				<Grid
					columns={columns} data={data} pagination={{ limit: 1, page: 0, }} />

			</div>
		</>
	)
}

export default Index
