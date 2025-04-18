import React, { useEffect, useState } from 'react';
import { FileUploader, FormInput, PageBreadcrumb } from '../../../components';
import { ModalLayout } from '../../../components/HeadlessUI';
import TablePaginate from '../../../components/Table/tablePaginate';
import LoadingScreen from '../../../components/Loading/loading';
import Swal from 'sweetalert2';
import Select from 'react-select'
import { Categories, PostCategoriesTypes } from '../../../dto/categories';
import { GetCategories, PostCategories } from '../../../helpers/api/categories';
import { Dropdown } from '../../../dto/dropdown';
import { HelperFunction } from '../../../helpers/HelpersFunction';
import ModalPreview from '../../../components/ModalPreviewImage/ModalPreview';

const Index = () => {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<any | PostCategoriesTypes>({ name: '', image_file: '', parent_id: 0, is_active: 1, is_show_header: false });
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [dataPaginate, setDataPaginate] = useState<any>(null);
  const [categoriesOptions, setCategoriesOptions] = useState<any[]>()
  const [selectedCategories, setSelectedCategories] = useState<any>()
  const [previewImage, setPreviewImage] = useState(false)
  const [selectedOrderMenu, setSelectedOrderMenu] = useState<any>(null)
  const [orderMenuOptions, setOrderMenuOptions] = useState<any>([
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
    { value: 5, label: 5 },
  ])

  const fetchData = async (page = 1) => {
    setLoading(true);
    const res: Categories[] = await GetCategories(`?data_per_page=100000`).then((res: any) => {
      const categories: Categories[] = [];
      res.data.forEach((parent) => {
        categories.push(parent);

        if (parent.sub_cat) {
          parent.sub_cat.forEach((child) => {
            return categories.push(child);
          })
        }


      });

      res.data = categories
      return res;
    })
    const categoriesList: Dropdown[] = await GetCategories(`?data_per_page=100000`).then((res) => {
      return HelperFunction.FormatOptions(res.data, 'name', 'id')
    })



    setCategoriesOptions(categoriesList)
    setDataPaginate(res);
    setLoading(false);


    if(!isCreate){
        const selected = categoriesList.filter((item) => item.value == formData.parent_id)[0]
        setSelectedCategories(selected)
        setCategoriesOptions([...categoriesList, { value: null, label: "Parent Categories" }])
    }
  };

  useEffect(() => {
    fetchData()
  }, []);

  const postData = async () => {
    setLoading(true);
    if (!isCreate) {
      delete formData.image_thumb
      delete formData.image
      delete formData.slug
    }

    const data = { ...formData, _method: formData.id ? 'PUT' : 'POST' };
    await PostCategories(data, formData?.id).then(() => {
      setModal(false);
      Swal.fire('Success', formData.id ? 'Edit Categories berhasil' : 'Input Categories berhasil', 'success');
    }).catch((err) => {
      setModal(false);
      console.log(err)
      Swal.fire('Error', err.name[0], 'error');
    })
    await fetchData();

  };

  const clickDetail = (detail: Categories) => {
    setModal(true);
    setFormData(detail);
    setIsCreate(false);
    setSelectedCategories(categoriesOptions?.filter((item) => item.value == detail.parent_id)[0])
  }

  const columns = [
    { name: 'Nama', row: (cell: Categories) => <div className={`${cell.parent_id && "pl-4 border-l"} ${cell.parent_id == null && 'font-bold'}`}>{cell.name}</div> },
    { name: 'Status', row: (cell: Categories) => <div>{cell.is_active ? 'Active' : 'Non Active'}</div> },
    {
      name: 'Image', row: (cell: Categories) => <button className='btn bg-success text-white' onClick={() => { setPreviewImage(true); setFormData(cell) }}>
        Preview image
      </button>
    },
    {
      name: 'Action', row: (cell: Categories) => (
        <button className='btn bg-primary text-white' onClick={() => clickDetail(cell)}>
          Edit
        </button>
      )
    }
  ];



  const onFileUpload = (val: any) => {
    setFormData({ ...formData, image_file: val[0] })
  }

  return (
    <>
      <ModalPreview toggleModal={() => setPreviewImage(false)} isOpen={previewImage} img={formData?.image} />
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
            <div className='p-4 overflow-y-auto w-[70vw]'>
              <FormInput name='name' label='Name' value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className='form-input mb-3' />

              <div className='mb-3'>
                <label className="mb-2" htmlFor="choices-text-remove-button">
                  Parent Categories
                </label>
                <Select className="select2 z-5" value={selectedCategories} options={categoriesOptions} onChange={(v) => { setSelectedCategories(v); setFormData({ ...formData, parent_id: v.value }) }} />
              </div>

              <div className={`mb-3 ${formData?.parent_id && "hidden" }`}>
              <h6 className='text-sm mb-2'>Tampilkan di header</h6>
                <input type='checkbox' checked={formData.is_show_header === 1 ? true : false} onChange={(e) => setFormData({ ...formData, is_show_header: e.target.checked ? 1 : 0 })} />
                <label className='ml-2'>Ya</label>
              </div>


              {/* <div className='mb-2'>
                <h6 className='text-sm mb-2'>Tampilkan di header</h6>
                <input type='checkbox' checked={formData.is_show_menu === 1 ? true : false} onChange={(e) => setFormData({ ...formData, is_show_menu: e.target.checked ? 1 : 0 })} />
                <label className='ml-2'>Ya</label>
              </div>

              {
                formData?.is_show_menu === 1 && (

                  <div className='mb-2'>
                    <label className="mb-2" htmlFor="choices-text-remove-button">
                      Urut Ke
                    </label>
                    <Select className="select2 z-5" options={orderMenuOptions} value={selectedOrderMenu} onChange={(e) => setSelectedOrderMenu(e)} />
                  </div>
                )
              } */}

              <div className="flex justify-between items-center">
                <h4 className="card-title mb-1">Image</h4>
              </div>

              <FileUploader singleFile multipleUploads={false} onFileUpload={onFileUpload} icon="ri-upload-cloud-line text-4xl text-gray-300 dark:text-gray-200" text=" klik untuk upload." onFileDelete={function (index: any): void {
                throw new Error('Function not implemented.');
              }} handleDeletePrevImage={function (parms: any, idx: any): void {
                throw new Error('Function not implemented.');
              }} detailData={undefined} />



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
              <button className='btn bg-primary text-white' disabled={(!formData.image_file || !formData.name) && isCreate ? true : false} onClick={postData}>Submit</button>
            </div>
          </div>
        </ModalLayout>
      )}
      <PageBreadcrumb title='Categories' subName='Backoffice' />
      <div className='bg-white p-4 '>
        <div className='flex justify-between'>
          <h3 className='text-2xl font-bold'>Categories</h3>
          <button className='btn bg-primary mb-4 text-white' onClick={() => { setModal(true); setIsCreate(true); setFormData({ name: '', is_active: 1 }); }}>Tambah Data</button>
        </div>
        <p className='mb-2'>Total Data : {dataPaginate?.total}</p>
        <TablePaginate totalPage={dataPaginate?.last_page || 0} data={dataPaginate?.data} columns={columns} onPageChange={(val) => fetchData(val.selected)} />
      </div>
    </>
  );
};

export default Index;
