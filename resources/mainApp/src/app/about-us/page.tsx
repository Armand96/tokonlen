'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import MenuOne from '@/components/Header/Menu/MenuOne'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import Benefit from '@/components/Home/Benefit'
import Brand from '@/components/Home/Brand'
import Footer from '@/components/Footer/Footer'
import FetchData from '@/services/FetchData';
import Loading from '@/components/Other/Loading';

const AboutUs = () => {

    const [body, setBody] = useState<any>(true)
    const [title, setTitle] = useState<any>(true)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        Promise.all([FetchData.GetWebSettings(`?name=about-us`), FetchData.GetWebSettings(`?name=about-us-title`)])
            .then((res) => {
                setBody(res[0]?.data[0]?.value)
                setTitle(res[1]?.data[0]?.value)
                setLoading(false)
            })
    }, [])

    return (
        <>
            {loading && <Loading />}

            <div id="header" className='relative w-full'>
                <MenuOne props="bg-transparent" />
                <Breadcrumb heading='Tentang kami' subHeading='Tentang kami' />
            </div>
            <div className='about md:pt-20 pt-10'>
                <div className="about-us-block">
                    <div className="container">
                        <div className="text flex items-center justify-center">
                            <div className="content md:w-5/6 w-full">
                                <div className="heading3 text-center">{title}</div>
                                <div className="body1 text-center md:mt-7 mt-5">{body}</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <Benefit props="md:pt-20 pt-10" />
            {/* <Brand /> */}
            <Footer />
        </>
    )
}

export default AboutUs