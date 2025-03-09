import React, { useEffect, useState } from 'react'
import { ModalLayout } from '../../../components/HeadlessUI';
import { FileUploader, FormInput } from '../../../components';
import Select from 'react-select'
import { PostImageProducts, PostProductLinks, PostProductsTypes, Products } from '../../../dto/products';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import cloneDeep from 'clone-deep'
import { HelperFunction } from '../../../helpers/HelpersFunction';
import { GetCategories } from '../../../helpers/api/categories';
import { Dropdown } from '../../../dto/dropdown';
import { getLinkType } from '../../../helpers';
import Swal from 'sweetalert2';
import { GetBrands, PostProductImages, PostProductLink, PostProducts } from '../../../helpers/api/Products';
import CustomFlatpickr from '../../../components/CustomFlatpickr';
import dayjs from 'dayjs';


interface ModalAddTypes {
  isOpen: boolean,
  toggleModal: () => void,
  isCreate: boolean,
  setLoading: (loading: any) => void,
  detailData: Products,
  reloadData: () => void
}

export const ModalAdd = ({ isOpen, toggleModal, isCreate, setLoading, detailData, reloadData }: ModalAddTypes) => {
  const [formData, setFormData] = useState<any>({
    name: '',
    brand: '',
    description: '',
    release_date: '',
    price: 0,
    link: []
  })
  const [suggestBrand, setSuggestBrand] = useState<any>()
  const [categoriesOptions, setCategoriesOptions] = useState<Dropdown[]>()
  const [selectedCategories, setSelectedCategories] = useState<Dropdown>({ value: '', label: '' })
  const [subCategoriesOptions, setSubCategoriesOptions] = useState<Dropdown[]>()
  const [selectedSubCategories, setSelectedSubCategories] = useState<Dropdown>({ value: '', label: '' })
  const [linkOptions, setLinkOptions] = useState<any[]>(

  )
  const [selectedLink, setSelectedLink] = useState<any>()
  const [tempLink, setTempLink] = useState<any>()

  useEffect(() => {
    setLoading(true)
    Promise.all([GetCategories(`?data_per_page=100000&is_active=1`), getLinkType(`?data_per_page=10000&is_active=1`), GetBrands()]).then((res) => {
      setCategoriesOptions(HelperFunction.FormatOptions(res[0].data, 'name', 'id'))
      setLinkOptions(HelperFunction.FormatOptions(res[1].data, 'name', 'id'))
      setSuggestBrand(res[2]?.data)
      setFormData({ ...formData, ...detailData })

      setLoading(false)
    }).catch((err) => {
      setLoading(false);
      console.log(err)
      Swal.fire('Error', err.name[0], 'error');
    })
  }, [])


  const postData = () => {
    let postData: PostProductsTypes = {
      name: formData.name,
      description: formData.description,
      brand: formData.brand,
      release_date: formData.release_date,
      price: formData.price,
      stock: formData.stock,
      is_active: 1,
      category_id: 0,
    }


    if (!selectedCategories.value) {
      postData.category_id = parseInt(selectedSubCategories.value)
    } else {
      postData.category_id = parseInt(selectedCategories.value)
    }

    let imageLink: PostProductLinks[] = []

    formData?.link?.map((item) => {
      imageLink.push({
        link: item?.link,
        link_type_id: item?.detail?.id,
        product_id: 0
      })
    })




    setLoading(true)
    PostProducts(postData).then(async (res) => {
       
      try {
        imageLink.map(async (item) => {
          item.product_id = res?.data?.data?.id
          await PostProductLink(item)
        })

        
      Array.from(formData.image_files).forEach(async (file: any) => {
        let imagePayload: any = {

        }
        imagePayload.product_id = res?.data?.data?.id
        imagePayload.image_files =  file;
        await PostProductImages(imagePayload)
      })

        toggleModal()
        Swal.fire('Success', formData.id ? 'Edit Product berhasil' : 'Input Product berhasil', 'success');
        setLoading(false)
        reloadData()
      } catch (error) {
        toggleModal()
        reloadData()
        Swal.fire('Error', error.name[0], 'error');
        setLoading(false)
      }



    })
  }

  const handleAddLink = () => {
    let prevData = formData?.link
    prevData.push({ link: tempLink, detail: selectedLink.detail })

    setSelectedLink(null)
    setTempLink('')


    setFormData({ ...formData, link: prevData })
  }

  const deleteLink = (index: any) => {
    let prevData = cloneDeep(formData.link)
    prevData.splice(index, 1)
    setFormData({ ...formData, link: prevData })
  }

  const onFileUpload = (images: any) => {
    let temp: any = []
    images.forEach((image) => {
      temp.push(image)
    })
    setFormData({ ...formData, image_files: temp })
  }

  const handleOnSelect = (val: any, name: string) => {
    if (name === 'categories') {
      setSelectedCategories(val)
      setSelectedSubCategories({ value: '', label: '' })
      setSubCategoriesOptions(HelperFunction.FormatOptions(val?.detail?.sub_cat, 'name', 'id'))
    }
    if (name === 'sub_categories') {
      setSelectedSubCategories(val)
    }
  }

  const modules = {
    toolbar: [[{ font: [] }, { size: [] }], ['bold', 'italic', 'underline', 'strike'], [{ color: [] }, { background: [] }], [{ script: 'super' }, { script: 'sub' }], [{ header: [false, 1, 2, 3, 4, 5, 6] }, 'blockquote', 'code-block'], [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }], ['direction', { align: [] }], ['link', 'clean']],
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

          <FormInput autoComplete="false" name='name' label='Name' value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className='form-input mb-3' />

          <FormInput autoComplete="false"  name='price' labelClassName='mb-2' label='Harga' value={HelperFunction.FormatToRupiah2(formData?.price || 0)} onChange={(e) => setFormData({ ...formData, price: parseInt(HelperFunction.onlyNumber(e.target.value)) })} className='form-input mb-3' />
          <div className="mb-20">
            <div className="flex justify-between items-center">
              <h4 className="card-title">Deskripsi</h4>
            </div>

            <div className="pt-3">
              <ReactQuill defaultValue={`input deskripsi disini`} theme="snow" modules={modules} style={{ height: 300 }} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e })} />
            </div>
          </div>

          <div className='mb-4' >
            <label className="mb-2" htmlFor="choices-text-remove-button">
             Tanggal rilis
            </label>
            <CustomFlatpickr className="form-input" placeholder="masukan tanggal" value={formData?.release_date} options={{
              time_24hr: true,
              dateFormat: 'y-m-d',
              onChange: (v) => setFormData({ ...formData, release_date: dayjs(v).format("YY-MM-DD") })
            }}
            />
          </div>


          <div className='mb-4'>
            <label className="mb-2" htmlFor="choices-text-remove-button">
              Kategori
            </label>
            <Select className="select2 z-5" options={categoriesOptions} value={selectedCategories} onChange={(v) => handleOnSelect(v, 'categories')} />
          </div>

          <div className='mb-4' >
            <label className="mb-2" htmlFor="choices-text-remove-button">
              Sub Kategori
            </label>
            <Select isDisabled={subCategoriesOptions?.length === 0} className="select2 z-5" options={subCategoriesOptions} value={selectedSubCategories} onChange={(v) => handleOnSelect(v, 'sub_categories')} />
          </div>

          <div className='mb-2 border px-3 py-4'>
            <h4 className="card-title">Link</h4>
            <div className="flex gap-x-4 items-center ">
              <div className="w-3/6">
                <FormInput autoComplete="false" name='name' label='url link' value={tempLink} onChange={(e) => setTempLink(e.target.value)} className='form-input' labelClassName='mb-2' />
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
                        <img data-dz-thumbnail="" className="h-12 w-12 rounded bg-light" style={{ objectFit: 'cover' }} alt={item?.name} src={HelperFunction.GetImage(item?.detail?.image)} />
                        <div>
                          <p className="font-semibold">
                          {item?.link} ({item?.detail?.name})
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
              <div className="flex items-center" >
                <input type="radio" className="form-radio text-primary" name="product-available" onChange={() => setFormData({ ...formData, stock: 1 })} checked={formData?.stock === 1} />
                <label className="ms-1.5" htmlFor="InlineRadio01">
                  Ya
                </label>
              </div>
              <div className="flex items-center">
                <input type="radio" className="form-radio text-primary" onChange={() => setFormData({ ...formData, stock: 0 })} name="product-available" checked={formData?.stock === 0} />
                <label className="ms-1.5" htmlFor="InlineRadio02">
                  tidak
                </label>
              </div>
            </div>
          </div>


          <FormInput autoComplete="false" type='suggest' dataSuggest={suggestBrand} labelClassName='mb-2' name='brand' label='Brand' value={formData.brand} onChange={(e) => setFormData({ ...formData, brand: e })} className='form-input mb-3' />

          {!isCreate && (
            <div className='mb-2'>
              <h6 className='text-sm mb-2'>Status</h6>
              <input type='checkbox' checked={formData.is_active === 1 ? true : false} onChange={(e) => setFormData({ ...formData, is_active: e.target.checked ? 1 : 0 })} />
              <label className='ml-2'>Aktif</label>
            </div>
          )}

          <div className='mb-2' >
            <label className="mb-2" htmlFor="choices-text-remove-button">
              Upload Image (max ukuran image 2 mb)
            </label>
            <FileUploader maxSizeParms={2} onFileUpload={onFileUpload} icon="ri-upload-cloud-line text-4xl text-gray-300 dark:text-gray-200" text=" klik untuk upload. " />

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
