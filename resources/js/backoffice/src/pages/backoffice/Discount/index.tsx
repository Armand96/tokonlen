import React, { useEffect, useState } from 'react';
import { FormInput, PageBreadcrumb } from '../../../components';
import { ModalLayout } from '../../../components/HeadlessUI';
import TablePaginate from '../../../components/Table/tablePaginate';
import LoadingScreen from '../../../components/Loading/loading';
import { GetSize, PostSize } from '../../../helpers';
import Swal from 'sweetalert2';
import { Size } from '../../../dto/size';
import { ModalAdd } from './ModalAdd';
import { GetDiscount, PostDiscount } from '../../../helpers/api/discounts';
import { Discount } from '../../../dto/discounts';
import { HelperFunction } from '../../../helpers/HelpersFunction';
import dayjs from 'dayjs';

const Index = () => {
	const [modal, setModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState<any>();
	const [isCreate, setIsCreate] = useState<boolean>(false);
	const [dataPaginate, setDataPaginate] = useState<any>(null);

	const fetchData = async (page = 1) => {
		setLoading(true);
		const res: Size[] = await GetDiscount(`?page=${page}`);
		setDataPaginate(res);
		setLoading(false);
	};

	useEffect(() => {
		fetchData();
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
		{ name: 'Produk', row: (cell: Discount) => <div>{cell.product?.name || cell?.variant?.product?.name }</div> },
		{ name: 'Variant', row: (cell: Discount) => <div>{cell?.variant?.variant}</div> },
		{ name: 'Persen', row: (cell: Discount) => <div>{cell.discount_percentage}</div> },
		{ name: 'Harga', row: (cell: Discount) => <div>{HelperFunction.FormatToRupiah(cell.discount_amount)}</div> },
		{ name: 'Tanggal Awal', row: (cell: Discount) => <div>{dayjs(cell.start_date).format("DD MMM YYYY")}</div> },
		{ name: 'Tanggal Akhir', row: (cell: Discount) => <div>{dayjs(cell.end_date).format("DD MMM YYYY")}</div> },
		{ name: 'Status', row: (cell: Discount) => <div>{dayjs().isAfter(cell.end_date,'milliseconds') ? 'Expired' : 'Active'}</div> },
		{
			name: 'Action', row: (cell: Discount) => (
				<button className='btn bg-primary text-white' onClick={() => { setModal(true); setFormData(cell); setIsCreate(false); }}>
					Edit
				</button>
			)
		}
	];

	return (
		<>
			{loading && <LoadingScreen />}
			{modal && (
				<ModalAdd reloadData={fetchData} setLoading={setLoading}  isCreate={isCreate} toggleModal={() => setModal(false)} isOpen={modal} handlePost={postData} detailData={formData} />
			)}
			<PageBreadcrumb title='discount' subName='Backoffice' />
			<div className='bg-white p-4 '>
				<div className='flex justify-between'>
					<h3 className='text-2xl font-bold'>Discounts</h3>
					<button className='btn bg-primary mb-4 text-white' onClick={() => { setModal(true); setIsCreate(true); setFormData({ name: '', format_size: '', is_active: 1 }); }}>Tambah Data</button>
				</div>
				<p className='mb-2'>Total Data : {dataPaginate?.total}</p>
				<TablePaginate totalPage={dataPaginate?.last_page || 0} data={dataPaginate?.data} columns={columns} onPageChange={(val) => fetchData(val.selected)} />
			</div>
		</>
	);
};

export default Index;
