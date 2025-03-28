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
import { GetVariants, PostDeleteVariantsImage, PostVariants, PostVariantsBulks, PostVariantsImage } from '../../../helpers/api/variants';
import Swal from 'sweetalert2';
import { PostDiscount } from '../../../helpers/api/discounts';


interface ModalAddTypes {
  isOpen: boolean,
  toggleModal: () => void,
  isCreate: boolean,
  handlePost: (parms: any) => void,
  detailData: Variants,
  reloadData: () => void
  setLoading: (loading: any) => void,
}

export const ModalAdd = ({ isOpen, toggleModal, isCreate, detailData, reloadData, setLoading }: ModalAddTypes) => {
  const [formData, setFormData] = useState<any>({
    additional_price: 0,
    is_active: 1
  })
  const [imageDelete, setImageDelete] = useState<any>([])
  const [oldImages, setOldImages] = useState<any>([])
  const [productsOptions, setProductsOptions] = useState<any[]>()
  const [selectedProducts, setSelectedProducts] = useState<any>()
  const [selectedSized, setSelectedSized] = useState<any[]>([])
  const [sizeList, setSizeList] = useState<any>()

  useEffect(() => {
    setLoading(true)

    Promise.all([
      GetSize(`?data_per_page=99999&is_active=1`),
      GetProducts(`?data_per_page=99999&is_active=1`)
    ])
      .then((res) => {
        setSizeList(res[0]?.data)
        setProductsOptions(HelperFunction.FormatOptions(res[1]?.data, 'name', 'id'))
        if (!isCreate) {
          GetVariants(`/${detailData?.id}`).then((res) => {
            setSelectedProducts({ value: res.data.product.id, label: res.data.product.name })
            setOldImages(res?.data?.images)
            setFormData({ ...formData, ...res.data })
            setLoading(false)
          })
        } else {
          setLoading(false)
        }

      })



  }, [])

  console.log(selectedProducts?.detail?.variant?.filter((prev) => prev.variant.toLowerCase() == formData?.variant?.toLowerCase()))

  const postDataAdd = async () => {

    let postDataCreate: PostVariantsTypes[] = selectedSized.map((size) => ({
      variant: formData?.variant,
      size: size,
      product_id: selectedProducts?.value,
      additional_price: formData?.additional_price || 0,
      is_active: formData?.is_active,
      stock: formData?.stock
    }))

    let findExsting = selectedProducts?.detail?.variant?.filter((prev) => prev.variant.toLowerCase() == formData?.variant?.toLowerCase())

    if(findExsting){
      postDataCreate = postDataCreate.filter((newData) => findExsting?.flatMap((x) => (x.size)).includes(newData.size) == false)
    }

    if(postDataCreate.length == 0){
      Swal.fire('Warning', 'size yang dipilih telah terdaftar di nama variant ini', 'warning');
      return
    }


    try {
      setLoading(true);

      await GetProducts(`/${selectedProducts?.value}`).then((res) => {
        if (res?.data?.discount?.id) {
          PostDiscount({ '_method': 'DELETE' }, res?.data?.discount?.id)
        }
      })


      let response;
      response = await PostVariantsBulks({
        variants: postDataCreate,
      });

      let idResponse = response.data.data.map((item: any) => item.id);

      if (formData.image_files?.length > 0) {
        const uploadPromises = idResponse.map(async (id: any) => {
          for (const file of Array.from(formData.image_files)) {
            await new Promise((resolve) => {
              setTimeout(async () => {
                await PostVariantsImage({
                  variant_id: id,
                  image_file: file,
                });
                resolve(null);
              }, 1000);
            });
          }
        });

        await Promise.all(uploadPromises); // Tunggu semua upload selesai sebelum lanjut
      }

      toggleModal();
      Swal.fire('Success', 'Input Variant berhasil', 'success');
      reloadData();
    } catch (error) {
      Swal.fire('Error', error.message || 'Terjadi kesalahan', 'error');
    } finally {
      setLoading(false); // Pindahkan setLoading ke finally agar selalu dieksekusi
    }


  }

  const postEdit = async () => {
    setLoading(true)

    try {
      const postDataEdit: PostVariantsTypes = {
        variant: formData?.variant,
        product_id: selectedProducts?.value,
        additional_price: formData?.additional_price,
        is_active: formData?.is_active,
        stock: formData?.stock,
        size: formData?.size,
        id: formData?.id,
        _method: "PUT"
      }

      await GetProducts(`/${formData?.product_id}`).then((res) => {
        if (res?.data?.discount?.id) {
          PostDiscount({ '_method': 'DELETE' }, res?.data?.discount?.id)
        }
      })

      await PostVariants(postDataEdit, formData?.id);


      if (imageDelete.length > 0) {
        await PostDeleteVariantsImage({
          '_method': 'DELETE',
          "ids": imageDelete
        })

      }

      if (formData.image_files?.length > 0) {
        const uploadImagesSequentially = async () => {
          for (const file of Array.from(formData.image_files)) {
            await new Promise((resolve) => {
              setTimeout(async () => {
                await PostVariantsImage({
                  variant_id: formData?.id,
                  image_file: file,
                });
                resolve(null);
              }, 1000);
            });
          }
        };


        await uploadImagesSequentially();

      }

      toggleModal();


      Swal.fire('Success', 'Edit Variant berhasil', 'success');
      reloadData();
      setLoading(false);
    } catch (error) {
      Swal.fire('Error', error.message || 'Terjadi kesalahan', 'error');
      setLoading(false);
    }
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
    setImageDelete([...imageDelete, parms])

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
            <Select isDisabled={!isCreate} className="select2 z-5" options={productsOptions} onChange={(v) => setSelectedProducts(v)} value={selectedProducts} />
          </div>

          <FormInput name='variant' label='Nama Variant' value={formData.variant} onChange={(e) => setFormData({ ...formData, variant: e.target.value })} className='form-input mb-3' />

          <FormInput labelClassName='mb-2' name='additional_price' label='Harga Tambahan' value={HelperFunction.FormatToRupiah2(formData?.additional_price || 0)} onChange={(e) => setFormData({ ...formData, additional_price: parseInt(HelperFunction.onlyNumber(e.target.value)) })} className='form-input mb-3' />

          <div className="mb-3">
            <h6 className="text-sm mb-2">Variant Tersedia ?</h6>
            <div className="flex gap-5">
              <div className="flex items-center">
                <input type="radio" className="form-radio text-primary" name="InlineRadio" id="InlineRadio01" onChange={() => setFormData({ ...formData, stock: 1 })} checked={formData?.stock === 1} />
                <label className="ms-1.5" htmlFor="InlineRadio01">
                  Ya
                </label>
              </div>
              <div className="flex items-center">
                <input type="radio" className="form-radio text-primary" name="InlineRadio" id="InlineRadio02" onChange={() => setFormData({ ...formData, stock: 0 })} checked={formData?.stock === 0} />
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
                  <input type='checkbox' disabled={!isCreate} checked={isCreate ? selectedSized.includes(item?.format_size || formData?.size) : item?.format_size == formData.size} onClick={() => selectedSized.includes(item?.format_size) ? setSelectedSized([...selectedSized.filter((x) => x !== item?.format_size || item?.size)]) : setSelectedSized([...selectedSized, item?.format_size])} />
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
          <button className='btn bg-primary text-white' disabled={!selectedProducts || !formData?.stock || !formData?.image_files || !selectedSized } onClick={() => isCreate ? postDataAdd() : postEdit()}>Submit</button>
        </div>
      </div>
    </ModalLayout>
  )
}
