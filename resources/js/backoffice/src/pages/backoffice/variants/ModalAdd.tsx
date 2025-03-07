import React, { useEffect, useState } from 'react'
import { ModalLayout } from '../../../components/HeadlessUI';
import { FileUploader, FormInput } from '../../../components';
import Select from 'react-select'
import { Products } from '../../../dto/products';
import 'react-quill/dist/quill.snow.css'
import { HelperFunction } from '../../../helpers/HelpersFunction';
import { GetSize } from '../../../helpers';


interface ModalAddTypes {
  isOpen: boolean,
  toggleModal: () => void,
  isCreate: boolean,
  handlePost: (parms: any) => void,
  detailData: Products
}

export const ModalAdd = ({ isOpen, toggleModal, isCreate, handlePost, detailData }: ModalAddTypes) => {
  const [formData, setFormData] = useState<any>({
    additional_price: 0,
  })
  const [categoriesOptions, setCategoriesOptions] = useState<any[]>()
  const [sizeList, setSizeList] = useState<any>()

  useEffect(() => {
    GetSize(`?data_per_page=99999`).then((res) => {
      setSizeList(res?.data)
    })
  }, [])

  console.log(sizeList)


  const postData = () => {

  }

  const onFileUpload = (val: any) => {
    setFormData({ ...formData, image_file: val })
  }



  return (
    <ModalLayout showModal={isOpen} toggleModal={() => toggleModal()} placement='justify-center items-start'>
      <div className='m-3 sm:mx-auto flex flex-col bg-white shadow-sm rounded'>
        <div className='flex justify-between items-center py-2.5 px-4 border-b'>
          <h3 className='text-lg'>{isCreate ? 'Tambah Data' : 'Edit Data'}</h3>
          <button className='h-8 w-8' onClick={() => toggleModal()}>
            <i className='ri-close-line text-2xl' />
          </button>
        </div>
        <div className='p-4 overflow-y-auto w-[70vw]'>

          <div className='mb-3'>
            <label className="mb-2" htmlFor="choices-text-remove-button">
              Product
            </label>
            <Select className="select2 z-5" options={categoriesOptions} />
          </div>

          <FormInput name='name' label='Nama Variant' value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className='form-input mb-3' />

          <FormInput  labelClassName='mb-2' name='additional_price' label='Harga Tambahan' value={HelperFunction.FormatToRupiah2(formData?.additional_price || 0)} onChange={(e) => setFormData({ ...formData, additional_price: parseInt(HelperFunction.onlyNumber( e.target.value ))})} className='form-input mb-3' />

          <div className="mb-3">
            <h6 className="text-sm mb-2">Variant Tersedia ?</h6>
            <div className="flex gap-5">
              <div className="flex items-center">
                <input type="radio" className="form-radio text-primary" name="InlineRadio" id="InlineRadio01" defaultChecked />
                <label className="ms-1.5" htmlFor="InlineRadio01">
                  Ya
                </label>
              </div>
              <div className="flex items-center">
                <input type="radio" className="form-radio text-primary" name="InlineRadio" id="InlineRadio02" />
                <label className="ms-1.5" htmlFor="InlineRadio02">
                  tidak
                </label>
              </div>
            </div>
          </div>

            <div className='mb-2'>
              <h6 className='text-sm mb-2'>Variant Ukuran</h6>
              {
                sizeList?.map((item: any, key: any) => (
                  <div className="">
                      <input type='checkbox' />
                      <label className='ml-2'>{item?.format_size}</label>
                  </div>
                ))
              }
            </div>
          
         
          {!isCreate && (
            <div className='mb-2'>
              <h6 className='text-sm mb-2'>Status</h6>
              <input type='checkbox' checked={formData.is_active === 1 ? true : false} onChange={(e) => setFormData({ ...formData, is_active: e.target.checked ? 1 : 0 })} />
              <label className='ml-2'>Aktif</label>
            </div>
          )}

          <div className='mb-2' >
            <label className="mb-2" htmlFor="choices-text-remove-button">
              Upload Image
            </label>
            <FileUploader onFileUpload={onFileUpload} icon="ri-upload-cloud-line text-4xl text-gray-300 dark:text-gray-200" text=" klik untuk upload." />

          </div>




        </div>
        <div className='flex justify-end p-4 border-t gap-x-4'>
          <button className='btn bg-light text-gray-800' onClick={() => toggleModal()}>Close</button>
          <button className='btn bg-primary text-white' onClick={postData}>Submit</button>
        </div>
      </div>
    </ModalLayout>
  )
}
