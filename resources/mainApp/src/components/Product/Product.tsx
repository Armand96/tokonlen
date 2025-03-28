'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import * as Icon from "@phosphor-icons/react/dist/ssr";
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
                                {(data?.stock < 0 || data?.variants?.filter((x: any) => x.variant?.stock < 1).length > 0) && (
                                    <div className="product-tag text-button-uppercase bg-black text-white px-3 py-0.5 inline-block rounded-full absolute bottom-4 md:bottom-auto md:top-3 md:right-3 z-[1]">
                                        Stock Habis
                                    </div>
                                )}
                                {(data?.final_price !== data?.price || data.variants?.flatMap((x: any) => x.sizes?.map((size: any) =>( { ...size, name: x?.name})))?.filter((variant: any) => variant.discount !== null)[0] ) && (
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
                                <div className="text-title duration-300 hidden lg:block">{data.name?.length > 60 ? data.name?.slice(0,60) + '...' : data.name }</div>
                                <div className="text-title duration-300 lg:hidden">{data.name?.length > 35 ? data.name?.slice(0,35) + '...' : data.name }</div>

                                <div className="flex items-center gap-2 flex-wrap mt-1 duration-300 relative z-[1]">
                                    <div className="product-price text-title">{Helpers.FormatPrice(data.final_price)}</div>
                                    {(parseInt(data?.discount?.discount_percentage ) !== 0 && parseInt(data?.discount?.discount_amount) == 0) && (
                                        <>
                                            <div className="product-origin-price caption1 text-secondary2"><del>{Helpers.FormatPrice(data.price)}</del></div>
                                            <div className="product-sale caption1 font-medium bg-green px-3 py-0.5 inline-block rounded-full">
                                                -{(data?.discount_price / data?.price) * 100}%
                                            </div>
                                        </>
                                    )}
                                      {(parseInt(data?.discount?.discount_amount ) !== 0 && parseInt(data?.discount?.discount_percentage) == 0) && (
                                        <>
                                            <div className="product-origin-price caption1 text-secondary2"><del>{Helpers.FormatPrice(data.price)}</del></div>
                                            <div className="product-sale caption1 font-medium bg-green px-3 py-0.5 inline-block rounded-full">
                                                - {Helpers.FormatPrice(data?.discount?.discount_amount)}
                                            </div>
                                        </>
                                    )}
                                </div>

                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                    </>
                )
            }
        </>
    )
}

export default Product