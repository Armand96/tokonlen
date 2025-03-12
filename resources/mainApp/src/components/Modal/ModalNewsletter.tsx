'use client'

import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'

const ModalNewsletter = () => {
    const [open, setOpen] = useState<boolean>(false)
    const router = useRouter()


    useEffect(() => {
        if(!sessionStorage.getItem("modal")){
            setTimeout(() => {
                setOpen(true)
                sessionStorage.setItem("modal", "ada")
            }, 3000)
        }
    }, [])

    return (
        <div className="modal-newsletter" onClick={() => setOpen(false)}>
            <div className="container h-full flex items-center justify-center w-full">
                <div
                    className={`modal-newsletter-main ${open ? 'open' : ''}`}
                    onClick={(e) => { e.stopPropagation() }}
                >
                    <div className="main-content flex rounded-[20px] overflow-hidden w-full">
                       <div className="w-full bg-white h-80 flex items-center justify-center">
                            <h1>Promo untuk mu</h1>
                       </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalNewsletter
