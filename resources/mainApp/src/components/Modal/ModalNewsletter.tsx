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
        FetchData.GetWebSettings(`?name=popup`).then((res) => {
            setWebSettings(res?.data[0])
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
                    <div className="main-content flex rounded-[20px] overflow-hidden w-full">
                       <div className="w-full bg-white h-[40vh] flex items-center justify-center">
                           <Image width="300" height="300" src={Helpers.GetImage(webSettings?.value)}  className='w-full h-full object-cover' alt={'popup'}  />
                       </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalNewsletter
