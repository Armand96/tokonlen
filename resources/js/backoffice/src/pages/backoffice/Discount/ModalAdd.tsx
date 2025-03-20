import React, { useEffect, useState } from 'react'
import { ModalLayout } from '../../../components/HeadlessUI';
import { FormInput } from '../../../components';
import Select from 'react-select'
import { Products } from '../../../dto/products';
import 'react-quill/dist/quill.snow.css'
import { GetProducts } from '../../../helpers/api/Products';
import { HelperFunction } from '../../../helpers/HelpersFunction';
import { GetVariants } from '../../../helpers/api/variants';
import dayjs from 'dayjs'
import { GetDiscount, PostDiscount } from '../../../helpers/api/discounts';
import Swal from 'sweetalert2';
import { PostDiscountTypes } from '../../../dto/discounts';

interface ModalAddTypes {
  isOpen: boolean,
  toggleModal: () => void,
  isCreate: boolean,
  handlePost: (parms: any) => void,
  detailData: Products,
  reloadData: () => void
  setLoading: (loading: any) => void,
}

export const ModalAdd = ({ isOpen, toggleModal, isCreate, detailData, setLoading, reloadData }: ModalAddTypes) => {
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
  const [selectedProduk, setSelectedProduk] = useState<any>({ label: "", value: 0 })


  useEffect(() => {
    if (!isCreate) {
      GetDiscount(`/${detailData?.id}`).then((res) => {
        setFormData({ ...formData, ...res?.data, is_by_product: res?.data?.product ? 1 : 2, discount_by: res?.data?.discount_percentage > 0 ? 1 : 2, start_date: dayjs(res?.data?.start_date).format("YYYY-MM-DD"), end_date: dayjs(res?.data?.end_date).format("YYYY-MM-DD") })

        if (res?.data?.product) {
          setSelectedProduk({ value: res?.data?.product?.id, label: res?.data?.product?.name })
        } else {
          setSelectedProduk({ value: res?.data?.variant?.id, label: `${res?.data?.variant?.variant} - ${res?.data?.variant?.product?.name} -  ${res?.data?.variant?.size} ` })
        }
      })
    }
  }, [detailData])


  const updateProdukOptions = async (product = formData?.is_by_product, discount = formData?.discount_by) => {
    try {
      if (product !== 0 && discount !== 0) {
        const endpoint = product === 1 ? GetProducts : GetVariants;
        const key = product === 1 ? 'name' : 'variant';

        const res = await endpoint(`?is_active=1&data_per_page=999999`);
        setProdukOptions(product === 1 ? HelperFunction.FormatOptions(res.data, key, 'id',) : HelperFunction.FormatOptionsVariants(res.data, key, 'id'));
        setSelectedProduk({ label: "", value: 0 });
      }

      setFormData({ ...formData, discount_percentage: 0, discount_amount: 0, is_by_product: product, discount_by: discount });

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  const postData = async () => {
    setLoading(true)
    if (formData?.is_by_product === 1 ) {
      await GetProducts(`/${selectedProduk?.value}`).then((res) => {
        if (res?.data?.discount?.id && res?.data?.discount?.id !== formData?.id) {
          PostDiscount({ '_method': 'DELETE' }, res?.data?.discount?.id)
        }
      })

    } else {
      await GetVariants(`/${selectedProduk?.value}`).then((res) => {
        if (res?.data?.discount?.id && res?.data?.discount?.id !== formData?.id) {
          PostDiscount({ '_method': 'DELETE' }, res?.data?.discount?.id)
        }
      })
    }

    let postDataCreate: PostDiscountTypes = {
      product_id: formData?.is_by_product == 1 ? selectedProduk?.value : 0,
      variant_id: formData?.is_by_product == 2 ? selectedProduk?.value : 0,
      discount_percentage: formData?.discount_by == 1 ? formData?.discount_percentage : '0',
      discount_amount: formData?.discount_by == 2 ? formData?.discount_amount : '0',
      start_date: formData?.start_date,
      end_date: formData?.end_date,
      '_method': isCreate ? 'POST' : 'PUT'
    }

    await PostDiscount(postDataCreate, formData?.id).then((res) => {
      toggleModal();
      Swal.fire('Success', isCreate ? 'Input Discount berhasil' : 'Edit Discount berhasil', 'success');
      reloadData();
      setLoading(false)
    }).catch((error) => {
      console.log(error)
      Swal.fire('Error', error || 'Terjadi kesalahan', 'error');
      setLoading(false)

    })


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
                <input type="radio" className="form-radio text-primary" name="InlineRadio" id="produk" onChange={() => { setFormData({ ...formData, is_by_product: 1 }); updateProdukOptions(1, undefined) }} checked={formData.is_by_product == 1} />
                <label className="ms-1.5" htmlFor="produk">
                  produk
                </label>
              </div>
              <div className="flex items-center">
                <input type="radio" className="form-radio text-primary" name="InlineRadio" id="variant" onChange={() => { setFormData({ ...formData, is_by_product: 2 }); updateProdukOptions(2, undefined) }} checked={formData.is_by_product == 2} />
                <label className="ms-1.5" htmlFor="variant">
                  variant
                </label>
              </div>
            </div>
          </div>

          <div className="mb-3">
            <h6 className="text-sm mb-2">diskon berdasarkan</h6>
            <div className="flex gap-5">
              <div className="flex items-center">
                <input type="radio" className="form-radio text-primary" name="InlineRadio2" id="persentase" onChange={() => { setFormData({ ...formData, discount_by: 1 }); updateProdukOptions(undefined, 1) }} checked={formData?.discount_by == 1} />
                <label className="ms-1.5" htmlFor="persentase">
                  Presentase
                </label>
              </div>
              <div className="flex items-center">
                <input type="radio" className="form-radio text-primary" name="InlineRadio2" id="harga" onChange={() => { setFormData({ ...formData, discount_by: 2 }); updateProdukOptions(undefined, 2) }} checked={formData?.discount_by == 2} />
                <label className="ms-1.5" htmlFor="harga">
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

          {formData?.discount_by == 1 && <FormInput name='name' label='persentase' value={formData?.discount_percentage} onChange={(e) => setFormData({ ...formData, discount_percentage: parseInt(e.target.value) > 100 ? 100 : e.target.value })} className={`form-input mb-3`} />}

          {formData?.discount_by == 2 && <FormInput name='name' label='Harga' value={HelperFunction.FormatToRupiah2(parseInt(formData?.discount_amount) || 0)} onChange={(e) => setFormData({ ...formData, discount_amount: parseInt(HelperFunction.onlyNumber(e.target.value)) })} className={`form-input mb-3`} />}

          <div className="mb-3">
            <FormInput label="Tanggal Mulai" type="date" name="Tanggal Mulai" containerClass="mb-3" labelClassName="mb-2" className="form-input" key="Tanggal Mulai" value={formData?.start_date} onChange={(v) => setFormData({ ...formData, start_date: dayjs(v.target.value).format("YYYY-MM-DD") })} />
          </div>

          <div className="mb-3">
            <FormInput label="Tanggal Akhir" type="date" name="Tanggal Akhir" containerClass="mb-3" labelClassName="mb-2" className="form-input" key="Tanggal Akhir" value={formData?.end_date} onChange={(v) => setFormData({ ...formData, end_date: dayjs(v.target.value).format("YYYY-MM-DD") })} />
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
