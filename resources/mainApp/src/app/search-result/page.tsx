'use client'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import MenuOne from '@/components/Header/Menu/MenuOne'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import Footer from '@/components/Footer/Footer'
import { ProductType } from '@/type/ProductType'
import productData from '@/data/Product.json'
import Product from '@/components/Product/Product'
import HandlePagination from '@/components/Other/HandlePagination'
import * as Icon from "@phosphor-icons/react/dist/ssr";
import FetchData from '@/services/FetchData'
import Loading from '@/components/Other/Loading'

const SearchResult = () => {
    const [searchKeyword, setSearchKeyword] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(0);
    const [produk, setProduk] = useState<any>();
    const [loading, setLoading] = useState(false)
    const productsPerPage = 8;
    const offset = currentPage * productsPerPage;
    let filteredData = productData

    const router = useRouter()

    const handleSearch = (value: string) => {
        router.push(`/search-result?query=${value}`)
        setSearchKeyword('')
    }

    const searchParams = useSearchParams()
    let query = searchParams.get('query') as string

    useEffect(() => {
        setLoading(true)
        FetchData.SearchAll(query).then((res) => {
            setProduk(res?.data?.products)
            setLoading(false)
        })
    },[query])



    // Find page number base on filteredData
    const pageCount = Math.ceil(filteredData.length / productsPerPage);

    // If page number 0, set current page = 0
    if (pageCount === 0) {
        setCurrentPage(0);
    }

    // Get product data for current page
    let currentProducts: ProductType[];

    if (filteredData.length > 0) {
        currentProducts = filteredData.slice(offset, offset + productsPerPage);
    } else {
        currentProducts = []
    }

    const handlePageChange = (selected: number) => {
        setCurrentPage(selected);
    };


    return (
        <>
        {
            loading && <Loading />
        }
            <div id="header" className='relative w-full'>
                <MenuOne props="bg-transparent" />
                <Breadcrumb heading='Hasil Pencarian' subHeading='Hasil Pencarian' />
            </div>
            <div className="shop-product breadcrumb lg:py-20 md:py-14 py-10">
                <div className="container">
                    <div className="heading flex flex-col items-center">
                        <div className="heading4 text-center">hasil dari {String.raw`"`}{query}{String.raw`"`} ditemukan {produk?.length} produk </div>
                        <div className="input-block lg:w-1/2 sm:w-3/5 w-full md:h-[52px] h-[44px] sm:mt-8 mt-5">
                            <div className='w-full h-full relative'>
                                <input
                                    type="text"
                                    placeholder='Search...'
                                    className='caption1 w-full h-full pl-4 md:pr-[150px] pr-32 rounded-xl border border-line'
                                    value={searchKeyword}
                                    onChange={(e) => setSearchKeyword(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchKeyword)}
                                />
                                <button
                                    className='button-main absolute top-1 bottom-1 right-1 flex items-center justify-center'
                                    onClick={() => handleSearch(searchKeyword)}
                                >
                                    search
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="list-product-block relative md:pt-10 pt-6">
                        <div className="heading6">Hasil Pencarian :  {query}</div>
                        <div className={`list-product hide-product-sold grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 sm:gap-[30px] gap-[20px] mt-5`}>
                            {produk?.map((item: any, index: number) => (

                                    <Product key={index} data={item} type='grid' style={''} />
                            ))}
                            { produk?.data?.length < 0 &&    <div className="no-data-product">Produk tidak ditemukan.</div>}

                        </div>

                        {/* {pageCount > 1 && (
                            <div className="list-pagination flex items-center justify-center md:mt-10 mt-7">
                                <HandlePagination pageCount={pageCount} onPageChange={handlePageChange} />
                            </div>
                        )} */}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default SearchResult