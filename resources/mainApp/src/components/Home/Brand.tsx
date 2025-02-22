'use client'

import React from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, } from 'swiper/modules';
import 'swiper/css/bundle';
import Logo from '@/images/dumny/brand/Logo1.jpg'
import Logo2 from '@/images/dumny/brand/Logo2.jpg'
import Logo3 from '@/images/dumny/brand/Logo3.jpg'

const Brand = () => {
    return (
        <>
            <div className="brand-block md:py-[60px] py-[32px]">
                <div className="container">
                <div className="heading3 text-center">Brand Kami</div>
                <div className="list-brand">
                        <Swiper
                            spaceBetween={12}
                            slidesPerView={2}
                            loop={true}
                            modules={[Autoplay]}
                            autoplay={{
                                delay: 4000,
                            }}
                            breakpoints={{
                                500: {
                                    slidesPerView: 3,
                                    spaceBetween: 16,
                                },
                                680: {
                                    slidesPerView: 3,
                                    spaceBetween: 16,
                                },
                                992: {
                                    slidesPerView: 3,
                                    spaceBetween: 16,
                                },
                                1200: {
                                    slidesPerView: 3,
                                    spaceBetween: 16,
                                },
                            }}
                        >
                            <SwiperSlide>
                                <div className="brand-item relative flex items-center justify-center ">
                                    <Image
                                        src={Logo}
                                        width={300}
                                        height={300}
                                        alt='1'
                                        className='h-full w-auto duration-500 relative object-cover'
                                    />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="brand-item relative flex items-center justify-center">
                                    <Image
                                        src={Logo2}
                                        width={300}
                                        height={300}
                                        alt='1'
                                        className='h-full w-auto duration-500 relative object-cover'
                                    />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="brand-item relative flex items-center justify-center">
                                    <Image
                                        src={Logo3}
                                        width={300}
                                        height={300}
                                        alt='1'
                                        className='h-full w-auto duration-500 relative object-cover'
                                    />
                                </div>
                            </SwiperSlide>
                            {/* <SwiperSlide>
                                <div className="brand-item relative flex items-center justify-center">
                                    <Image
                                        src={Logo4}
                                        width={300}
                                        height={300}
                                        alt='1'
                                        className='h-full w-auto duration-500 relative object-cover'
                                    />
                                </div>
                            </SwiperSlide> */}
                           
                        </Swiper>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Brand