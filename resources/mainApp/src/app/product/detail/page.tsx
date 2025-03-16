'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation';
import MenuOne from '@/components/Header/Menu/MenuOne'
import BreadcrumbProduct from '@/components/Breadcrumb/BreadcrumbProduct'
import Default from '@/components/Product/Detail/Default';
import Footer from '@/components/Footer/Footer'
import { CookiesProvider } from 'react-cookie';


const ProductDefault = () => {
    const searchParams = useSearchParams()
    let productId = searchParams.get('id')

    if (!productId) {
        productId = '1'
    }

    return (
        <>
            <CookiesProvider>
                <div id="header" className='relative w-full'>
                    <MenuOne props="bg-white" />
                    <BreadcrumbProduct  productPage='detail'  />
                </div>
                <Default productId={productId} />
                <Footer />
            </CookiesProvider>
        </>
    )
}



export default ProductDefault