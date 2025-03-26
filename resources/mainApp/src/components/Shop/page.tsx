'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import * as Icon from "@phosphor-icons/react/dist/ssr";
import Product from '../Product/Product';
import 'rc-slider/assets/index.css'
import HandlePagination from '../Other/HandlePagination';
import FetchData from '@/services/FetchData';
import Loading from '../Other/Loading';
import { useRouter } from 'next/navigation';
import qs from 'qs'

interface Props {
    productPerPage: number
    dataType: string | null | undefined
    gender: string | null
    category: string | null
}

const Shopbreadcrumb: React.FC<Props> = ({dataType, gender, category }) => {
    const [showOnlySale, setShowOnlySale] = useState(false)
    const [selectedSort, setSelectedSort] = useState({ order_by: 'release_date', order_method: 'desc' });
    const [isAvailable, setIsAvailable] = useState<boolean>(false)
    const [size, setSize] = useState<any[]>()
    const [brand, setBrand] = useState<any[]>()
    const [selectedBrand, setSelectedBrand] = useState<any>('')
    const [selectedSize, setSelectedSize] = useState<any>('')
    const [listCategories, setListCategories] = useState<any>([])
    const [loading, setLoading] = useState(true)
    const [produk, setProduk] = useState<any>([])
    const router = useRouter()




    const generateParams = ({
        dataType,
        selectedBrand,
        isAvailable,
        selectedSort,
        selectedSize,
        category,
        categories
      }: any) => {
        const queryObject = {
          category_id: dataType ? categories?.id : undefined,
          brand: selectedBrand || undefined,
          has_stock: isAvailable || undefined,
          order_by: selectedSort?.order_by || undefined,
          order_method: selectedSort?.order_method || undefined,
          size: selectedSize || undefined,
          parent_category_id: !dataType ? categories?.find((x: any) => x.slug === category)?.id : undefined
        };
      
        return `?${qs.stringify(queryObject, { skipNulls: true, encode: false })}`;
      };
      
      useEffect(() => {
        setLoading(true);
      
        Promise.all([
          FetchData.GetCategories(dataType ? `/${dataType}` : ''),
          FetchData.GetSize(),
          FetchData.GetBrand()
        ]).then(([categoriesRes, sizeRes, brandRes]) => {
          const categories = categoriesRes?.data;
          const size = sizeRes?.data;
          const brand = brandRes?.data;
      
          setSize(size);
      
          const queryParams = generateParams({
            dataType,
            selectedBrand,
            isAvailable,
            selectedSort,
            selectedSize,
            category,
            categories
          });
      
          FetchData.GetProduk(queryParams)
            .then((produkRes) => {
              setProduk(produkRes);
              setLoading(false);
            });
      
          if (!dataType) {
            setBrand(brand);
            setListCategories(categories);
          }
        });
      }, [category, dataType, selectedSize, selectedBrand, isAvailable, selectedSort]);


    const handleShowOnlySale = () => {
        setShowOnlySale(toggleSelect => !toggleSelect)
    }

    const handleSortChange = (option: string) => {
        let listSort = [
            { order_by: 'discount', order_method: 'desc' },
            { order_by: 'release_date', order_method: 'desc' },
            { order_by: 'release_date', order_method: 'asc' },
            { order_by: 'price', order_method: 'desc' },
            { order_by: 'price', order_method: 'asc' },
        ]
        setSelectedSort(listSort[parseInt(option)]);
    };

    const handleType = (category: string, type: string | null) => {
        router.push(`/shop/?type=${type}&category=${category}`);
    }

    const handleSize = (size: string | null) => {
        setSelectedSize(size)
    }


    const handleBrand = (brand: string) => {
        setSelectedBrand(brand)
    }


    const generateText = () => {
        return dataType?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }




    const handlePageChange = (selected: number) => {
        setLoading(true)
        FetchData.GetProduk(`?page=${selected + 1}&order_by=release_date&order_method=desc`).then((res) => {
            setProduk(res)
            setLoading(false)
        })
    };

    return (
        <>
            {loading && <Loading />}
            <div className="breadcrumb-block style-img">
                <div className="breadcrumb-main bg-linear overflow-hidden">
                    <div className="container lg:pt-[134px] pt-24 pb-10 relative">
                        <div className="main-content w-full h-full flex flex-col items-center justify-center relative z-[1]">
                            <div className="text-content">
                                <div className="heading2 text-center">{!dataType ? 'Shop' : generateText()}</div>
                                <div className="link flex items-center justify-center gap-1 caption1 mt-3">
                                    <Link href={'/'}>Homepage</Link>
                                    <Icon.CaretRight size={14} className='text-secondary2' />
                                    <div className='text-secondary2 capitalize'>{!dataType ? 'Shop' : generateText()}</div>
                                </div>
                            </div>
                            <div className="list-tab flex flex-wrap items-center justify-center gap-y-5 gap-8 lg:mt-[70px] mt-12 overflow-hidden">
                                {listCategories.map((item: any, index: string) => (
                                    <div
                                        key={index}
                                        className={`tab-item text-button-uppercase cursor-pointer has-line-before line-2px ${category === item?.slug ? 'active' : ''}`}
                                        onClick={() => handleType(item?.slug, '')}
                                    >
                                        {item?.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="shop-product breadcrumb lg:py-20 md:py-14 py-10">
                <div className="container">
                    <div className="flex max-md:flex-wrap max-md:flex-col-reverse gap-y-8">
                        <div className="sidebar order-2 lg:order-1 lg:w-1/4 md:w-1/3 w-full md:pr-12">
                            <div className={`filter-type pb-8 border-b border-line ${listCategories.filter((y: any) => y.slug == category)[0]?.sub_cat.length === 0 && "hidden"}`}>
                                <div className="heading6">Sub Kategori</div>
                                <div className="list-type mt-4">
                                    {listCategories.filter((y: any) => y.slug == category).map((item: any, index: string) => {
                                        return item?.sub_cat?.map((x: any) => (
                                            <div
                                                key={index}
                                                className={`item flex items-center justify-between cursor-pointer ${x === item ? 'active' : ''}`}
                                                onClick={() => handleType(category!, x?.slug)}
                                            >
                                                <div className='text-secondary has-line-before hover:text-black capitalize'>{x?.name}</div>
                                            </div>
                                        ))
                                    })}
                                </div>
                            </div>
                            <div className="filter-size pb-8 border-b border-line mt-8">
                                <div className="heading6">Ukuran</div>
                                <div className="list-size flex items-center flex-wrap gap-3 gap-y-4 mt-4">
                                    {
                                        size?.map((item: any, index: number) => (
                                            <div
                                                key={index}
                                                className={`size-item text-button w-[44px] h-[44px] flex items-center justify-center rounded-full border border-line ${selectedSize == item?.format_size ? 'active' : ''}`}
                                                onClick={() => handleSize(item?.format_size)}
                                            >
                                                {item?.format_size}
                                            </div>
                                        ))
                                    }
                                    <div
                                        className={`size-item text-button px-4 py-2 flex items-center justify-center rounded-full border border-line ${!selectedSize ? 'active' : ''}`}
                                        onClick={() => handleSize(null)}
                                    >
                                        semua ukuran
                                    </div>
                                </div>
                            </div>


                            <div className="filter-brand mt-8">
                                <div className="heading6">Brands</div>
                                <div className="list-brand mt-4">
                                    {brand?.map((item, index) => (
                                        <div key={index} className="brand-item flex items-center justify-between">
                                            <div className="left flex items-center cursor-pointer">
                                                <div className="block-input">
                                                    <input
                                                        type="checkbox"
                                                        name={item}
                                                        id={item}
                                                        checked={item === selectedBrand}
                                                        onChange={() => handleBrand(item)} />
                                                    <Icon.CheckSquare size={20} weight='fill' className='icon-checkbox' />
                                                </div>
                                                <label htmlFor={item} className="brand-name capitalize pl-2 cursor-pointer">{item}</label>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>


                        </div>
                        <div className="list-product-block order-1 lg:order-2 lg:w-3/4 md:w-2/3 w-full md:pl-3">
                            <div className="filter-heading flex items-center justify-between gap-5 flex-wrap">
                                <div className="left flex has-line items-center flex-wrap gap-5">
                                    {/* <div className="choose-layout flex items-center gap-2">
                                        <div className="item three-col w-8 h-8 border border-line rounded flex items-center justify-center cursor-pointer active">
                                            <div className='flex items-center gap-0.5'>
                                                <span className='w-[3px] h-4 bg-secondary2 rounded-sm'></span>
                                                <span className='w-[3px] h-4 bg-secondary2 rounded-sm'></span>
                                                <span className='w-[3px] h-4 bg-secondary2 rounded-sm'></span>
                                            </div>
                                        </div>
                                        <Link href={`/shop/sidebar-list?type=${dataType || ""}&category=${category || ""}`} className="item row w-8 h-8 border border-line rounded flex items-center justify-center cursor-pointer">
                                            <div className='flex flex-col items-center gap-0.5'>
                                                <span className='w-4 h-[3px] bg-secondary2 rounded-sm'></span>
                                                <span className='w-4 h-[3px] bg-secondary2 rounded-sm'></span>
                                                <span className='w-4 h-[3px] bg-secondary2 rounded-sm'></span>
                                            </div>
                                        </Link>
                                    </div> */}
                                    <div className="check-sale flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            name="filterSale"
                                            id="filter-sale"
                                            className='border-line'
                                            onChange={handleShowOnlySale}
                                        />
                                        <label htmlFor="filter-sale" className='cation1 cursor-pointer' onClick={() => setIsAvailable(!isAvailable)}>Tersedia</label>
                                    </div>
                                </div>
                                <div className="right flex items-center gap-3">
                                    <div className="select-block relative">
                                        <select
                                            id="select-filter"
                                            name="select-filter"
                                            className='caption1 py-2 pl-3 md:pr-20 pr-10 rounded-lg border border-line'
                                            onChange={(e) => { handleSortChange(e.target.value) }}
                                            defaultValue={'Sorting'}
                                        >
                                            <option value="Sorting" disabled>Sorting</option>
                                            <option value="0">Diskon</option>
                                            <option value="3">Harga tertinggi</option>
                                            <option value="4">Harga terendah</option>
                                            <option value="1">Terbaru</option>
                                            <option value="2">Terlama</option>
                                        </select>
                                        <Icon.CaretDown size={12} className='absolute top-1/2 -translate-y-1/2 md:right-4 right-2' />
                                    </div>
                                </div>
                            </div>

                            <div className="list-filtered flex items-center gap-3 mt-4">
                                <div className="total-product">
                                    {produk?.total}
                                    <span className='text-secondary pl-1'>Total produk</span>
                                </div>
                                {
                                    (selectedSize || selectedBrand) && (
                                        <>
                                            <div className="list flex items-center gap-3">
                                                <div className='w-px h-4 bg-line'></div>

                                                {selectedSize && (
                                                    <div className="item flex items-center px-2 py-1 gap-1 bg-linear rounded-full capitalize" onClick={() => { setSelectedSize(null) }}>
                                                        <Icon.X className='cursor-pointer' />
                                                        <span>{selectedSize}</span>
                                                    </div>
                                                )}
                                                {selectedBrand && (
                                                    <div className="item flex items-center px-2 py-1 gap-1 bg-linear rounded-full capitalize" onClick={() => { setSelectedBrand(null) }}>
                                                        <Icon.X className='cursor-pointer' />
                                                        <span>{selectedBrand}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </>
                                    )
                                }
                            </div>

                            <div className="list-product hide-product-sold grid lg:grid-cols-3 grid-cols-2 sm:gap-[30px] gap-[20px] mt-7">
                                {produk?.data?.length > 0 ? produk?.data?.map((item: any, index: string) => (
                                    <Product key={index} data={item} type='grid' style={''} />
                                )) : <div className="col-span-2 text-xl">Produk tidak ditemukan</div>}

                            </div>

                            {produk?.last_page > 1 && (
                                <div className="list-pagination flex items-center md:mt-10 mt-7">
                                    <HandlePagination pageCount={produk?.last_page} onPageChange={handlePageChange} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Shopbreadcrumb