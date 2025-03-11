import React, { useEffect, useState } from 'react'
import { ModalLayout } from '../../../components/HeadlessUI';
import { FileUploader, FormInput } from '../../../components';
import Select from 'react-select'
import { Products } from '../../../dto/products';
import 'react-quill/dist/quill.snow.css'
import cloneDeep from 'clone-deep'
import CustomFlatpickr from '../../../components/CustomFlatpickr';
import { GetProducts } from '../../../helpers/api/Products';
import { HelperFunction } from '../../../helpers/HelpersFunction';
import { GetVariants } from '../../../helpers/api/variants';
import dayjs from 'dayjs'

interface ModalAddTypes {
  isOpen: boolean,
  toggleModal: () => void,
  isCreate: boolean,
  handlePost: (parms: any) => void,
  detailData: Products,
  reloadData: () => void
  setLoading: (loading: any) => void,
}

export const ModalAdd = ({ isOpen, toggleModal, isCreate, detailData }: ModalAddTypes) => {
  const [formData, setFormData] = useState<any>({
    discount_by: 0, // discount 1: by percentage, 2: by price
    is_by_product: 0, // 1: by product, 2: by variant
    start_date: dayjs().format("YYYY-MM-DD"),
    end_date: dayjs().format("YYYY-MM-DD"),
    is_active: 1,
    discount_percentage: 0,
    discount_amount: 0
  })
  const [produkOptions, setProdukOptions] = useState<any[]>()
  const [selectedProduk, setSelectedProduk] = useState<any>(null)

  useEffect(() => {
    if (formData?.is_by_product !== 0 && formData.discount_by !== 0) {
      if (formData.is_by_product == 1) {
        GetProducts(`?is_active=1&data_per_page=999999`).then((res) => {
          setProdukOptions(HelperFunction.FormatOptions(res.data, 'name', 'id'))
        })
      } else {
        GetVariants(`?is_active=1&data_per_page=999999`).then((res) => {
          setProdukOptions(HelperFunction.FormatOptions(res.data, 'variant', 'id'))
        })
      }
      setSelectedProduk(null)
    }
    if (formData.discount_by !== 0) {
      setFormData({ ...formData, discount_percentage: 0, discount_amount: 0 })
    }

  }, [formData?.is_by_product, formData.discount_by])




  const postData = () => {

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

        <div className='p-4 overflow-y-auto  w-[70vw]'>

          <div className="mb-3">
            <h6 className="text-sm mb-2">Dipasang pada</h6>
            <div className="flex gap-5">
              <div className="flex items-center">
                <input type="radio" className="form-radio text-primary" name="InlineRadio" id="InlineRadio01" onChange={() => setFormData({ ...formData, is_by_product: 1 })} checked={formData.is_by_product == 1} />
                <label className="ms-1.5" htmlFor="InlineRadio01">
                  produk
                </label>
              </div>
              <div className="flex items-center">
                <input type="radio" className="form-radio text-primary" name="InlineRadio" id="InlineRadio02" onChange={() => setFormData({ ...formData, is_by_product: 2 })} checked={formData.is_by_product == 2} />
                <label className="ms-1.5" htmlFor="InlineRadio02">
                  variant
                </label>
              </div>
            </div>
          </div>

          <div className="mb-3">
            <h6 className="text-sm mb-2">diskon berdasarkan</h6>
            <div className="flex gap-5">
              <div className="flex items-center">
                <input type="radio" className="form-radio text-primary" name="InlineRadio2" id="InlineRadio01" onChange={() => setFormData({ ...formData, discount_by: 1 })} checked={formData?.discount_by == 1} />
                <label className="ms-1.5" htmlFor="InlineRadio01">
                  Presentase
                </label>
              </div>
              <div className="flex items-center">
                <input type="radio" className="form-radio text-primary" name="InlineRadio2" id="InlineRadio02" onChange={() => setFormData({ ...formData, discount_by: 2 })} checked={formData?.discount_by == 2} />
                <label className="ms-1.5" htmlFor="InlineRadio02">
                  Harga
                </label>
              </div>
            </div>
          </div>

          <div className='mb-2'>
            <label className="mb-2" htmlFor="choices-text-remove-button">
              Produk / variant
            </label>
            <Select isDisabled={formData?.is_by_product == 0 || formData?.discount_by == 0} className="select2 z-5" options={produkOptions} value={selectedProduk} onChange={(e) => setSelectedProduk(e)} />
          </div>

          {formData?.discount_by == 1 && <FormInput name='name' label='persentase' value={formData.discount_percentage} onChange={(e) => setFormData({ ...formData, discount_percentage: e.target.value })} className={`form-input mb-3`} />}

          {formData?.discount_by == 2 && <FormInput name='name' label='Harga' value={HelperFunction.FormatToRupiah2(formData?.discount_amount || 0)} onChange={(e) => setFormData({ ...formData, discount_amount: parseInt(HelperFunction.onlyNumber(e.target.value)) })} className={`form-input mb-3`} />}

          <div className="mb-3">
            <FormInput label="Date" type="date" name="Tanggal Mulai" containerClass="mb-3" labelClassName="mb-2" className="form-input" key="date" value={formData?.start_date} onChange={(v) => setFormData({ ...formData, start_date: dayjs(v.target.value).format("YYYY-MM-DD") })} />
          </div>

          <div className="mb-3">
            <FormInput label="Date" type="date" name="Tanggal Akhir" containerClass="mb-3" labelClassName="mb-2" className="form-input" key="date" value={formData?.end_date} onChange={(v) => setFormData({ ...formData, end_date: dayjs(v.target.value).format("YYYY-MM-DD") })} />
          </div>




          {!isCreate && (
            <div className='mb-2'>
              <h6 className='text-sm mb-2'>Status</h6>
              <input type='checkbox' checked={formData.is_active === 1 ? true : false} onChange={(e) => setFormData({ ...formData, is_active: e.target.checked ? 1 : 0 })} />
              <label className='ml-2'>Aktif</label>
            </div>
          )}

        </div>


        <div className='flex justify-end p-4 border-t gap-x-4'>
          <button className='btn bg-light text-gray-800' onClick={() => toggleModal()}>Close</button>
          <button className='btn bg-primary text-white' onClick={postData}>Submit</button>
        </div>
      </div>
    </ModalLayout>
  )
}
