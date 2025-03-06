import React, { useEffect, useState } from 'react';
import { FormInput, PageBreadcrumb } from '../../../components';
import { ModalLayout } from '../../../components/HeadlessUI';
import TablePaginate from '../../../components/Table/tablePaginate';
import LoadingScreen from '../../../components/Loading/loading';
import { GetSize, getWebSettings, PostSize, postWebSettings } from '../../../helpers';
import Swal from 'sweetalert2';
import { Size } from '../../../dto/size';
import { WebSettings } from '../../../dto/web_settings';

const Index = () => {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<any>({ name: '', value: '', is_active: 1 });
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [dataPaginate, setDataPaginate] = useState<any>(null);

  const fetchData = async (page = 1) => {
    setLoading(true);
    const res:Size[] = await getWebSettings(`?page=${page}`);
    setDataPaginate(res);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const postData = async () => {
    setLoading(true);
    const data = { ...formData, _method: formData.id ? 'PUT' : '' };
    await postWebSettings(data, formData?.id);
    await fetchData();
    setModal(false);
    Swal.fire('Success', formData.id ? 'Edit web settings berhasil' : 'Input web settings berhasil', 'success');
  };

  const columns = [
    { name: 'Nama', row: (cell:WebSettings) => <div>{cell.name}</div> },
    { name: 'content', row: (cell:WebSettings) => <div>{cell.value}</div> },
    { name: 'Action', row: (cell:WebSettings) => (
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
        <ModalLayout showModal={modal} toggleModal={() => setModal(false)} placement='justify-center items-start'>
          <div className='m-3 sm:mx-auto flex flex-col bg-white shadow-sm rounded'>
            <div className='flex justify-between items-center py-2.5 px-4 border-b'>
              <h3 className='text-lg'>{isCreate ? 'Tambah Data' : 'Edit Data'}</h3>
              <button className='h-8 w-8' onClick={() => setModal(false)}>
                <i className='ri-close-line text-2xl' />
              </button>
            </div>
            <div className='p-4 max-h-80 overflow-y-auto w-[70vw]'>
              <FormInput name='name' label='Name' value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className='form-input mb-3' />
              <FormInput name='content' label='Content' value={formData.value} onChange={(e) => setFormData({ ...formData, value: e.target.value })} className='form-input mb-3' />
              {!isCreate && (
                <div className='mt-5'>
                  <h6 className='text-sm mb-2'>Status</h6>
                  <input type='checkbox' checked={formData.is_active === 1 ? true : false} onChange={(e) => setFormData({ ...formData, is_active: e.target.checked ? 1 : 0 })} />
                  <label className='ml-2'>Aktif</label>
                </div>
              )}
            </div>
            <div className='flex justify-end p-4 border-t gap-x-4'>
              <button className='btn bg-light text-gray-800' onClick={() => setModal(false)}>Close</button>
              <button className='btn bg-primary text-white' onClick={postData}>Submit</button>
            </div>
          </div>
        </ModalLayout>
      )}
      <PageBreadcrumb title='web settings' subName='Backoffice' />
      <div className='bg-white p-4 '>
        <div className='flex justify-between'>
          <h3 className='text-2xl font-bold'>web settings</h3>
          <button className='btn bg-primary mb-4 text-white' onClick={() => { setModal(true); setIsCreate(true); setFormData({ name: '', format_size: '', is_active: 1 }); }}>Tambah Data</button>
        </div>
        <p className='mb-2'>Total Data : {dataPaginate?.total}</p>
        <TablePaginate totalPage={dataPaginate?.last_page || 0} data={dataPaginate?.data} columns={columns} onPageChange={(val) => fetchData(val?.current_page as any)} />
      </div>
    </>
  );
};

export default Index;
