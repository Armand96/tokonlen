'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { ProductType } from '@/type/ProductType'
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useCart } from '@/context/CartContext'
import { useModalCartContext } from '@/context/ModalCartContext'
import { useWishlist } from '@/context/WishlistContext'
import { useModalWishlistContext } from '@/context/ModalWishlistContext'
import { useCompare } from '@/context/CompareContext'
import { useModalCompareContext } from '@/context/ModalCompareContext'
import { useModalQuickviewContext } from '@/context/ModalQuickviewContext'
import { useRouter } from 'next/navigation'
import Baju from '@/images/dumny/baju-2.jpg'
import Helpers from '@/Helpers/Helpers';
import dayjs from 'dayjs';


interface ProductProps {
    data: any
    type: string
    style: string
}

const Product: React.FC<ProductProps> = ({ data, type, style }) => {
    const router = useRouter()

    const handleDetailProduct = (productId: string) => {
        router.push(`/product/detail?id=${productId}`);
    };

    let percentSold = Math.floor((data.sold / data.quantity) * 100)

    return (
        <>
            { }
            {type === "grid" ?
                (
                    <div className={`product-item grid-type ${style}`}>
                        <div onClick={() => handleDetailProduct(data.id)} className="product-main cursor-pointer block">
                            <div className="product-thumb bg-white relative overflow-hidden rounded-2xl">

                                {(dayjs(data?.release_date).diff(dayjs(), "day") > -14) && (
                                    <div className="product-tag text-button-uppercase bg-green px-3 py-0.5 inline-block rounded-full absolute top-3 left-3 z-[1]">
                                        New
                                    </div>
                                )}
                                {(data?.stock < 1 || data.variant.filter((x: any) => x.variant?.stock < 1).length > 0) && (
                                    <div className="product-tag text-button-uppercase bg-black text-white px-3 py-0.5 inline-block rounded-full absolute top-3 right-3 z-[1]">
                                        Stock Habis
                                    </div>
                                )}
                                {(data?.final_price !== data?.price || data.variant.filter((x: any) => x.variant !== null)[0]) && (
                                    <div className="product-tag text-button-uppercase text-white bg-red px-3 py-0.5 inline-block rounded-full absolute top-3 left-3 z-[1]">
                                        Promo
                                    </div>
                                )}
                                <div className="product-img w-full h-full aspect-[3/4]">

                                    <Image
                                        src={Helpers.GetImage(data?.image?.image)}
                                        width={500}
                                        height={500}
                                        alt={data.name}
                                        priority={true}
                                        className={`w-full h-full object-cover duration-700 ${data?.stock < 1 ? ' filter grayscale' : ""} `}
                                    />
                                </div>
                                {data?.final_price !== data?.price ?
                                    data?.discount?.discount_percentage == 0 ? <>
                                        <div className="bg-black w-full lg:-mt-10  2xl:-mt-12 rounded-b-lg absolute z-[100] flex items-center px-4 py-3">
                                            <Icon.Lightning weight='fill' className='text-red' />
                                            <div className={`caption2 font-semibold uppercase text-white px-2.5`}>Diskon {(data?.discount_price / data?.price) * 100}% </div>
                                        </div>
                                    </> : <>
                                        <div className="bg-black w-full lg:-mt-10  2xl:-mt-12 rounded-b-lg absolute z-[100] flex items-center px-4 py-3">
                                            <Icon.Lightning weight='fill' className='text-red' />
                                            <div className={`caption2 font-semibold uppercase text-white px-2.5`}>Diskon {Helpers.CheckDecimal(data?.discount?.discount_percentage)} % </div>
                                        </div>
                                    </>
                                    :<></>
                                  }
                                {/* {style === 'style-2' || style === 'style-4' ? (
                                <div className="list-size-block flex items-center justify-center gap-4 absolute bottom-0 left-0 w-full h-8">
                                    {data.sizes.map((item: any, index: number) => (
                                        <strong key={index} className="size-item text-xs font-bold uppercase">{item}</strong>
                                    ))}
                                </div>
                            ) : <></>} */}


                            </div>
                            <div className="product-infor mt-4 lg:mb-7">
                                <div className="product-sold sm:pb-4 pb-2">
                                    <div className="progress bg-line h-1.5 w-full rounded-full overflow-hidden relative">
                                        <div
                                            className={`progress-sold bg-red absolute left-0 top-0 h-full`}
                                            style={{ width: `${percentSold}%` }}
                                        >
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between gap-3 gap-y-1 flex-wrap mt-2">
                                        <div className="text-button-uppercase">
                                            <span className='text-secondary2 max-sm:text-xs'>Sold: </span>
                                            <span className='max-sm:text-xs'>{data.sold}</span>
                                        </div>
                                        <div className="text-button-uppercase">
                                            <span className='text-secondary2 max-sm:text-xs'>Available: </span>
                                            <span className='max-sm:text-xs'>{data.stock}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="product-name text-title duration-300">{data.name}</div>
                                {/* {data?.variant?.length > 0 && (
                                <div className="list-color-image max-md:hidden flex items-center gap-2 flex-wrap duration-500">
                                    {data?.variant?.map((item: any, index: number) => (
                                        <div
                                            className={`color-item w-8 h-8 rounded-lg duration-300 relative ${activeColor === item.color ? 'active' : ''}`}
                                            key={index}
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleActiveColor(item.color)
                                            }}
                                        >
                                            <Image
                                                src={Baju}
                                                width={100}
                                                height={100}
                                                alt='color'
                                                priority={true}
                                                className='w-full h-full object-cover rounded-lg'
                                            />
                                            <div className="tag-action bg-black text-white caption2 capitalize px-1.5 py-0.5 rounded-sm">{item.color}</div>
                                        </div>
                                    ))}
                                </div>
                            )} */}
                                <div className="product-price-block flex items-center gap-2 flex-wrap mt-1 duration-300 relative z-[1]">
                                    <div className="product-price text-title">{Helpers.FormatPrice(data.final_price)}</div>
                                    {data?.final_price !== data?.price && (
                                        <>
                                            <div className="product-origin-price caption1 text-secondary2"><del>{Helpers.FormatPrice(data.price)}</del></div>
                                            <div className="product-sale caption1 font-medium bg-green px-3 py-0.5 inline-block rounded-full">
                                                -{(data?.discount_price / data?.price) * 100}%
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* {style === 'style-5' &&
                                <>
                                    {data.action === 'add to cart' ? (
                                        <div
                                            className="add-cart-btn w-full text-button-uppercase py-2.5 text-center mt-2 rounded-full duration-300 bg-white border border-black hover:bg-black hover:text-white max-lg:hidden"
                                            onClick={e => {
                                                e.stopPropagation()
                                                handleAddToCart()
                                            }}
                                        >
                                            Add To Cart
                                        </div>
                                    ) : (
                                        <div
                                            className="quick-shop-btn text-button-uppercase py-2.5 text-center mt-2 rounded-full duration-300 bg-white border border-black hover:bg-black hover:text-white max-lg:hidden"
                                            onClick={e => {
                                                e.stopPropagation()
                                                setOpenQuickShop(!openQuickShop)
                                            }}
                                        >
                                            Quick Shop
                                        </div>
                                    )}
                                </>
                            } */}
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        {type === "list" ? (
                            <>
                                <div className="product-item list-type">
                                    <div className="product-main cursor-pointer flex lg:items-center sm:justify-between gap-7 max-lg:gap-5">
                                        <div onClick={() => handleDetailProduct(data.id)} className="product-thumb bg-white relative overflow-hidden rounded-2xl block max-sm:w-1/2">
                                            {(dayjs(data?.release_date).diff(dayjs(), "day") > -14) && (
                                                <div className="product-tag text-button-uppercase bg-green px-3 py-0.5 inline-block rounded-full absolute top-3 left-3 z-[1]">
                                                    New
                                                </div>
                                            )}
                                            {(data?.stock < 1) && (
                                                <div className="product-tag text-button-uppercase bg-black text-white px-3 py-0.5 inline-block rounded-full absolute top-3 right-3 z-[1]">
                                                    Stock Habis
                                                </div>
                                            )}
                                            {(data?.final_price !== data?.price) && (
                                                <div className="product-tag text-button-uppercase text-white bg-red px-3 py-0.5 inline-block rounded-full absolute top-3 left-3 z-[1]">
                                                    Promo
                                                </div>
                                            )}
                                            <div className="product-img w-full aspect-[3/4] rounded-2xl overflow-hidden">
                                                {data.thumbImage.map((img: any, index: number) => (
                                                    <Image
                                                        key={index}
                                                        src={Baju}
                                                        width={500}
                                                        height={500}
                                                        priority={true}
                                                        alt={data.name}
                                                        className={`w-full h-full object-cover duration-700 ${data?.stock < 1 ? ' filter grayscale' : ""} `}
                                                    />
                                                ))}
                                            </div>

                                        </div>
                                        <div className='flex sm:items-center gap-7 max-lg:gap-4 max-lg:flex-wrap max-lg:w-full max-sm:flex-col max-sm:w-1/2'>
                                            <div className="product-infor max-sm:w-full">
                                                <div onClick={() => handleDetailProduct(data.id)} className="product-name heading6 inline-block duration-300">{data.name}</div>
                                                <div className="product-price-block flex items-center gap-2 flex-wrap mt-1 duration-300 relative z-[1]">
                                                    <div className="product-price text-title">{Helpers.FormatPrice(data.final_price)}</div>
                                                    {data?.final_price !== data?.price ?
                                                        data?.discount?.discount_percentage == 0 ?
                                                            <>
                                                                <div className="product-origin-price caption1 text-secondary2"><del>{Helpers.FormatPrice(data.price)}</del></div>
                                                                <div className="product-sale caption1 font-medium bg-green px-3 py-0.5 inline-block rounded-full">
                                                                    -{(data?.discount_price / data?.price) * 100}%
                                                                </div>
                                                            </> : <>
                                                                <>
                                                                    <div className="product-origin-price caption1 text-secondary2"><del>{Helpers.FormatPrice(data.price)}</del></div>
                                                                    <div className="product-sale caption1 font-medium bg-green px-3 py-0.5 inline-block rounded-full">
                                                                        -{Helpers.CheckDecimal(data?.discount?.discount_percentage)}%
                                                                    </div>
                                                                </>
                                                            </>
                                                        : ''}
                                                </div>
                                                {/* {data.variation.length > 0 && data.action === 'add to cart' ? (
                                                <div className="list-color max-md:hidden py-2 mt-5 mb-1 flex items-center gap-3 flex-wrap duration-300">
                                                    {data.variation.map((item, index) => (
                                                        <div
                                                            key={index}
                                                            className={`color-item w-8 h-8 rounded-full duration-300 relative`}
                                                            style={{ backgroundColor: `${item.colorCode}` }}
                                                        >
                                                            <div className="tag-action bg-black text-white caption2 capitalize px-1.5 py-0.5 rounded-sm">{item.color}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : ( */}
                                                <>
                                                    {/* {data.variant.length > 0 && data.action === 'quick shop' ? (
                                                        <>
                                                            <div className="list-color flex items-center gap-2 flex-wrap mt-5">
                                                                {data.variation.map((item, index) => (
                                                                    <div
                                                                        className={`color-item w-12 h-12 rounded-xl duration-300 relative ${activeColor === item.color ? 'active' : ''}`}
                                                                        key={index}
                                                                        onClick={(e) => {
                                                                            e.stopPropagation()
                                                                            handleActiveColor(item.color)
                                                                        }}
                                                                    >
                                                                        <Image
                                                                            src={item.colorImage}
                                                                            width={100}
                                                                            height={100}
                                                                            alt='color'
                                                                            priority={true}
                                                                            className='rounded-xl'
                                                                        />
                                                                        <div className="tag-action bg-black text-white caption2 capitalize px-1.5 py-0.5 rounded-sm">
                                                                            {item.color}
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <></>
                                                    )} */}
                                                </>
                                                {/* )} */}
                                                <div className='text-secondary desc mt-5 max-sm:hidden'>{data.description}</div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <></>
                        )}
                    </>
                )
            }
        </>
    )
}

export default Product