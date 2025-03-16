import React from 'react'
import { WishlistProvider } from '@/context/WishlistContext'
import { ModalWishlistProvider } from '@/context/ModalWishlistContext'
import { ModalSearchProvider } from '@/context/ModalSearchContext'


const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const providers = [ WishlistProvider, ModalWishlistProvider, ModalSearchProvider]
    return providers.reduceRight((acc, Provider) => <Provider>{acc}</Provider>, children)
    
}

export default GlobalProvider