'use client'

import Helpers from '@/Helpers/Helpers'
import FetchData from '@/services/FetchData'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'

const ModalNewsletter = () => {
    const [open, setOpen] = useState<boolean>(false)
        const [webSettings, setWebSettings] = useState<any>([])
    const router = useRouter()


    useEffect(() => {
        FetchData.GetWebSettings(``).then((res) => {
            setWebSettings(res?.data)
            if(!sessionStorage.getItem("modal")){
                setTimeout(() => {
                    setOpen(true)
                    sessionStorage.setItem("modal", "ada")
                }, 3000)
            }
        })
   
    }, [])

    return (
        <div className="modal-newsletter" onClick={() => setOpen(false)}>
            <div className="container h-full flex items-center justify-center w-full">
                <div
                    className={`modal-newsletter-main ${open ? 'open' : ''}`}
                    onClick={(e) => { e.stopPropagation() }}
                >
                    <div className="main-content flex rounded-[20px] overflow-hidden w-full" onClick={() => router.push(webSettings?.filter((x: any) => x.name === "link-popup")[0]?.value)}>
                       <div className="w-full bg-white h-[40vh] lg:h-[60vh] flex items-center justify-center">
                           <Image width="300" height="300" src={Helpers.GetImage(webSettings?.filter((x: any) => x.name === "popup")[0]?.value)}  className='w-full h-full object-cover' alt={'popup'}  />
                       </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalNewsletter
