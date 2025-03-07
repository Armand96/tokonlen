import React, { useEffect, useState } from 'react'
import { ModalLayout } from '../../../components/HeadlessUI';
import { FileUploader, FormInput } from '../../../components';
import Select from 'react-select'
import { Products } from '../../../dto/products';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import cloneDeep from 'clone-deep'
import { HelperFunction } from '../../../helpers/HelpersFunction';


interface ModalAddTypes {
  isOpen: boolean,
  toggleModal: () => void,
  isCreate: boolean,
  handlePost: (parms: any) => void,
  detailData: Products
}

export const ModalAdd = ({ isOpen, toggleModal, isCreate, handlePost, detailData }: ModalAddTypes) => {
  const [formData, setFormData] = useState<any>({
    name: '',
    brand: '',
    description: '',
    price: 0,
    link: []
  })
  const [categoriesOptions, setCategoriesOptions] = useState<any[]>()
  const [subCategoriesOptions, setSubCategoriesOptions] = useState<any[]>()
  const [linkOptions, setLinkOptions] = useState<any[]>(
    [
      { value: 'https://www.google.com', label: 'Tokped' },
    ]
  )
  const [selectedLink, setSelectedLink] = useState<any>()
  const [link, setLink] = useState<any>()
  const [tempLink, setTempLink] = useState<any>()

  useEffect(() => {

  }, [])


  const postData = () => {

  }

  const handleAddLink = () => {
    let prevData = formData?.link
    prevData.push({ link: tempLink, detail: selectedLink })

    setSelectedLink(null)
    setTempLink('')


    setFormData({ ...formData, link: prevData })
  }

  const deleteLink = (index: any) => {
    let prevData = cloneDeep(formData.link)
    prevData.splice(index, 1)
    setFormData({ ...formData, link: prevData })
  }


  const onFileUpload = (val: any) => {
    setFormData({ ...formData, image_file: val })
  }

  const modules = {
    toolbar: [[{ font: [] }, { size: [] }], ['bold', 'italic', 'underline', 'strike'], [{ color: [] }, { background: [] }], [{ script: 'super' }, { script: 'sub' }], [{ header: [false, 1, 2, 3, 4, 5, 6] }, 'blockquote', 'code-block'], [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }], ['direction', { align: [] }], ['link', 'clean']],
  }


  console.log(formData)

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
          <FormInput name='name' label='Name' value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className='form-input mb-3' />

          <FormInput name='price' labelClassName='mb-2' label='Harga' value={HelperFunction.FormatToRupiah2(formData?.price || 0)} onChange={(e) => setFormData({ ...formData, price: parseInt(HelperFunction.onlyNumber(e.target.value)) })} className='form-input mb-3' />
          <div className="mb-20">
            <div className="flex justify-between items-center">
              <h4 className="card-title">Deskripsi</h4>
            </div>

            <div className="pt-3">
              <ReactQuill defaultValue={`input deskripsi disini`} theme="snow" modules={modules} style={{ height: 300 }} />
            </div>
          </div>

          <div className='mb-2'>
            <label className="mb-2" htmlFor="choices-text-remove-button">
              Kategori
            </label>
            <Select className="select2 z-5" options={categoriesOptions} />
          </div>

          <div className='mb-4' >
            <label className="mb-2" htmlFor="choices-text-remove-button">
              Sub Kategori
            </label>
            <Select isDisabled={!subCategoriesOptions} className="select2 z-5" options={subCategoriesOptions} />
          </div>

          <div className='mb-2 border px-3 py-4'>
            <h4 className="card-title">Link</h4>
            <div className="flex gap-x-4 items-center ">
              <div className="w-3/6">
                <FormInput name='name' label='Nama link' value={tempLink} onChange={(e) => setTempLink(e.target.value)} className='form-input' labelClassName='mb-2' />
              </div>
              <div className="w-3/6 mt-6">
                <Select className="select2 h-full" options={linkOptions} value={selectedLink} onChange={(v) => setSelectedLink(v)} />
              </div>
            </div>
            <button className="mt-2 btn bg-primary text-white" onClick={handleAddLink} disabled={!selectedLink || !tempLink ? true : false}>
              Add Link
            </button>




            <div className="mt-3">
              {(formData.link || []).map((item, idx) => {
                return (
                  <React.Fragment key={idx}>
                    <div className="border rounded-md border-gray-200 p-3 mb-2 dark:border-gray-600 mt-2">
                      <div className="float-right">
                        <p className="btn btn-link">
                          <i className="ri-close-line text-lg" onClick={() => deleteLink(idx)}></i>
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <img data-dz-thumbnail="" className="h-12 w-12 rounded bg-light" style={{ objectFit: 'cover' }} alt={item?.name} src={item?.link} />
                        <div>
                          <p className="font-semibold">
                            {item?.link}
                          </p>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                )
              })}
            </div>

          </div>

          <div className="mb-3">
              <h6 className="text-sm mb-2">Product Tersedia ?</h6>
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


          <FormInput labelClassName='mb-2' name='content' label='Brand' value={formData.value} onChange={(e) => setFormData({ ...formData, brand: e.target.value })} className='form-input mb-3' />

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
