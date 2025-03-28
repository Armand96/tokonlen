'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Product from '../Product'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, } from 'swiper/modules';
import 'swiper/css/bundle';
import * as Icon from "@phosphor-icons/react/dist/ssr";
import SwiperCore from 'swiper/core';
import FetchData from '@/services/FetchData';
import Helpers from '@/Helpers/Helpers'
import Loading from '@/components/Other/Loading'
import { useRouter } from 'next/navigation'
import { WhatsappLogo } from '@phosphor-icons/react/dist/ssr'
import Swal from 'sweetalert2'
import { v4 as uuidv4 } from 'uuid';
import { useCookies } from 'react-cookie'

SwiperCore.use([Navigation, Thumbs]);

interface Props {
    productId: string | number | null
}

const Default: React.FC<Props> = ({ productId }) => {
    const swiperRef: any = useRef();
    const [openPopupImg, setOpenPopupImg] = useState(false)
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);
    const [activeVariant, setActiveVariant] = useState<any>('')
    const [activeSize, setActiveSize] = useState<string>('')
    const [loading, setLoading] = useState(true)
    const [produk, setProduk] = useState<any>()
    const [categories, setCategories] = useState<any>([])
    const [relatedProduk, setRelatedProduk] = useState<any>([])
    const router = useRouter()
    const [phoneNumber, setPhoneNumber] = useState<any>([])
    const [discount, setDiscount] = useState<any>(null)
    const [cookies, setCookie, removeCookie] = useCookies(['qwe3dsf4wrsd']);


    const handleSwiper = (swiper: SwiperCore) => {
        setThumbsSwiper(swiper);
    };


    useEffect(() => {
        setLoading(true)
        FetchData.GetProduk(`/${productId}`).then((resp) => {
            // resp.data.variants = resp.data.variants.flatMap((variant: any) => variant.sizes.map((size: any) => ({ ...size, name: variant.name})))
            setProduk(resp?.data)
            document.title = `${resp?.data?.name} - Zhindaya `;
            FetchData.GetProduk(`?category_id=${resp?.data?.category_id}`).then((res) => {
                setRelatedProduk(res?.data)
                if(resp?.data?.variants.length > 0){
                    setActiveVariant(resp?.data?.variants[0])
                    setActiveSize(resp?.data?.variants[0]?.sizes[0]?.size)
                    if(resp?.data?.variants[0]?.sizes[0]?.discount !== null){
                        setDiscount({...resp?.data?.variants[0]?.sizes[0]?.discount, final_price: resp?.data?.variants[0]?.sizes[0]?.final_price})
                    }
                }

            })

            setLoading(false)
        })
        FetchData.GetWebSettings(`?name=wa-order`).then((res) => {
            setPhoneNumber(res?.data[0]?.value)
        })
    }, [])

    const handleActiveSize = (item: string) => {
        setActiveSize(item)
    }


    const handleActiveColor = (item: any) => {
        setActiveVariant(item)
    }

    const clickToOut = (item: any) => {

        let id: string = uuidv4()

        if (cookies.qwe3dsf4wrsd) {
            id = cookies.qwe3dsf4wrsd
        } else {
            setCookie('qwe3dsf4wrsd', id)
        }

        setLoading(true)
        FetchData.PostClickToOtherShop({
            "product_link_id": item?.id,
            "product_id": produk?.id,
            "ip_address": id,
            "user_agent": navigator.userAgent
        }).then(() => {
            window.open(item.link, '_blank')
            setLoading(false)
        }).catch(() => {
            window.open(item.link, '_blank')
            setLoading(false)
        })
    }


    const handleToShop = () => {
        const message = `Halo, saya tetarik dengan produk ${produk?.name} ${activeVariant.variant ? `warna ${activeVariant?.variant}` : ""}  ${activeSize && `ukuran ${activeSize}`} `;
        const encodedMessage = encodeURIComponent(message);
        router.push(`https://wa.me/${phoneNumber}?text=${encodedMessage}`)
    }

    const copyCurrentLink = () => {
        navigator.clipboard.writeText(window.location.href);
        Swal.fire({
            title: 'Berhasil!',
            text: 'Link produk berhasil di copy!',
            icon: 'success',
            confirmButtonText: 'Oke',
            confirmButtonColor: 'green'
        })
    }

    return (
        <>
            {loading && <Loading />}
            <div className="product-detail default">
                <div className="featured-product underwear md:py-20 py-10">
                    <div className="container flex justify-between gap-y-6 flex-wrap">
                        <div className="list-img md:w-1/2 md:pr-[45px] overflow-y-hidden w-full ">
                            {
                                produk?.images && (
                                    <>
                                        <Swiper
                                            slidesPerView={1}
                                            spaceBetween={0}
                                            thumbs={{ swiper: thumbsSwiper }}
                                            modules={[Thumbs]}
                                            className="mySwiper2 rounded-2xl "
                                        >
                                            {(activeVariant ? activeVariant?.sizes[0]?.images : produk?.images)?.map((item: any, index: number) => (
                                                <SwiperSlide
                                                    key={index}
                                                    onClick={() => {
                                                        swiperRef.current?.slideTo(index);
                                                        setOpenPopupImg(true)
                                                    }}
                                                >
                                                    <Image
                                                        src={Helpers.GetImage(item?.image)}
                                                        width={1000}
                                                        height={1000}
                                                        alt='prd-img'
                                                        className='w-full aspect-[3/4] object-cover'
                                                    />
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                        <Swiper
                                            onSwiper={(swiper) => {
                                                handleSwiper(swiper)
                                            }}
                                            spaceBetween={0}
                                            slidesPerView={4}
                                            freeMode={true}
                                            watchSlidesProgress={true}
                                            modules={[Navigation, Thumbs]}
                                            className="mySwiper swiper-float"
                                        >
                                            {(activeVariant ? activeVariant?.sizes[0]?.images : produk?.images)?.map((item: any, index: number) => (<SwiperSlide
                                                key={index}
                                            >
                                                <Image
                                                    src={Helpers.GetImage(item?.image)}
                                                    width={1000}
                                                    height={1000}
                                                    alt='prd-img'
                                                    className='w-full aspect-[3/4] object-cover rounded-xl'
                                                />
                                            </SwiperSlide>
                                            ))}
                                        </Swiper>


                                        <div className={`popup-img ${openPopupImg ? 'open' : ''}`}>
                                            <span
                                                className="close-popup-btn absolute top-4 right-4 z-[2] cursor-pointer"
                                                onClick={() => {
                                                    setOpenPopupImg(false)
                                                }}
                                            >
                                                <Icon.X className="text-3xl text-white" />
                                            </span>
                                            <Swiper
                                                spaceBetween={0}
                                                slidesPerView={1}
                                                modules={[Navigation, Thumbs]}
                                                navigation={true}
                                                loop={true}
                                                className="popupSwiper"
                                                onSwiper={(swiper) => {
                                                    swiperRef.current = swiper
                                                }}
                                            >
                                                {(activeVariant ? activeVariant?.sizes[0]?.images : produk?.images)?.map((item: any, index: number) => (
                                                    <SwiperSlide
                                                        key={index}
                                                    >
                                                        <Image
                                                            src={Helpers.GetImage(item?.image)}
                                                            width={1000}
                                                            height={1000}
                                                            alt='prd-img'
                                                            className='w-full aspect-[3/4] object-cover rounded-xl'
                                                        />
                                                    </SwiperSlide>
                                                ))}

                                            </Swiper>
                                        </div>
                                    </>
                                )
                            }

                        </div>
                        <div className="product-infor md:w-1/2 w-full lg:pl-[15px] md:pl-2">
                            <div className="flex justify-between">
                                <div>
                                    <div className="caption2 text-secondary font-semibold uppercase">{categories?.filter((x: any) => x.id == produk?.category_id)[0]?.name}</div>
                                    <div className="heading4 mt-1 ">{produk?.name}</div>
                                </div>
                                <div className="border-b pb-6 border-line "></div>

                            </div>
                            <div className="flex items-center gap-3  flex-wrap mt-5 ">
                                <div className={`product-price heading5 `}>{Helpers.FormatPrice(activeVariant ? discount ? discount?.final_price : activeVariant?.sizes?.filter((x: any) => x.size === activeSize)[0]?.final_price || produk?.final_price : produk?.final_price)}</div>
                                <div className={`w-px h-4 bg-line ${produk?.final_price !== produk?.price || discount ? "" : "hidden"}`}></div>
                                <div className={`product-origin-price font-normal text-secondary2 ${produk?.final_price !== produk?.price || discount ? "" : "hidden"}`}><del>{Helpers.FormatPrice(activeVariant ? parseInt(activeVariant?.sizes?.filter((x: any) => x.size == activeSize)[0]?.additional_price || 0) + parseInt(produk?.price) : produk?.price)}</del></div>

                                {((produk?.discount?.discount_percentage && produk?.discount?.discount_amount == 0) || (discount && discount?.discount_percentage && discount?.discount_amount == 0)) && (
                                    <div className="product-sale caption2 font-semibold bg-green px-3 py-0.5 inline-block rounded-full">
                                        -{produk?.discount?.discount_percentage || discount?.discount_percentage}%
                                    </div>
                                )}

                                {((produk?.discount?.discount_amount && produk?.discount?.discount_percentage == 0) || (discount && discount?.discount_amount && discount?.discount_percentage == 0)) && (
                                    <div className="product-sale caption2 font-semibold bg-green px-3 py-0.5 inline-block rounded-full">
                                        - {Helpers.FormatPrice(produk?.discount?.discount_amount || discount?.discount_amount)}
                                    </div>
                                )}

                            </div>
                            <div className={`list-action mt-6`}>
                                <div className={produk?.variants?.length > 0 ? "" : "hidden"}>
                                    <div className={`choose-color`}>
                                        <div className="text-title">Variant: <span className='text-title color'>{activeVariant?.name}</span></div>
                                        <div className="list-color flex items-center gap-2 flex-wrap mt-3">
                                            {produk?.variants?.map((item: any, index: number) => (
                                                <div
                                                    className={`color-item w-12 relative  rounded-xl duration-300  object-cover  ${activeVariant?.name === item?.name ? 'active' : ''}`}
                                                    key={index}
                                                    datatype={item.image}
                                                    onClick={() => {
                                                        handleActiveColor(item)
                                                    }}
                                                >
                                                    {item?.sizes?.filter((x: any) => x.discount !== null).length > 0 && <div className={`bg-red text-white text-xs rounded-t-xl inset-0 text-center`}>%</div>}

                                                    <Image
                                                        src={Helpers.GetImage(item?.sizes[0]?.images[0]?.image)}
                                                        width={100}
                                                        height={100}
                                                        alt='color'
                                                        className='rounded-xl'
                                                    />
                                                    <div className="tag-action bg-black text-white caption2 capitalize px-1.5 py-0.5 rounded-sm whitespace-nowrap">
                                                        {item.name}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                              
                                    <div className={`choose-size mt-5 ${activeVariant && activeVariant?.sizes[0]?.size?.includes("All") && "hidden"}`}>
                                        <div className={`heading  items-center justify-between ${activeVariant.sizes ? "flex" : "hidden"}`}>
                                            <div className="text-title">Ukuran: <span className='text-title size'>{activeSize}</span></div>
                                            {/* <div
                                            className="caption1 size-guide text-red  flex gap-x-2 items-center cursor-pointer"
                                            onClick={handleOpenSizeGuide}
                                        >
                                           Bingung ? <div className='underline caption1 font-bold'>Saran Ukuran</div>
                                        </div> */}
                                            {/* <ModalSizeguide data={productMain} isOpen={openSizeGuide} onClose={handleCloseSizeGuide} /> */}
                                        </div>
                                        <div className="list-size flex items-center gap-2 flex-wrap mt-3">
                                            {activeVariant?.sizes?.map((item: any, index: number) => (
                                                <div
                                                    className={`size-item relative w-12 h-12 flex items-center justify-center text-button rounded-full bg-white border border-line ${activeSize === item?.size ? 'active' : ''}`}
                                                    key={index}
                                                    onClick={() => { handleActiveSize(item?.size); setDiscount(item?.discount ? { ...item?.discount, final_price: item?.final_price } : null) }}
                                                >
                                                    <span className={`${item.discount !== null ? "flex" : "hidden"} absolute bg-red text-white rounded-t-full -top-3 left-8 rotate-45`}>%</span>
                                                    {item?.size}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>


                                <div className="button-block mt-5" >
                                    <button onClick={handleToShop} className={`button-main flex justify-center items-center gap-x-2 ${(activeSize ? activeVariant?.sizes?.filter((x: any) => x.size === activeSize)[0]?.stock === 0 : produk?.stock === 0) ? ` bg-surface text-secondary2 hover:bg-surface hover:text-secondary2` : ""}  w-full text-center`} disabled={activeSize ? activeVariant?.sizes?.filter((x: any) => x.size === activeSize)[0]?.stock === 0 : produk?.stock === 0} > <WhatsappLogo className={(activeSize ? activeVariant?.sizes?.filter((x: any) => x.size === activeSize)[0]?.stock === 0 : produk?.stock === 0) ? 'hidden' : 'block'} weight='fill' size={27} />  {(activeSize ? activeVariant?.sizes?.filter((x: any) => x.size == activeSize)[0]?.stock === 0 : produk?.stock === 0) ? "Stok Habis" : "Beli sekarang"}</button>
                                </div>
                                <div className={`list-payment mt-7 ${produk?.links.length > 0 ? "block" : "hidden"}`}>
                                    <div className="main-content lg:pt-8 pt-6 lg:pb-6 pb-4 sm:px-4 px-3 border border-line rounded-xl relative  w-full">
                                        <div className="heading6 px-5 bg-white absolute  -top-[14px] left-1/2 -translate-x-1/2 whitespace-nowrap">Atau lanjutkan via</div>
                                        <div className="list grid justify-items-center grid-flow-col md:grid-cols-6 ">
                                            {
                                                produk?.links?.map((link: any, key: any) => (
                                                    <Image
                                                        key={key}
                                                        src={Helpers.GetImage(link?.link_type?.image)}
                                                        width={60}
                                                        height={60}
                                                        alt='alternate'
                                                        className='w-[100px] cursor-pointer bg-gray-200'
                                                        onClick={() => clickToOut(link)}
                                                    />
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center lg:gap-20 gap-8 mt-5 pb-6 border-b border-line">

                                    <div className="share flex items-center gap-3 cursor-pointer" onClick={copyCurrentLink}>
                                        <div className="share-btn md:w-12 md:h-12 w-10 h-10 flex items-center justify-center border border-line cursor-pointer rounded-xl duration-300 hover:bg-black hover:text-white">
                                            <Icon.ShareNetwork weight='fill' className='heading6' />
                                        </div>
                                        <span>Share produk</span>
                                    </div>
                                </div>
                                <div className="more-infor mt-6">
                                    {/* <div className="flex items-center gap-4 flex-wrap">
                                        <div className="flex items-center gap-1">
                                            <Icon.ArrowClockwise className='body1' />
                                            <div className="text-title">Delivery & Return</div>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Icon.Question className='body1' />
                                            <div className="text-title">Ask A Question</div>
                                        </div>
                                    </div> */}
                                    {/* <div className="flex items-center gap-1 mt-3">
                                        <Icon.Timer className='body1' />
                                        <div className="text-title">Estimated Delivery:</div>
                                        <div className="text-secondary">14 January - 18 January</div>
                                    </div> */}
                                    {/* <div className="flex items-center gap-1 mt-3">
                                        <Icon.Eye className='body1' />
                                        <div className="text-title">38</div>
                                        <div className="text-secondary">orang melihat produk ini</div>
                                    </div> */}
                                    {/* <div className="flex items-center gap-1 mt-3">
                                        <div className="text-title">Stock:</div>
                                        <div className="text-secondary">{produk?.stock}</div>
                                    </div> */}
                                    {/* <div className="flex items-center gap-1 mt-3">
                                        <div className="text-title">SKU:</div>
                                        <div className="text-secondary">53453412</div>
                                    </div> */}
                                    <div className="flex items-center gap-1 mt-3">
                                        <div className="text-title">Categories:</div>
                                        <div className="text-secondary">{produk?.category?.name}</div>
                                    </div>
                                </div>
                            </div>
                            <div className='desc text-secondary mt-3 pt-6 border-t  border-line' dangerouslySetInnerHTML={{ __html: produk?.description }} />
                        </div>
                    </div>
                </div>

                <div className="related-product md:py-20 py-10">
                    <div className="container">
                        <div className="heading3 text-center">Related Produk</div>
                        <div className="list-product hide-product-sold  grid lg:grid-cols-4 grid-cols-2 md:gap-[90px] gap-5 md:mt-10 mt-6">
                            {relatedProduk?.slice(0, 5).map((item: any, index: number) => (
                                <Product key={index} data={item} type='grid' style='style-1' />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Default