import React, { useEffect, useState } from 'react';
import { FileUploader, FormInput, PageBreadcrumb } from '../../../components';
import { ModalLayout } from '../../../components/HeadlessUI';
import TablePaginate from '../../../components/Table/tablePaginate';
import LoadingScreen from '../../../components/Loading/loading';
import { getWebSettings, postWebSettings, postWebSettingsWithFile } from '../../../helpers';
import Swal from 'sweetalert2';
import { Size } from '../../../dto/size';
import { WebSettings } from '../../../dto/web_settings';
import cloneDeep from 'clone-deep';

const Index = () => {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<any>({ name: '', value: '', is_active: true, type: 'text' });
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [dataPaginate, setDataPaginate] = useState<any>(null);

  const fetchData = async (page = 1) => {
    setLoading(true);
    const res: Size[] = await getWebSettings(`?page=${page}`);
    setDataPaginate(res);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const postData = async () => {
    setLoading(true);
    const data = { ...formData, value: formData.value , type: formData.image_file ? 'file' : 'text', _method: formData.id ? 'PUT' : 'POST' };
    if(formData.image_file){
      await postWebSettingsWithFile(data, formData?.id);
    }else{
      await postWebSettings(data, formData?.id);

    }
    await fetchData();
    setModal(false);
    Swal.fire('Success', formData.id ? 'Edit web settings berhasil' : 'Input web settings berhasil', 'success');
  };

  const onFileUpload = (val: any) => {
    setFormData({ ...formData, image_file: val[0] })
  }

  const newFileDelete = () => {
    setFormData({ ...formData, image_file: "" })
  }

  const columns = [
    { name: 'Nama', row: (cell: WebSettings) => <div>{cell.name}</div> },
    { name: 'content', row: (cell: WebSettings) => <div className=" whitespace-normal">{cell.value}</div> },
    {
      name: 'Action', row: (cell: WebSettings) => (
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
              {
                ((!isCreate && formData?.type === "text") || isCreate) && <FormInput name='content' label='Content'  value={formData.value} onChange={(e) => setFormData({ ...formData, value: e.target.value })} className={`form-input mb-3`}   />
              } 
              <div className={`${(!isCreate && formData?.type === "file") || isCreate ? "block" : "hidden"} mb-2`} >
                <label className="mb-2" htmlFor="choices-text-remove-button">
                  Upload Image
                </label>
                <FileUploader multipleUploads={false} onFileDelete={newFileDelete} prevData={null} detailData={null} handleDeletePrevImage={() => null} onFileUpload={onFileUpload} icon="ri-upload-cloud-line text-4xl text-gray-300 dark:text-gray-200" text=" klik untuk upload." />
              </div>
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
          {/* <button className='btn bg-primary mb-4 text-white' onClick={() => { setModal(true); setIsCreate(true); setFormData({ name: '', is_active: true }); }}>Tambah Data</button> */}
        </div>
        <p className='mb-2'>Total Data : {dataPaginate?.total}</p>
        <TablePaginate totalPage={dataPaginate?.last_page || 0} data={dataPaginate?.data} columns={columns} onPageChange={(val) => fetchData(val.selected)} />
      </div>
    </>
  );
};

export default Index;
