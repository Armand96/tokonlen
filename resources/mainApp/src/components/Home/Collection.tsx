'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import { useRouter } from 'next/navigation';
import Baju from '@/images/dumny/baju-3.jpg'
import FetchData from '@/services/FetchData';
import Helpers from '@/Helpers/Helpers';

const Collection = () => {
    const router = useRouter()
        const [listCategories, setListCategories] = useState<any>([])
    

    const handleTypeClick = (type: string) => {
        router.push(`/shop/?category=${type}`);
    };

    useEffect(() => {
        FetchData.GetCategories().then((res) => {
            setListCategories(res?.data)
        })
    },[])

    return (
        <>
            <div className="collection-block md:pt-20 pt-10">
                <div className="container">
                    <div className="heading3 text-center">Kategori</div>
                </div>
                <div className="list-collection section-swiper-navigation md:mt-10 mt-6 sm:px-5 px-4">
                    <Swiper
                        spaceBetween={12}
                        navigation
                        loop={true}
                        modules={[Navigation, Autoplay]}
                        breakpoints={{
                            576: {
                                slidesPerView: 1,
                                spaceBetween: 12,
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                            1200: {
                                slidesPerView: 4,
                                spaceBetween: 20,
                            },
                        }}
                        className='h-full'
                    >
                     {
                        listCategories.map((item: any, index: number) => (
                            <SwiperSlide key={index}>
                            <div className="collection-item mx-auto w-[300px] h-[250px] block relative rounded-2xl overflow-hidden cursor-pointer" onClick={() => handleTypeClick(item?.slug)}>
                                <div className="bg-img">
                                    <Image
                                        src={Helpers.GetImage(item?.image)}
                                        width={300}
                                        height={300}
                                        alt={item?.name}
                                        className=' object-cover'
                                    />
                                </div>
                                <div className="collection-name heading5 text-center sm:bottom-8 bottom-1 lg:w-[200px] md:w-[160px] w-[100px] md:py-3  py-1.5 bg-white rounded-xl text-xl duration-500">{item?.name}</div>
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

export default Collection