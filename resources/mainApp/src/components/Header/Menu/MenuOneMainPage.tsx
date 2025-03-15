'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { usePathname } from 'next/navigation';
import useMenuMobile from '@/store/useMenuMobile';
import { useModalWishlistContext } from '@/context/ModalWishlistContext';
import { useModalSearchContext } from '@/context/ModalSearchContext';
import { useRouter } from 'next/navigation';
import FetchData from '@/services/FetchData';
import Loading from '@/components/Other/Loading';

interface Props {
    props: string;
}

const MenuOne: React.FC<Props> = ({ props, }) => {
    const router = useRouter()
    const pathname = usePathname()
    let [selectedType, setSelectedType] = useState<string | null>()
    const { openMenuMobile, handleMenuMobile } = useMenuMobile()
    const [openSubNavMobile, setOpenSubNavMobile] = useState<number | null>(null)
    const { openModalWishlist } = useModalWishlistContext()
    const { openModalSearch } = useModalSearchContext()
    const [categories, setCategories] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    const handleOpenSubNavMobile = (index: number) => {
        setOpenSubNavMobile(openSubNavMobile === index ? null : index)
    }

    useEffect(() => {
        FetchData.GetCategories().then((res) => {
            setCategories(res.data)
            setLoading(false)
        }).catch(() => {
            setLoading(false)
        })
    }, [])

    const [fixedHeader, setFixedHeader] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setFixedHeader(scrollPosition > 0);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    });


    const handleTypeClick = (type: string, category: string) => {
        setSelectedType(type)
        router.push(`/shop/breadcrumb?type=${type}&category=${category}`);
    };

    return (
        <>
            {loading && <Loading />}
            <div className={`header-menu style-one ${fixedHeader ? 'fixed text-black' : 'absolute text-white'} top-0 left-0 right-0 w-full md:h-[74px] h-[56px] ${props}`}>
                <div className="container mx-auto h-full">
                    <div className="header-main flex justify-between h-full">
                        <div className="menu-mobile-icon lg:hidden flex items-center" onClick={handleMenuMobile}>
                            <i className="icon-category text-2xl"></i>
                        </div>
                        <div className="left flex items-center gap-16">
                            <Link href={'/'} className='flex items-center max-lg:absolute max-lg:left-1/2 max-lg:-translate-x-1/2'>
                                <div className="heading4">Zhindaya</div>
                            </Link>
                            <div className="menu-main-page h-full max-lg:hidden">
                                <ul className='flex items-center gap-8 h-full'>
                                    {
                                        categories?.slice(0, 4).map((category, index) => (
                                            <li className='h-full' key={index}>
                                                <Link
                                                    href={`/shop/breadcrumb?category=${category?.slug}`}
                                                    className={`text-button-uppercase duration-300 h-full flex items-center justify-center gap-1 ${pathname === category?.name ? 'active' : ''}`}
                                                >
                                                    {category?.name}
                                                </Link>
                                                <div className={`sub-menu absolute top-[74px] ${category?.sub_cat?.length === 0 && "hidden"}  bg-white`}>
                                                    <div className="container">
                                                        <div className="flex justify-between py-8">
                                                            <div className="nav-link grid gap-y-8">
                                                                {
                                                                    category?.sub_cat?.map((child: any, index: string) => (
                                                                        <div className="nav-item" key={index}>
                                                                            <div
                                                                                onClick={() => handleTypeClick(child?.slug, category?.slug)}
                                                                                className={`link text-secondary duration-300 cursor-pointer`}
                                                                            >
                                                                                {child?.name}
                                                                            </div>
                                                                        </div>
                                                                    ))
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))
                                    }

                                    <li className='h-full relative '>
                                        <Link
                                            href={`/shop/breadcrumb`}
                                            className={`text-button-uppercase duration-300 h-full flex items-center justify-center gap-1 ${pathname === '/prempuan' ? 'active' : ''}`}
                                        >
                                            Kategori
                                        </Link>
                                        <div className="sub-menu py-3 px-5 -left-6 top-14 absolute grid grid-cols-1 gap-5 w-[190px]  bg-white rounded-b-xl">
                                            <ul>
                                                {
                                                    categories?.map((category, index) => (
                                                        <li key={index}>
                                                            <Link href={`/shop/breadcrumb?type=&category=${category?.slug}`} className={`link text-secondary duration-300`}>
                                                                {category?.name}
                                                            </Link>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    </li>
                                    <li className='h-full'>
                                        <Link href="/shop/breadcrumb" className='text-button-uppercase duration-300 h-full flex items-center justify-center'>
                                            all
                                        </Link>
                                    </li>
                                    <li className='h-full'>
                                        <Link href="/tentang-kami" className='text-button-uppercase duration-300 h-full flex items-center justify-center'>
                                            Tentang Kami
                                        </Link>
                                    </li>
                                    <li className='h-full'>
                                        <Link href="/contact" className='text-button-uppercase duration-300 h-full flex items-center justify-center'>
                                            Kontak Kami
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="right flex gap-12">
                            <div className="max-md:hidden search-icon flex items-center cursor-pointer relative">
                                <Icon.MagnifyingGlass size={24} color={fixedHeader ? "black" : "white"} onClick={openModalSearch} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="menu-mobile" className={`${openMenuMobile ? 'open' : ''}`}>
                <div className="menu-container bg-white h-full">
                    <div className="container h-full">
                        <div className="menu-main h-full overflow-hidden">
                            <div className="heading py-2 relative flex items-center justify-center">
                                <div
                                    className="close-menu-mobile-btn absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-surface flex items-center justify-center"
                                    onClick={handleMenuMobile}
                                >
                                    <Icon.X size={14} />
                                </div>
                                <Link href={'/'} className='logo text-3xl font-semibold text-center'>Zhindaya</Link>
                            </div>
                            <div className="form-search relative mt-2">
                                <Icon.MagnifyingGlass size={20} className='absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer' />
                                <input type="text" placeholder='What are you looking for?' className=' h-12 rounded-lg border border-line text-sm w-full pl-10 pr-4' />
                            </div>
                            {
                                <div className="list-nav mt-6" >
                                    <ul className='flex flex-col gap-y-6'>
                                        {
                                            categories?.slice(0, 5).map((category, index) => (
                                                <li
                                                    className={`${openSubNavMobile === index ? 'open  bg-white ' : ''}`}
                                                    key={index}
                                                    onClick={() => handleOpenSubNavMobile(index)}
                                                >
                                                    <a href={`/shop/breadcrumb`} className={`text-xl font-semibold flex items-center justify-between`}> {category?.name}
                                                        <span className='text-right'>
                                                            <Icon.CaretRight size={20} />
                                                        </span>
                                                    </a>
                                                    <div className="sub-nav-mobile">
                                                        <div
                                                            className="back-btn flex items-center gap-3"
                                                            onClick={() => handleOpenSubNavMobile(index)}
                                                        >
                                                            <Icon.CaretLeft />
                                                            Back
                                                        </div>
                                                        <div className="list-nav-item w-full  grid grid-cols-2 pt-2 pb-6">
                                                            <ul>
                                                                {
                                                                    category?.sub_cat?.map((item: any, index: string) => (
                                                                        <li key={index}>
                                                                            <Link href={`/shop/breadcrumb?type=${item?.slug}&category=${category?.slug}`} className={`nav-item-mobile link text-secondary duration-300 ${pathname === '/' ? 'active' : ''}`}>
                                                                                {item?.name}
                                                                            </Link>
                                                                        </li>
                                                                    ))
                                                                }

                                                            </ul>

                                                        </div>
                                                    </div>
                                                </li>
                                            ))
                                        }
                                        {/* kategori */}
                                        <li
                                            className={`${openSubNavMobile === categories?.length + 1 ? 'open' : ''}`}
                                            onClick={() => handleOpenSubNavMobile(categories?.length + 1)}
                                        >
                                            <a href={'/shop/breadcrumb'} className={`text-xl font-semibold flex items-center justify-between`}>
                                                Kategori
                                                <span className='text-right'>
                                                    <Icon.CaretRight size={20} />
                                                </span>
                                            </a>
                                        </li>
                                        {/* all */}
                                        <li
                                            className={`${openSubNavMobile === categories?.length + 2 ? 'open' : ''}`}
                                            onClick={() => handleOpenSubNavMobile(categories?.length + 2)}
                                        >
                                            <a href={'/shop/breadcrumb'} className={`text-xl font-semibold flex items-center justify-between`}>
                                                all
                                                <span className='text-right'>
                                                    <Icon.CaretRight size={20} />
                                                </span>
                                            </a>
                                        </li>
                                        {/* Tentang kami */}
                                        <li
                                            className={`${openSubNavMobile === categories?.length + 4 ? 'open' : ''}`}
                                            onClick={() => handleOpenSubNavMobile(categories?.length + 4)}
                                        >
                                            <a href={'/about-us'} className={`text-xl font-semibold flex items-center justify-between`}>
                                                Tentang Kami
                                                <span className='text-right'>
                                                    <Icon.CaretRight size={20} />
                                                </span>
                                            </a>
                                        </li>
                                        {/* contact kami */}
                                        <li
                                            className={`${openSubNavMobile === categories?.length + 5 ? 'open' : ''}`}
                                            onClick={() => handleOpenSubNavMobile(categories?.length + 5)}
                                        >
                                            <a href={'/contact'} className={`text-xl font-semibold flex items-center justify-between`}>
                                                Kontak Kami
                                                <span className='text-right'>
                                                    <Icon.CaretRight size={20} />
                                                </span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default MenuOne