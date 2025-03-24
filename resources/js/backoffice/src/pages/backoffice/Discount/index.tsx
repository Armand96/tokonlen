import React, { useEffect, useState } from 'react';
import { PageBreadcrumb } from '../../../components';
import TablePaginate from '../../../components/Table/tablePaginate';
import LoadingScreen from '../../../components/Loading/loading';
import Swal from 'sweetalert2';
import { Size } from '../../../dto/size';
import { ModalAdd } from './ModalAdd';
import { GetDiscount, PostDiscount } from '../../../helpers/api/discounts';
import { Discount } from '../../../dto/discounts';
import { HelperFunction } from '../../../helpers/HelpersFunction';
import dayjs from 'dayjs';
import Select from 'react-select';
import { GetProducts } from '../../../helpers/api/Products';

const Index = () => {
	const [modal, setModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState<any>();
	const [isCreate, setIsCreate] = useState<boolean>(false);
	const [dataPaginate, setDataPaginate] = useState<any>(null);
	const [productsOptions, setProductsOptions] = useState<any[]>()
	const [selectedProducts, setSelectedProducts] = useState<any>()

	const fetchData = async (page = 1, products = selectedProducts?.label) => {
		setLoading(true);

		const params = {
			page,
			product_name: products
		}

		const queryString = new URLSearchParams(
			JSON.parse(JSON.stringify(params))
		).toString();

		const res: Discount[] = await GetDiscount(`?${queryString}`);
		setDataPaginate(res);
		setLoading(false);
	};

	useEffect(() => {
		Promise.all([
			fetchData(),
			GetProducts(`?data_per_page=99999&is_active=1`)
		]).then((res) => {
			setProductsOptions([...HelperFunction.FormatOptions(res[1]?.data, 'name', 'id'), { label: 'Semua', value: '' }])
		})
	}, []);

	const postData = async () => {
		setLoading(true);
		const data = { ...formData, _method: formData.id ? 'PUT' : 'POST' };
		await PostDiscount(data, formData?.id);
		await fetchData();
		setModal(false);
		Swal.fire('Success', formData.id ? 'Edit Diskon berhasil' : 'Input Diskon berhasil', 'success');
	};

	const columns = [
		{ name: 'Produk', row: (cell: Discount) => <div>{cell.product?.name || cell?.variant?.product?.name}</div> },
		{ name: 'Variant', row: (cell: Discount) => <div>{cell?.variant?.variant} - {cell?.variant?.size}</div> },
		{ name: 'Persen', row: (cell: Discount) => <div>{cell.discount_percentage}</div> },
		{ name: 'Harga', row: (cell: Discount) => <div>{HelperFunction.FormatToRupiah(cell.discount_amount)}</div> },
		{ name: 'Tanggal Awal', row: (cell: Discount) => <div>{dayjs(cell.start_date).format("DD MMM YYYY")}</div> },
		{ name: 'Tanggal Akhir', row: (cell: Discount) => <div>{dayjs(cell.end_date).format("DD MMM YYYY")}</div> },
		{ name: 'Status', row: (cell: Discount) => <div>{dayjs().isAfter(cell.end_date, 'milliseconds') ? 'Expired' : 'Active'}</div> },
		{
			name: 'Action', row: (cell: Discount) => (
				<button className='btn bg-primary text-white' onClick={() => { setModal(true); setFormData(cell); setIsCreate(false); }}>
					Edit
				</button>
				
			)
		}
	];

	const handleSearch = (v) => {
		setLoading(true);
		setSelectedProducts(v)
		fetchData(0, v.label == "Semua" ? undefined : v.label);
	}

	return (
		<>
			{loading && <LoadingScreen />}
			{modal && (
				<ModalAdd reloadData={fetchData} setLoading={setLoading} isCreate={isCreate} toggleModal={() => setModal(false)} isOpen={modal} handlePost={postData} detailData={formData} />
			)}
			<PageBreadcrumb title='discount' subName='Backoffice' />
			<div className='bg-white p-4 '>
				<div className='flex justify-between'>
					<h3 className='text-2xl font-bold'>Discounts</h3>
					<button className='btn bg-primary mb-4 text-white' onClick={() => { setModal(true); setIsCreate(true); setFormData({ name: '', format_size: '', is_active: 1 }); }}>Tambah Data</button>
				</div>
				<h3 className='text-lg mb-2'>Search</h3>
				<div className="mb-3 bg-gray-50 px-4 py-6 flex ">
					<div className="flex flex-col flex-1">
						<label className="mb-2" htmlFor="choices-text-remove-button">
							Product
						</label>
						<Select className="select2 z-5" options={productsOptions} onChange={(v) => handleSearch(v)} value={selectedProducts} />
					</div>
				</div>

				<p className='mb-2'>Total Data : {dataPaginate?.total}</p>
				<TablePaginate totalPage={dataPaginate?.last_page || 0} data={dataPaginate?.data} columns={columns} onPageChange={(val) => fetchData(val.selected + 1)} />
			</div>
		</>
	);
};

export default Index;
