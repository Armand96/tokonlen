import React, { useEffect, useState } from 'react';
import { PageBreadcrumb } from '../../../components';
import TablePaginate from '../../../components/Table/tablePaginate';
import LoadingScreen from '../../../components/Loading/loading';
import Swal from 'sweetalert2';
import { Size } from '../../../dto/size';
import { ModalAdd } from './ModalAdd';
import { HelperFunction } from '../../../helpers/HelpersFunction';
import { Variants } from '../../../dto/variants';
import { GetVariants, PostVariants } from '../../../helpers/api/variants';

const Index = () => {
	const [modal, setModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState<any>();
	const [isCreate, setIsCreate] = useState<boolean>(false);
	const [dataPaginate, setDataPaginate] = useState<any>(null);

	const fetchData = async (page = 1) => {
		setLoading(true);
		const res: Size[] = await GetVariants(`?page=${page}`);
		setDataPaginate(res);
		setLoading(false);
	};

	useEffect(() => {
		fetchData();
	}, []);

	const postData = async () => {
		setLoading(true);
		const data = { ...formData, _method: formData.id ? 'PUT' : 'POST' };
		await PostVariants(data, formData?.id);
		await fetchData();
		setModal(false);
		Swal.fire('Success', formData.id ? 'Edit Diskon berhasil' : 'Input Diskon berhasil', 'success');
	};

	const columns = [
		{ name: 'Nama Produk', row: (cell: Variants) => <div>{cell.variant}</div> },
		{ name: 'Nama Variants', row: (cell: Variants) => <div>{cell.variant}</div> },
		{ name: 'Ukuran Variants', row: (cell: Variants) => <div>{cell.size}</div> },
		{ name: 'Harga Tambahan', row: (cell: Variants) => <div>{HelperFunction.FormatToRupiah(cell.additional_price)}</div> },
		{ name: 'Status', row: (cell: Variants) => <div>{cell.is_active ? 'Active' : 'Non Active'}</div> },
		{
			name: 'Action', row: (cell: Variants) => (
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
				<ModalAdd reloadData={fetchData} setLoading={setLoading} isCreate={isCreate} toggleModal={() => setModal(false)} isOpen={modal} handlePost={postData} detailData={formData} />
			)}
			<PageBreadcrumb title='Variants' subName='Backoffice' />
			<div className='bg-white p-4 '>
				<div className='flex justify-between'>
					<h3 className='text-2xl font-bold'>Variants</h3>
					<button className='btn bg-primary mb-4 text-white' onClick={() => { setModal(true); setIsCreate(true); setFormData({ name: '', format_size: '', is_active: 1 }); }}>Tambah Data</button>
				</div>
				<p className='mb-2'>Total Data : {dataPaginate?.total}</p>
				<TablePaginate totalPage={dataPaginate?.last_page || 0} data={dataPaginate?.data} columns={columns} onPageChange={(val) => fetchData(val.selected)} />
			</div>
		</>
	);
};

export default Index;
