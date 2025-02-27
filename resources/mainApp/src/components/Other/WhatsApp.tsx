"use client"
import { WhatsappLogo } from '@phosphor-icons/react/dist/ssr'
import { useRouter } from 'next/navigation'
import React from 'react'

export const WhatsApp = () => {
        const router = useRouter()
    

    const handleToShop = () => {
        const phoneNumber = "6285310340777"; 
        const message = `Halo, saya tetarik untuk membeli di zhindaya store`; 
        const encodedMessage = encodeURIComponent(message);
        router.push(`https://wa.me/${phoneNumber}?text=${encodedMessage}`)
    }


  return (
    <div onClick={handleToShop} className='fixed z-[100] bottom-6 rounded-full cursor-pointer right-6 bg-[#25d366] w-[60px] h-[60px] flex justify-center items-center'>
        <WhatsappLogo className='text-white text-[40px]' />
    </div>
  )
}
