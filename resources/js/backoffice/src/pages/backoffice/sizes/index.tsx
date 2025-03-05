import React, { useEffect, useState } from 'react'
import { FormInput, PageBreadcrumb } from '../../../components'
import { ModalLayout } from '../../../components/HeadlessUI'
import TablePaginate from '../../../components/Table/tablePaginate'
import LoadingScreen from '../../../components/Loading/loading'
import { GetSize, PostSize } from '../../../helpers'
import Swal from 'sweetalert2'

const Index = () => {
	const [modal, setModal] = useState(false)
	const [loading, setLoading] = useState(false)
	const [formData, setFormData] = useState<any>()
	const [isCreate, setIsCreate] = useState<boolean>(false)
	const [dataPaginate, setDataPaginate] = useState<any>()
	const columns = [
		{
			name: "Ukuran",
			row: (cell) => <div>{cell.name}</div>
		},
		{
			name: "Ukuran",
			row: (cell) => <div>{cell.format_size}</div>
		},
		{
			name: 'Status',
			row: (cell) => (<div>{cell.is_active === 1 ? "Active" : "Non Active"}</div>)
		},
		{
			name: 'Action',
			row: (cell) => (<div>
				<button type="button" className={` btn bg-primary text-white`} onClick={() => {setModal(true);setFormData(cell);setIsCreate(false)}}>
					Edit
				</button>
			</div>)
		}
	]

	useEffect(() => {
		setLoading(true)
		GetSize().then((res) => {
			setDataPaginate(res)
			setLoading(false)
		})
	},[])

	const clearFormData = () => {
		setFormData({
			name: "",
			format_size: "",
		})
	}


	const postData = () => {
		setLoading(true)

		let data: any = {
			"name": formData?.name,
			"format_size": formData?.format_size,
			"is_active": formData?.is_active,

		}
	
		if(formData.id){
		data._method = "PUT"
		}
		
		PostSize(data,formData?.id).then((res) => {
			GetSize().then((res) => {
				if(formData.id){
					setDataPaginate(res)
					setLoading(false)
					setIsCreate(false)
					setFormData(false)
					setModal(false)
					Swal.fire('success', 'input size berhasil', 'success')
				}else{
					setDataPaginate(res)
					setLoading(false)
					setIsCreate(false)
					setModal(false)
					Swal.fire('success', 'input size berhasil', 'success')
				}
			})
		})
	}


	const onChangePage = (val: any) => {
		GetSize(`?page=${val?.current_page}`).then((res) => {
			console.log("response",res)
			setDataPaginate(res)
			setLoading(false)
		})
	}

	return (
		<>
			{
				loading && <LoadingScreen />
			}
			{
				modal && 
					<ModalLayout showModal={modal} toggleModal={() => {setModal(!modal);clearFormData()}} placement=" justify-center items-start">
					<div className="duration-300 ease-in-out transition-all m-3 sm:mx-auto flex flex-col bg-white shadow-sm rounded dark:bg-gray-800">
						<div className="flex justify-between items-center py-2.5 px-4 border-b dark:border-gray-700">
							<h3 className="font-medium text-gray-600 dark:text-white text-lg">{isCreate ? 'tambah data' : `Edit Data`}</h3>
							<button className="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 dark:text-gray-200" type="button">
								<i className="ri-close-line text-2xl" onClick={() => {setModal(false);clearFormData()}} />
							</button>
						</div>
	
						<div className={`max-h-80 p-4 overflow-y-auto w-[70vw]`}>
							<FormInput label="Size" labelClassName="mb-2" type="text" name="text" value={formData?.name} onChange={(v) => setFormData({...formData, name: v.target.value})} className="form-input" containerClass="mb-3" />
							<FormInput label="Format" labelClassName="mb-2" type="text" name="text" value={formData?.format_size} onChange={(v) => setFormData({...formData, format_size: v.target.value})} className="form-input" containerClass="mb-3" />
							<div className={`mt-5 ${isCreate ? "hidden" : ""} `}>
								<h6 className="text-sm mb-2">Status</h6>
								<div className="flex gap-5">
									<div className="flex items-center">
										<input type="checkbox" className="form-checkbox rounded text-primary" name="status" checked={formData?.is_active === 1 ? true : false}  onChange={(v) => setFormData({...formData, is_active: v.target.checked ? 1 : 0})}  />
										<label className="ms-1.5" htmlFor="status">
											Aktif
										</label>
										
									</div>
								</div>
							</div>
						</div>
	
						<div className="flex justify-end items-center gap-2 p-4 border-t dark:border-slate-700">
							<button className="btn bg-light text-gray-800 transition-all" onClick={() => setModal(false)} >
								Close
							</button>
							<button className="btn bg-primary text-white" onClick={postData}>
								Submit
							</button>
						</div>
					</div>
				</ModalLayout>
				
			}
			<PageBreadcrumb title="Brands" subName="Backoffice" />
			<div className="dark:bg-gray-800 bg-white px-4 py-4">
				<div className="flex items-center justify-between">
					<h3 className="card-title text-2xl ">Brands</h3>
					<button className='btn bg-primary text-white mb-6' onClick={() => {setModal(true);setIsCreate(true);clearFormData()}}>Tambah Data</button>
				</div>
				<TablePaginate totalPage={dataPaginate?.last_page || 0} data={dataPaginate?.data} columns={columns} onPageChange={onChangePage}/>
			</div>
		</>
	)
}

export default Index
