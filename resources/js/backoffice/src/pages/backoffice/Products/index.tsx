import React, { useEffect, useState } from 'react';
import { PageBreadcrumb } from '../../../components';
import TablePaginate from '../../../components/Table/tablePaginate';
import LoadingScreen from '../../../components/Loading/loading';
import Swal from 'sweetalert2';
import { Size } from '../../../dto/size';
import { ModalAdd } from './ModalAdd';
import { Products } from '../../../dto/products';
import { GetProducts, PostProductImages, PostProductLink, PostProducts } from '../../../helpers/api/Products';
import { HelperFunction } from '../../../helpers/HelpersFunction';
import ModalPreview from '../../../components/ModalPreviewImage/ModalPreview';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<any>({ name: '', value: '', is_active: 1 });
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [dataPaginate, setDataPaginate] = useState<any>(null);
    const [previewImage, setPreviewImage] = useState(false)
    const navigate = useNavigate()

  const fetchData = async (page = 1) => {
    setLoading(true);
    const res:Size[] = await GetProducts(`?page=${page}`)
    setDataPaginate(res);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const postData = async (formData) => {
    setLoading(true);
    const data = { ...formData, _method: formData.id ? 'PUT' : '' };
      await PostProducts(data, formData?.id).then((res) => {
        Promise.all([PostProductImages({ product_id: res?.data?.product_id, image_files: formData?.images}),PostProductLink({ product_id: res?.data?.product_id, image_files: formData?.images})])
      })
   
    await fetchData();
    setModal(false);
  };

  const columns = [
    { name: 'Nama', row: (cell:Products) => <div>{cell.name}</div> },
    { name: 'Harga', row: (cell:Products) => <div>{HelperFunction.FormatToRupiah(cell.final_price)}</div> },
    { name: 'Diskon', row: (cell:Products) => <div>{cell.discount_price}</div> },
    {
      name: 'Image', row: (cell: Products) => <button className='btn bg-success text-white' onClick={() => { setPreviewImage(true); setFormData(cell.image) }}>
          Preview image
      </button>
  },      
  { name: 'Tersedia', row: (cell:Products) => <div>{cell.stock >= 1 ? "Available" : "Not Available"}</div> },
    { name: 'Status', row: (cell:Products) => <div>{cell.is_active ? 'Active' : 'Non Active'}</div> },
    { name: 'Action', row: (cell:Products) => (
       <div className="flex gap-x-3">
         <button className='btn bg-primary text-white' onClick={() => { setModal(true); setFormData(cell); setIsCreate(false); }}>
          Edit
        </button>
          <button className='btn bg-secondary text-white' onClick={() => { navigate('/backoffice/variants')}}>
          Settings Variant
        </button>
       </div>
      )
    }
  ];

  return (
    <>
      {loading && <LoadingScreen />}
      <ModalPreview toggleModal={() => setPreviewImage(false)} isOpen={previewImage} img={formData?.image} />
      {modal && (
		<ModalAdd reloadData={fetchData} isCreate={isCreate} toggleModal={() => setModal(false)} isOpen={modal} setLoading={setLoading} detailData={formData} />
      )}
      <PageBreadcrumb title='Products' subName='Backoffice' />
      <div className='bg-white p-4 '>
        <div className='flex justify-between'>
          <h3 className='text-2xl font-bold'>Products</h3>
          <button className='btn bg-primary mb-4 text-white' onClick={() => { setModal(true); setIsCreate(true); setFormData({ name: '', format_size: '', is_active: 1 }); }}>Tambah Data</button>
        </div>
        <p className='mb-2'>Total Data : {dataPaginate?.total}</p>
        <TablePaginate totalPage={dataPaginate?.last_page || 0} data={dataPaginate?.data} columns={columns} onPageChange={(val) => fetchData(val?.current_page as any)} />
      </div>
    </>
  );
};

export default Index;
