'use client'
import React, { useEffect, useState } from 'react'
import MenuOne from '@/components/Header/Menu/MenuOne'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import Footer from '@/components/Footer/Footer'
import FetchData from '@/services/FetchData'

const ContactUs = () => {
    const [wa, setWa] = useState<string | null>(null)
    const [form, setForm] = useState({ name: '', email: '', message: '' })

    useEffect(() => {
        FetchData.GetWebSettings(`?name=wa-general`).then((res) => {
            setWa(res?.data[0]?.value)
        })
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.id]: e.target.value })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!wa) {
            alert('Nomor WhatsApp tidak tersedia.')
            return
        }

        const message = `Halo, saya ${form.name} ${form.email}.\n\n${form.message}`
        const whatsappUrl = `https://wa.me/${wa}?text=${encodeURIComponent(message)}`

        window.open(whatsappUrl, '_blank')
    }

    return (
        <>
            <div id="header" className="relative w-full">
                <MenuOne props="bg-transparent" />
                <Breadcrumb heading="Kontak Kami" subHeading="Kontak Kami" />
            </div>
            <div className="contact-us md:py-20 py-10">
                <div className="container">
                    <div className="flex justify-between max-lg:flex-col gap-y-10">
                        <div className="left lg:w-2/3 lg:pr-4">
                            <div className="heading3">Kontak Kami</div>
                            <div className="body1 text-secondary2 mt-3">Bila ada kendala atau saran bisa hubungi kami</div>
                            <form className="md:mt-6 mt-4" onSubmit={handleSubmit}>
                                <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 gap-y-5">
                                    <div className="name">
                                        <input
                                            className="border-line px-4 py-3 w-full rounded-lg"
                                            id="name"
                                            type="text"
                                            placeholder="Your Name *"
                                            required
                                            value={form.name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="email">
                                        <input
                                            className="border-line px-4 py-3 w-full rounded-lg"
                                            id="email"
                                            type="email"
                                            placeholder="Your Email *"
                                            required
                                            value={form.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="message sm:col-span-2">
                                        <textarea
                                            className="border-line px-4 py-3 w-full rounded-lg"
                                            id="message"
                                            rows={3}
                                            placeholder="Your Message *"
                                            required
                                            value={form.message}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="block-button md:mt-6 mt-4">
                                    <button className="button-main">Kirim Pesan</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default ContactUs
