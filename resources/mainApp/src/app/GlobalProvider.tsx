import React from 'react'
import { CartProvider } from '@/context/CartContext'
import { ModalCartProvider } from '@/context/ModalCartContext'
import { WishlistProvider } from '@/context/WishlistContext'
import { ModalWishlistProvider } from '@/context/ModalWishlistContext'
import { CompareProvider } from '@/context/CompareContext'
import { ModalCompareProvider } from '@/context/ModalCompareContext'
import { ModalSearchProvider } from '@/context/ModalSearchContext'
import { ModalQuickviewProvider } from '@/context/ModalQuickviewContext'

const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const providers = [CartProvider, ModalCartProvider, ModalCompareProvider, WishlistProvider, ModalWishlistProvider, ModalSearchProvider, ModalQuickviewProvider, CompareProvider]
    return providers.reduceRight((acc, Provider) => <Provider>{acc}</Provider>, children)
    
}

export default GlobalProvider