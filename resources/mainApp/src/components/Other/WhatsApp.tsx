"use client"
import FetchData from '@/services/FetchData'
import { WhatsappLogo } from '@phosphor-icons/react/dist/ssr'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export const WhatsApp = () => {
        const router = useRouter()
        const [phoneNumber, setPhoneNumber] = useState<any>([])

    

    const handleToShop = () => {
        const message = `Halo, saya tetarik untuk membeli di zhindaya store`; 
        const encodedMessage = encodeURIComponent(message);
        router.push(`https://wa.me/${phoneNumber}?text=${encodedMessage}`)
    }

    

    useEffect(() => {
        FetchData.GetWebSettings(`?name=wa-general`).then((res) => {
          setPhoneNumber(res?.data[0]?.value)
        })
    },[])


  return (
    <div onClick={handleToShop} className='fixed z-[100] bottom-6 rounded-full cursor-pointer right-6 bg-[#25d366]  w-[60px] h-[60px] flex justify-center items-center'>
        <WhatsappLogo className='text-white text-[36px] md:text-[40px]' />
    </div>
  )
}
