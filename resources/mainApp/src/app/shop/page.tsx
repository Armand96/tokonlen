'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import MenuOne from '@/components/Header/Menu/MenuOne'
import Shopbreadcrumb from '@/components/Shop/page'
import Footer from '@/components/Footer/Footer'

export default function Breadcrumb() {
    const searchParams = useSearchParams()
    let type = searchParams.get('type')
    let gender = searchParams.get('gender')
    let category = searchParams.get('category')


    return (
        <>
            <div id="header" className='relative w-full'>
                <MenuOne props="bg-transparent" />
            </div>
            <Shopbreadcrumb productPerPage={10} dataType={type} gender={gender} category={category} />
            <Footer />
        </>
    )
}
