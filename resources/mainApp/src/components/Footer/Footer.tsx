import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import * as Icon from "@phosphor-icons/react/dist/ssr";
import dayjs from 'dayjs'

const Footer = () => {
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
                                        <span className="text-button">Mail:</span>
                                        <span className="text-button mt-3">Phone:</span>
                                        <span className="text-button mt-3">Address:</span>
                                    </div>
                                    <div className="flex flex-col ">
                                        <span className=''>hi.avitex@gmail.com</span>
                                        <span className='mt-3'>1-333-345-6868</span>
                                        <span className='mt-3 pt-px'>549 Oak St.Crystal Lake, IL 60014</span>
                                    </div>
                                </div>
                            </div>
                            <div className="right-content flex flex-wrap gap-y-8 basis-2/4 max-lg:basis-full">
                                <div className="list-nav flex justify-between basis-2/3 max-md:basis-full grid-cols-2">
                                    <div className="item flex flex-col  ">
                                        <div className="text-button-uppercase pb-3">Informasi</div>
                                        <Link className='caption1 has-line-before duration-300 w-fit' href={'/pages/contact'}>Contact us</Link>
                                        <Link className='caption1 has-line-before duration-300 w-fit pt-2' href={'/pages/faqs'}>FAQs</Link>
                                    </div>
                    
                                    <div className="item flex flex-col  ">
                                        <div className="text-button-uppercase pb-3">other</div>
                                        <Link className='caption1 has-line-before duration-300 w-fit pt-2' href={'/pages/faqs'}>Privacy Policy</Link>
                                        <Link className='caption1 has-line-before duration-300 w-fit pt-2' href={'/order-tracking'}>Return & Refund</Link>
                                    </div>
                                </div>
                              
                            </div>
                        </div>
                        <div className="footer-bottom py-3 flex items-center justify-between gap-5 max-lg:justify-center max-lg:flex-col border-t border-line">
                            <div className="left flex items-center gap-8">
                                <div className="copyright caption1 text-secondary">2025 @ Zhindaya. All Rights Reserved.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer