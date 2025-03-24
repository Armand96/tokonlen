"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import FetchData from '@/services/FetchData';
import dayjs from 'dayjs';

const Footer = () => {
    
    const [webSettings, setWebSettings] = useState<any>([])
    

    useEffect(() => {
        FetchData.GetWebSettings(`?per_page=99999999`).then((res) => {
            setWebSettings(res?.data)
        })
    },[])


    return (
        <>
            <div id="footer" className='footer'>
                <div className="footer-main bg-surface">
                    <div className="container">
                        <div className="content-footer py-[60px] flex justify-between flex-wrap gap-y-8">
                            <div className="company-infor basis-2/4 max-lg:basis-full pr-7">
                                <Link href={'/'} className="logo">
                                    <div className="heading4">Zhindaya</div>
                                </Link>
                                <div className='flex gap-3 mt-3'>
                                    <div className="flex flex-col ">
                                        <span className="text-button">Email:</span>
                                        <span className="text-button mt-3">Phone:</span>
                                        <span className="text-button mt-3">Address:</span>
                                    </div>
                                    <div className="flex flex-col ">
                                        <span className=''>{webSettings?.filter((x: { name: string; }) => x.name == "email")[0]?.value}</span>
                                        <span className='mt-3'>{webSettings?.filter((x: { name: string; }) => x.name == "wa-general")[0]?.value}</span>
                                        <span className='mt-3 pt-px'>{webSettings?.filter((x: { name: string; }) => x.name == "alamat")[0]?.value}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="right-content flex flex-wrap gap-y-8 basis-2/4 max-lg:basis-full">
                                <div className="list-nav flex gap-x-6 md:justify-between max-md:basis-full ">
                                    <div className="item flex flex-col  ">
                                        <div className="text-button-uppercase pb-3">Informasi</div>
                                        <Link className='caption1 has-line-before duration-300 w-fit mt-2' href={'/contact'}>Kontak kami</Link>
                                        <Link className='caption1 has-line-before duration-300 w-fit mt-2' href={'/about-us'}>Tentang Kami</Link>
                                    </div>
                    
                                    <div className="item flex flex-col  ">
                                        <div className="text-button-uppercase pb-3">Lain nya</div>
                                        <Link className='caption1 has-line-before duration-300 w-fit mt-2' href={'#'}>Privacy Policy</Link>
                                        <Link className='caption1 has-line-before duration-300 w-fit mt-2' href={'#'}>Return & Refund</Link>
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