"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import FetchData from '@/services/FetchData';
import dayjs from 'dayjs';

const Footer = () => {
    
    const [webSettings, setWebSettings] = useState<any>([])
    const [categories, setCategories] = useState([])
    

    useEffect(() => {
        FetchData.GetWebSettings(`?per_page=99999999`).then((res) => {
            setWebSettings(res?.data)
        })
        FetchData.GetCategories().then((res) => {
            setCategories(res.data)
        })
    },[])


    return (
        <>
            <div id="footer" className='footer'>
                <div className="footer-main bg-surface mt-24">
                    <div className="container">
                        <div className="content-footer py-[60px] flex justify-between flex-wrap gap-y-8">
                            <div className="company-infor basis-2/4 max-lg:basis-full pr-7">
                                <Link href={'/'} className="logo">
                                    <div className="heading4 text-3xl">Zhindaya</div>
                                </Link>
                                <div className='flex gap-3 mt-3 text-xl'>
                                    <div className="flex flex-col ">
                                        <span className="text-button text-lg">Email:</span>
                                        <span className="text-button text-base mt-3">Phone:</span>
                                        <span className="text-button text-base mt-3">Address:</span>
                                    </div>
                                    <div className="flex flex-col ">
                                        <span className=''>{webSettings?.filter((x: { name: string; }) => x.name == "email")[0]?.value}</span>
                                        <span className='mt-3'>{webSettings?.filter((x: { name: string; }) => x.name == "wa-general")[0]?.value}</span>
                                        <span className='mt-3 pt-px'>{webSettings?.filter((x: { name: string; }) => x.name == "alamat")[0]?.value}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="right-content flex flex-wrap gap-y-8 basis-2/4 max-lg:basis-full">
                                <div className="list-nav flex-col lg:flex-row flex gap-x-12 gap-y-8 lg:gap-y-0 md:justify-between max-md:basis-full  ">
                                    <div className="item flex flex-col   ">
                                        <div className="text-button-uppercase pb-3 text-lg">Informasi</div>
                                        <Link className='caption1 has-line-before duration-300 w-fit mt-2 text-base' href={'/contact'}>Kontak kami</Link>
                                        <Link className='caption1 has-line-before duration-300 w-fit mt-2 text-base' href={'/about-us'}>Tentang Kami</Link>
                                    </div>
                    
                                    <div className="item flex flex-col">
                                        <div className="text-button-uppercase pb-3 text-lg">Kategori</div>
                                        {
                                            categories?.slice(0,4)?.map((category: any, idx) => (
                                                <Link className='caption1 has-line-before text-base duration-300 w-fit mt-2' key={idx} href={`/shop/?category=${category?.slug}`} >{category?.name}</Link>
                                            ))
                                        }
                                    </div>

                                    <div className="item flex flex-col">
                                        <div className="text-button-uppercase text-center lg:text-left text-lg">Follow Us</div>
                                        <div className="list-social flex justify-center lg:justify-normal items-center gap-6 mt-4">
                                        <Link href={'https://www.facebook.com/'} target='_blank'>
                                            <div className="icon-facebook text-2xl text-black"></div>
                                        </Link>
                                        <Link href={'https://www.instagram.com/'} target='_blank'>
                                            <div className="icon-instagram text-2xl text-black"></div>
                                        </Link>
                                        <Link href={'https://www.twitter.com/'} target='_blank'>
                                            <div className="icon-twitter text-2xl text-black"></div>
                                        </Link>
                                        <Link href={'https://www.youtube.com/'} target='_blank'>
                                            <div className="icon-youtube text-2xl text-black"></div>
                                        </Link>
                                    </div>
                                    </div>

                                 
                                </div>
                              
                            </div>
                        </div>
                        <div className="footer-bottom py-3 flex items-center justify-between gap-5 max-lg:justify-center max-lg:flex-col border-t border-line">
                            <div className="left flex items-center gap-8">
                                <div className="copyright caption1 text-secondary">{dayjs().format("YYYY")} @ Zhindaya. All Rights Reserved.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer