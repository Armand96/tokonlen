import React, { useEffect, useState } from 'react';
import { ModalLayout } from '../../../components/HeadlessUI';
import { FileUploader, FormInput } from '../../../components';
import Select from 'react-select';
import 'react-quill/dist/quill.snow.css';
import { HelperFunction } from '../../../helpers/HelpersFunction';
import { GetSize } from '../../../helpers';
import { GetProducts } from '../../../helpers/api/Products';
import cloneDeep from 'clone-deep';
import { PostVariantsTypes, Variants } from '../../../dto/variants';


interface ModalAddTypes {
  isOpen: boolean,
  toggleModal: () => void,
  isCreate: boolean,
  handlePost: (parms: any) => void,
  detailData: Variants,
  reloadData: () => void
  setLoading: (loading: any) => void,
}

export const ModalAdd = ({ isOpen, toggleModal, isCreate, detailData, reloadData, setLoading  }: ModalAddTypes) => {
  const [formData, setFormData] = useState<any>({
    additional_price: 0,
  })
  const [imageDelete, setImageDelete] = useState<any>([])
  const [oldImages, setOldImages] = useState<any>([])
  const [productsOptions, setProductsOptions] = useState<any[]>()
  const [selectedProducts, setSelectedProducts] = useState<any>()
  const [selectedSized, setSelectedSized] = useState<any[]>([])
  const [sizeList, setSizeList] = useState<any>()

  useEffect(() => {
    setLoading(true)
    GetSize(`?data_per_page=99999&is_active=1`).then((res) => {
      setSizeList(res?.data)
    })
    GetProducts(`?data_per_page=99999&is_active=1`).then((res) => {
      setProductsOptions(HelperFunction.FormatOptions(res?.data, 'name', 'id'))
    })

    setFormData({ ...formData, ...detailData })
    setLoading(false)
  }, [])

  const postData = () => {
    console.log(formData)

    let postDataCreate: PostVariantsTypes[] =  selectedSized.map((size) =>  
      variant: formData?.name,
      
  )
    
  


  }

  const onFileUpload = (images: any) => {
    let temp: any = []
    images.forEach((image) => {
      temp.push(image)
    })
    setFormData({ ...formData, image_files: temp })
  }

    const newFileDelete = (index: any) => {
      let prevData = cloneDeep(formData.image_files)
      prevData.splice(index, 1)
      setFormData({ ...formData, image_files: prevData })
    }


    const handlePrevImage = (parms, idx) => {
      let prevData = cloneDeep(oldImages)
      prevData.splice(idx, 1)
      setOldImages(prevData)
      setImageDelete([...imageDelete, parms ])
  
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
            <Select className="select2 z-5" options={productsOptions} onChange={(v) => setSelectedProducts(v)} />
          </div>

          <FormInput name='variant' label='Nama Variant' value={formData.name} onChange={(e) => setFormData({ ...formData, variant: e.target.value })} className='form-input mb-3' />

          <FormInput  labelClassName='mb-2' name='additional_price' label='Harga Tambahan' value={HelperFunction.FormatToRupiah2(formData?.additional_price || 0)} onChange={(e) => setFormData({ ...formData, additional_price: parseInt(HelperFunction.onlyNumber( e.target.value ))})} className='form-input mb-3' />

          <div className="mb-3">
            <h6 className="text-sm mb-2">Variant Tersedia ?</h6>
            <div className="flex gap-5">
              <div className="flex items-center">
                <input type="radio" className="form-radio text-primary" name="InlineRadio" id="InlineRadio01" onChange={() => setFormData({ ...formData, stock: 1 })} checked={formData?.stock === 1}  />
                <label className="ms-1.5" htmlFor="InlineRadio01">
                  Ya
                </label>
              </div>
              <div className="flex items-center">
                <input type="radio" className="form-radio text-primary" name="InlineRadio" id="InlineRadio02" onChange={() => setFormData({ ...formData, stock: 0 })} checked={formData?.stock === 0}  />
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
                  <div className="" key={key}>
                      <input type='checkbox' disabled={!isCreate} checked={selectedSized.includes(item?.format_size || item?.size)} onClick={() => selectedSized.includes(item?.format_size || item?.size) ?  setSelectedSized([...selectedSized.filter((x) => x !==  item?.format_size || item?.size)]) :  setSelectedSized([...selectedSized, item?.format_size])} />
                      <label className='ml-2'  >{item?.format_size}</label>
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
            <FileUploader onFileDelete={newFileDelete} detailData={detailData} handleDeletePrevImage={handlePrevImage} prevData={oldImages} maxSizeParms={2} onFileUpload={onFileUpload} icon="ri-upload-cloud-line text-4xl text-gray-300 dark:text-gray-200" text=" klik untuk upload. " />          
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
