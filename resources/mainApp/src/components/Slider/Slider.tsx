'use client'

import React, { Component } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css/bundle';
import 'swiper/css/effect-fade';
import DumnyImage from '@/images/dumny/dumny.jpg'


const SliderOne = () => {
    return (
        <>
            <div className="slider-block style-one bg-linear xl:h-[860px] lg:h-[800px] md:h-[580px] sm:h-[500px] h-[350px] max-[420px]:h-[320px] w-full">
                <div className="slider-main h-full w-full">
                    <Swiper
                        spaceBetween={0}
                        slidesPerView={1}
                        loop={true}
                        pagination={{ clickable: true }}
                        modules={[Pagination, Autoplay]}
                        className='h-full relative'
                        autoplay={{
                            delay: 4000,
                        }}
                    >
                        <SwiperSlide>
                            <div className="slider-item h-full w-full relative">
                                <div className="container w-full h-full flex items-center relative">
                                    <div className="text-content basis-1/2">
                                        <div className="text-sub-display">Sale! Up To 50% Off!</div>
                                        <div className="text-display md:mt-5 mt-2">Diskon Khusus untuk mu</div>
                                        <Link href='/shop/breadcrumb' className="button-main md:mt-8 mt-3">Beli sekarang</Link>
                                    </div>
                                    <div className="sub-img md:absolute  md:w-1/2 w-[200px] 2xl:-right-[60px] -right-[10px] md:-right-[0] bottom-0">
                                        <Image
                                            src={DumnyImage}
                                            width={670}
                                            height={936}
                                            alt='bg1-1'
                                            priority={true}
                                        />
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="slider-item h-full w-full relative">
                                <div className="container w-full h-full flex items-center relative">
                                    <div className="text-content basis-1/2">
                                        <div className="text-sub-display">Kualitas terjamin</div>
                                        <div className="text-display md:mt-5 mt-2">Dengan bahan terbaik buatan lokal</div>
                                        <Link  href='/shop/breadcrumb' className="button-main md:mt-8 mt-3">Beli sekarang</Link>
                                    </div>
                                    <div className="sub-img md:absolute  md:w-1/2 w-[200px] 2xl:-right-[60px] -right-[10px] md:-right-[0] bottom-0">
                                        <Image
                                            src={DumnyImage}
                                            width={670}
                                            height={936}
                                            alt='bg1-1'
                                            priority={true}
                                        />
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="slider-item h-full w-full relative">
                                <div className="container w-full h-full flex items-center relative">
                                    <div className="text-content basis-1/2">
                                        <div className="text-sub-display">Sale! Up To 50% Off!</div>
                                        <div className="text-display md:mt-5 mt-2">Stylish Looks for Any Season</div>
                                        <Link href='/shop/breadcrumb-img' className="button-main md:mt-8 mt-3">Shop Now</Link>
                                    </div>
                                    <div className="sub-img md:absolute  md:w-1/2 w-[200px] 2xl:-right-[60px] -right-[10px] md:-right-[0] bottom-0">
                                        <Image
                                            src={DumnyImage}
                                            width={670}
                                            height={936}
                                            alt='bg1-1'
                                            priority={true}
                                        />
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </>
    )
}

export default SliderOne