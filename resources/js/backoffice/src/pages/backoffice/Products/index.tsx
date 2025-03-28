import React, { useEffect, useState } from 'react';
import { FormInput, PageBreadcrumb } from '../../../components';
import TablePaginate from '../../../components/Table/tablePaginate';
import LoadingScreen from '../../../components/Loading/loading';
import { Size } from '../../../dto/size';
import { ModalAdd } from './ModalAdd';
import { Products } from '../../../dto/products';
import { GetProducts } from '../../../helpers/api/Products';
import { HelperFunction } from '../../../helpers/HelpersFunction';
import { useNavigate } from 'react-router-dom';
import ModalPreviewMulti from '../../../components/ModalPreviewImage/ModalPreviewMulti';
import { useDebounce } from 'use-debounce';
import { GetCategories } from '../../../helpers/api/categories';
import Select from 'react-select';


const Index = () => {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<any>({ name: '', value: '', is_active: 1 });
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [dataPaginate, setDataPaginate] = useState<any>(null);
  const [previewImage, setPreviewImage] = useState(false)
  const [search, setSearch] = useState<any>('')
  const [ProductName] = useDebounce(search, 1000);
  const [category, setCategory] = useState(null);
  const [categoryOptions, setCategoryOptions] = useState<any>([])


  const fetchData = async (page = 1, name = undefined, category = undefined) => {
    setLoading(true);
    const params = {
      page,
      name,
      category_id: category
    }

    const queryString = new URLSearchParams(
      JSON.parse(JSON.stringify(params))
    ).toString();

    const res: Size[] = await GetProducts(`?${queryString}`)
    setDataPaginate(res);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    GetCategories().then((res) => {
      setCategoryOptions([{value: "", label: "Semua"}, ...HelperFunction.FormatOptions(res?.data, 'name', 'id')])
    })
  }, []);


  useEffect(() => {
    fetchData(0, search.length > 0 ? search : undefined)
  }, [ProductName])



  const columns = [
    { name: 'Nama', row: (cell: Products) => <div className='w-[200px] text-wrap'>{cell.name}</div> },
    { name: 'Harga', row: (cell: Products) => <div>{HelperFunction.FormatToRupiah(cell.final_price)}</div> },
    { name: 'Pengunjung', row: (cell: Products) => <div>{HelperFunction.FormatToRupiah2(cell.visited)}</div> },
    // { name: 'Diskon', row: (cell:Products) => <div>{cell.discount_price}</div> },
    {
      name: 'Image', row: (cell: Products) => <button className='btn bg-success text-white' onClick={() => { setPreviewImage(true); setFormData(cell) }}>
        Preview image
      </button>
    },
    { name: 'Tersedia', row: (cell: Products) => <div>{cell.stock >= 1 ? "Available" : "Not Available"}</div> },
    { name: 'Status', row: (cell: Products) => <div>{cell.is_active ? 'Active' : 'Non Active'}</div> },
    {
      name: 'Action', row: (cell: Products) => (
        <div className="flex gap-x-3">
          <button className='btn bg-primary text-white' onClick={() => { setModal(true); setFormData(cell); setIsCreate(false); }}>
            Edit
          </button>
          {/* <button className='btn bg-secondary text-white' onClick={() => { navigate('/backoffice/variants')}}>
          Settings Variant
        </button> */}
        </div>
      )
    }
  ];


  
	const handleSearch = (v) => {
		setLoading(true);
		setCategory(v)
		fetchData(0, search, v.value == "Semua" ? undefined : v.value);
	}

  return (
    <>
      {loading && <LoadingScreen />}
      <ModalPreviewMulti toggleModal={() => setPreviewImage(false)} isOpen={previewImage} img={formData?.images} />
      {modal && (
        <ModalAdd reloadData={fetchData} isCreate={isCreate} toggleModal={() => setModal(false)} isOpen={modal} setLoading={setLoading} detailData={formData} />
      )}
      <PageBreadcrumb title='Products' subName='Backoffice' />
      <div className='bg-white p-4 '>
        <div className='flex justify-between'>
          <h3 className='text-2xl font-bold'>Products</h3>
          <button className='btn bg-primary mb-4 text-white' onClick={() => { setModal(true); setIsCreate(true); setFormData({ name: '', format_size: '', is_active: 1 }); }}>Tambah Data</button>
        </div>
        <h3 className='text-lg mb-2'>Search</h3>
        <div className="mb-3 bg-gray-50 px-4 py-6 flex ">
          <div className="flex gap-x-6">
            <FormInput label="Nama Product" type="input" containerClass="mb-3" labelClassName="mb-2" className="form-input w-[200px]" value={search} onChange={(v) => setSearch(v.target.value)} name={'search'} />
            <div className="flex flex-col flex-1">
						<label className="mb-2" htmlFor="choices-text-remove-button">
							Kategori
						</label>
						<Select className="select2 z-5 w-[200px]" options={categoryOptions} onChange={(v) => handleSearch(v)} value={category} />
					</div>
          </div>
        
        </div>
        <p className='mb-2'>Total Data : {dataPaginate?.total}</p>
        <TablePaginate totalPage={dataPaginate?.last_page || 0} data={dataPaginate?.data} columns={columns} onPageChange={(val) => fetchData(val.selected + 1)} />
      </div>
    </>
  );
};

export default Index;
