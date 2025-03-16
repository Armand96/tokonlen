'use client'

import React, { Component, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css/bundle';
import 'swiper/css/effect-fade';
import FetchData from '@/services/FetchData';


const SliderFour = () => {

    const [listBanner, setListBanner] = useState<any>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        FetchData.GetBanners().then((res) => {
            console.log(res)
            setListBanner(res.data)
            setLoading(false)
        })
    }, [])


    return (
        <>
            <div className="slider-block style-two bg-gray-600  xl:h-screen lg:h-[800px] md:h-[580px] sm:h-[500px] h-[350px] max-[420px]:h-[320px] w-full">
                <div className="slider-main h-full w-full overflow-hidden">
                    <Swiper
                        spaceBetween={0}
                        slidesPerView={1}
                        loop={true}
                        pagination={{ clickable: true }}
                        modules={[Pagination, Autoplay]}
                        className='h-full relative dots-white overflow-hidden'
                        autoplay={{
                            delay: 4000,
                        }}
                    >
                        {
                            listBanner?.map((item: any, index: number) => (
                                <SwiperSlide key={index}>
                                    <div className="slider-item h-full w-full relative overflow-hidden">
                                        <div className="container w-full h-full">
                                            <div className="text-content w-full h-full flex flex-col items-center justify-center">
                                                {/* <div className="text-sub-display text-white text-center">Sale! Up To 50% Off!</div> */}
                                                {/* <div className="text-display text-white text-center md:mt-5 mt-2">Trendy Women{String.raw`'s`} <br />Clothing</div> */}
                                                {/* <Link href='/shop/-img' className="button-main bg-white text-black hover:bg-black hover:text-white md:mt-8 mt-3">Shop Now</Link> */}
                                            </div>
                                            <div className="sub-img absolute left-0 top-0 w-full h-full z-[-1]">
                                                <Image
                                                    src={process.env.NEXT_PUBLIC_URL_STORAGE + item?.image}
                                                    width={2560}
                                                    height={1080}
                                                    alt='bg4-1'
                                                    priority={true}
                                                    className='w-full h-full object-cover'
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))

                        }


                    </Swiper>
                </div>
            </div>
        </>
    )
}

export default SliderFour