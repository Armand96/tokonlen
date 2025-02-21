'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { usePathname } from 'next/navigation';
import useLoginPopup from '@/store/useLoginPopup';
import useMenuMobile from '@/store/useMenuMobile';
import { useModalCartContext } from '@/context/ModalCartContext';
import { useModalWishlistContext } from '@/context/ModalWishlistContext';
import { useModalSearchContext } from '@/context/ModalSearchContext';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import Baju from '@/images/dumny/baju-2.jpg'
import Baju2 from '@/images/dumny/baju-3.jpg'

interface Props {
    props: string;
}

const MenuOne: React.FC<Props> = ({ props }) => {
    const router = useRouter()
    const pathname = usePathname()
    let [selectedType, setSelectedType] = useState<string | null>()
    const { openMenuMobile, handleMenuMobile } = useMenuMobile()
    const [openSubNavMobile, setOpenSubNavMobile] = useState<number | null>(null)
    const { openModalWishlist } = useModalWishlistContext()
    const { openModalSearch } = useModalSearchContext()

    const handleOpenSubNavMobile = (index: number) => {
        setOpenSubNavMobile(openSubNavMobile === index ? null : index)
    }

    const [fixedHeader, setFixedHeader] = useState(false)
    const [lastScrollPosition, setLastScrollPosition] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setFixedHeader(scrollPosition > 0 && scrollPosition < lastScrollPosition);
            setLastScrollPosition(scrollPosition);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollPosition]);

    const handleGenderClick = (gender: string) => {
        router.push(`/shop/breadcrumb?gender=${gender}`);
    };

    const handleCategoryClick = (category: string) => {
        router.push(`/shop/breadcrumb?category=${category}`);
    };

    const handleTypeClick = (type: string) => {
        setSelectedType(type)
        router.push(`/shop/breadcrumb?type=${type}`);
    };

    return (
        <>
            <div className={`header-menu style-one ${fixedHeader ? 'fixed' : 'absolute'} top-0 left-0 right-0 w-full md:h-[74px] h-[56px] ${props}`}>
                <div className="container mx-auto h-full">
                    <div className="header-main flex justify-between h-full">
                        <div className="menu-mobile-icon lg:hidden flex items-center" onClick={handleMenuMobile}>
                            <i className="icon-category text-2xl"></i>
                        </div>
                        <div className="left flex items-center gap-16">
                            <Link href={'/'} className='flex items-center max-lg:absolute max-lg:left-1/2 max-lg:-translate-x-1/2'>
                                <div className="heading4">Testing</div>
                            </Link>
                            <div className="menu-main h-full max-lg:hidden">
                                <ul className='flex items-center gap-8 h-full'>
                                    <li className='h-full'>
                                        <Link
                                            href="#!"
                                            className={`text-button-uppercase duration-300 h-full flex items-center justify-center gap-1 ${pathname === '/laki-laki' ? 'active' : ''}`}
                                        >
                                            Pakaian Laki Laki
                                        </Link>
                                        <div className="sub-menu absolute top-[74px]  bg-white">
                                            <div className="container">
                                                <div className="flex justify-between py-8">
                                                    <div className="nav-link basis-2/3 grid grid-cols-1 gap-y-8">
                                                        <div className="nav-item">
                                                            <div className="text-button-uppercase pb-2">Baju</div>
                                                            <ul>
                                                                <li>
                                                                    <div
                                                                        onClick={() => handleGenderClick('men')}
                                                                        className={`link text-secondary duration-300 cursor-pointer`}
                                                                    >
                                                                        diskon 50 Ribu
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div
                                                                        onClick={() => handleTypeClick('outerwear')}
                                                                        className={`link text-secondary duration-300 cursor-pointer`}
                                                                    >
                                                                        Outerwear | Coats
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div
                                                                        onClick={() => handleTypeClick('sweater')}
                                                                        className={`link text-secondary duration-300 cursor-pointer`}
                                                                    >
                                                                        Sweaters | Cardigans
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div
                                                                        onClick={() => handleTypeClick('shirt')}
                                                                        className={`link text-secondary duration-300 cursor-pointer`}
                                                                    >
                                                                        Shirt | Sweatshirts
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="nav-item">
                                                            <div className="text-button-uppercase pb-2">Celana</div>
                                                            <ul>
                                                                <li>
                                                                    <div
                                                                        onClick={() => handleGenderClick('men')}
                                                                        className={`link text-secondary duration-300 cursor-pointer`}
                                                                    >
                                                                        diskon 50 Ribu
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div
                                                                        onClick={() => handleTypeClick('outerwear')}
                                                                        className={`link text-secondary duration-300 cursor-pointer`}
                                                                    >
                                                                        Outerwear | Coats
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div
                                                                        onClick={() => handleTypeClick('sweater')}
                                                                        className={`link text-secondary duration-300 cursor-pointer`}
                                                                    >
                                                                        Sweaters | Cardigans
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div
                                                                        onClick={() => handleTypeClick('shirt')}
                                                                        className={`link text-secondary duration-300 cursor-pointer`}
                                                                    >
                                                                        Shirt | Sweatshirts
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className='h-full'>
                                        <Link
                                            href="#!"
                                            className={`text-button-uppercase duration-300 h-full flex items-center justify-center gap-1 ${pathname === '/laki-laki' ? 'active' : ''}`}
                                        >
                                            Pakaian Prempuan
                                        </Link>
                                        <div className="sub-menu absolute top-[74px]  bg-white">
                                            <div className="container">
                                                <div className="flex justify-between py-8">
                                                    <div className="nav-link basis-2/3 grid grid-cols-1 gap-y-8">
                                                        <div className="nav-item">
                                                            <div className="text-button-uppercase pb-2">Baju</div>
                                                            <ul>
                                                                <li>
                                                                    <div
                                                                        onClick={() => handleGenderClick('men')}
                                                                        className={`link text-secondary duration-300 cursor-pointer`}
                                                                    >
                                                                        diskon 50 Ribu
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div
                                                                        onClick={() => handleTypeClick('outerwear')}
                                                                        className={`link text-secondary duration-300 cursor-pointer`}
                                                                    >
                                                                        Outerwear | Coats
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div
                                                                        onClick={() => handleTypeClick('sweater')}
                                                                        className={`link text-secondary duration-300 cursor-pointer`}
                                                                    >
                                                                        Sweaters | Cardigans
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div
                                                                        onClick={() => handleTypeClick('shirt')}
                                                                        className={`link text-secondary duration-300 cursor-pointer`}
                                                                    >
                                                                        Shirt | Sweatshirts
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="nav-item">
                                                            <div className="text-button-uppercase pb-2">Celana</div>
                                                            <ul>
                                                                <li>
                                                                    <div
                                                                        onClick={() => handleGenderClick('men')}
                                                                        className={`link text-secondary duration-300 cursor-pointer`}
                                                                    >
                                                                        diskon 50 Ribu
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div
                                                                        onClick={() => handleTypeClick('outerwear')}
                                                                        className={`link text-secondary duration-300 cursor-pointer`}
                                                                    >
                                                                        Outerwear | Coats
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div
                                                                        onClick={() => handleTypeClick('sweater')}
                                                                        className={`link text-secondary duration-300 cursor-pointer`}
                                                                    >
                                                                        Sweaters | Cardigans
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div
                                                                        onClick={() => handleTypeClick('shirt')}
                                                                        className={`link text-secondary duration-300 cursor-pointer`}
                                                                    >
                                                                        Shirt | Sweatshirts
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className='h-full relative '>
                                        <Link
                                            href="#!"
                                            className={`text-button-uppercase duration-300 h-full flex items-center justify-center gap-1 ${pathname === '/prempuan' ? 'active' : ''}`}
                                        >
                                            Kategori
                                        </Link>
                                        <div className="sub-menu py-3 px-5 -left-6 top-14 absolute grid grid-cols-1 gap-5 w-[150px] bg-white rounded-b-xl">
                                            <ul>
                                                <li>
                                                    <Link href="/" className={`link text-secondary duration-300`}>
                                                        Baju
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/shop/breadcrumb" className='link text-secondary duration-300'>
                                                        Celana
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/shop/breadcrumb" className='link text-secondary duration-300'>
                                                        Kaos Kaki
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/shop/breadcrumb" className='link text-secondary duration-300'>
                                                        Baju Renang
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/shop/breadcrumb" className='link text-secondary duration-300'>
                                                        Baju Tidur
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/shop/breadcrumb" className='link text-secondary duration-300'>
                                                        Dakimakura
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                   
                                    <li className='h-full'>
                                        <Link href="#!" className='text-button-uppercase duration-300 h-full flex items-center justify-center'>
                                            Tentang Kami
                                        </Link>
                                    </li>
                                    <li className='h-full'>
                                        <Link href="#!" className='text-button-uppercase duration-300 h-full flex items-center justify-center'>
                                            Aksesoris
                                        </Link>
                                    </li>

                                </ul>
                            </div>
                        </div>
                        <div className="right flex gap-12">
                            <div className="max-md:hidden search-icon flex items-center cursor-pointer relative">
                                <Icon.MagnifyingGlass size={24} color='black' onClick={openModalSearch} />
                                <div className="line absolute bg-line w-px h-6 -right-6"></div>
                            </div>
                            <div className="list-action flex items-center gap-4">
                                <div className="max-md:hidden wishlist-icon flex items-center cursor-pointer" onClick={openModalWishlist}>
                                    <Icon.Heart size={24} color='black' />
                                </div>
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
                                <Link href={'/'} className='logo text-3xl font-semibold text-center'>Anvogue</Link>
                            </div>
                            <div className="form-search relative mt-2">
                                <Icon.MagnifyingGlass size={20} className='absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer' />
                                <input type="text" placeholder='What are you looking for?' className=' h-12 rounded-lg border border-line text-sm w-full pl-10 pr-4' />
                            </div>
                            <div className="list-nav mt-6">
                                <ul>
                                    <li
                                        className={`${openSubNavMobile === 1 ? 'open' : ''}`}
                                        onClick={() => handleOpenSubNavMobile(1)}
                                    >
                                        <a href={'#!'} className={`text-xl font-semibold flex items-center justify-between`}>Demo
                                            <span className='text-right'>
                                                <Icon.CaretRight size={20} />
                                            </span>
                                        </a>
                                        <div className="sub-nav-mobile">
                                            <div
                                                className="back-btn flex items-center gap-3"
                                                onClick={() => handleOpenSubNavMobile(1)}
                                            >
                                                <Icon.CaretLeft />
                                                Back
                                            </div>
                                            <div className="list-nav-item w-full grid grid-cols-2 pt-2 pb-6">
                                                <ul>
                                                    <li>
                                                        <Link href="/" className={`nav-item-mobile link text-secondary duration-300 ${pathname === '/' ? 'active' : ''}`}>
                                                            Home Fashion 1
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/homepages/fashion2" className={`nav-item-mobile link text-secondary duration-300 ${pathname === '/homepages/fashion2' ? 'active' : ''}`}>
                                                            Home Fashion 2
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/homepages/fashion3" className={`nav-item-mobile link text-secondary duration-300 ${pathname === '/homepages/fashion3' ? 'active' : ''}`}>
                                                            Home Fashion 3
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/homepages/fashion4" className={`nav-item-mobile link text-secondary duration-300 ${pathname === '/homepages/fashion4' ? 'active' : ''}`}>
                                                            Home Fashion 4
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/homepages/fashion5" className={`nav-item-mobile link text-secondary duration-300 ${pathname === '/homepages/fashion5' ? 'active' : ''}`}>
                                                            Home Fashion 5
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/homepages/fashion6" className={`nav-item-mobile link text-secondary duration-300 ${pathname === '/homepages/fashion6' ? 'active' : ''}`}>
                                                            Home Fashion 6
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/homepages/fashion7" className={`nav-item-mobile link text-secondary duration-300 ${pathname === '/homepages/fashion7' ? 'active' : ''}`}>
                                                            Home Fashion 7
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/homepages/fashion8" className={`nav-item-mobile link text-secondary duration-300 ${pathname === '/homepages/fashion8' ? 'active' : ''}`}>
                                                            Home Fashion 8
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/homepages/fashion9" className={`nav-item-mobile link text-secondary duration-300 ${pathname === '/homepages/fashion9' ? 'active' : ''}`}>
                                                            Home Fashion 9
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/homepages/fashion10" className={`nav-item-mobile link text-secondary duration-300 ${pathname === '/homepages/fashion10' ? 'active' : ''}`}>
                                                            Home Fashion 10
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/homepages/fashion11" className={`nav-item-mobile link text-secondary duration-300 ${pathname === '/homepages/fashion11' ? 'active' : ''}`}>
                                                            Home Fashion 11
                                                        </Link>
                                                    </li>
                                                </ul>

                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default MenuOne