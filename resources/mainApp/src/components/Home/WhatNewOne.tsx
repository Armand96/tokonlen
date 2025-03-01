'use client'

import React, { useEffect, useState } from 'react'
import Product from '../Product/Product'
import { ProductType } from '@/type/ProductType'
import { motion } from 'framer-motion'
import productData from '@/data/Product.json'
import FetchData from '@/services/FetchData'
import Loading from '../Other/Loading';
import { useRouter } from 'next/navigation'

interface Props {
    start: number;
    limit: number;
}

const WhatNewOne: React.FC<Props> = ({ start, limit }) => {
    const [activeTab, setActiveTab] = useState<any>(0);
    const [categories, setCategories] = useState<any>([])
    const [produk, setProduk] = useState<any>([])
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    const handleTabClick = (type: any) => {
        setActiveTab(type);
    };

    useEffect(() => {
        setLoading(true)
        Promise.all([FetchData.GetCategories(), FetchData.GetProduk()]).then((res) => {
            setCategories([{id: "", name: "all" }, ...res[0].data]);
            setProduk(res[1].data);
            setLoading(false)
        })
    }, [])

    const changeList = (categories: any,index: string) => {
        setLoading(true)
        FetchData.GetProduk(`${categories?.id ?  `?category_id=${categories?.id}&order_by=release_date&order_method=desc` : "?order_by=release_date&order_method=desc" } `).then((res) => {
            handleTabClick(index)
            setProduk(res.data);
            setLoading(false)
        })
    }

    return (
        <>
            {loading && <Loading />}
            <div className="whate-new-block md:pt-20 pt-10">
                <div className="container">
                    <div className="heading flex flex-col items-center text-center">
                        <div className="heading3">Produk terbaru</div>
                        <div className="menu-tab flex items-center gap-2 p-1 bg-surface rounded-2xl mt-6">
                            {categories?.slice(0, 5).map((item: any, index: string) => (
                                <div
                                    key={index}
                                    className={`tab-item relative text-secondary text-button-uppercase py-2 px-5 cursor-pointer duration-500 hover:text-black ${activeTab == index ? 'active' : ''}`}
                                    onClick={() => changeList(item,index) }
                                >
                                    {activeTab == index && (
                                        <motion.div layoutId='active-pill' className='absolute inset-0 rounded-2xl bg-white'></motion.div>
                                    )}
                                    <span className='relative text-button-uppercase z-[1]'>
                                        {item?.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="list-product hide-product-sold grid lg:grid-cols-4 grid-cols-2 sm:gap-[70px] gap-[20px] md:mt-10 mt-6">
                        {produk.slice(0,8).map((prd: any, index: string) => (
                            <Product data={prd} type='grid' key={index} style='style-1' />
                        ))}
                    </div>
                </div>
            </div>
            <button onClick={() => router.push('/shop/breadcrumb')} className={`button-main block mt-[20px] md:mt-[100px] mb-[50px] mx-auto text-center`} >Lihat Semua Produk</button>
        </>
    )
}

export default WhatNewOne