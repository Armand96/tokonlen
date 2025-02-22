import React from 'react'

interface Props {
    props: string;
}

const Benefit: React.FC<Props> = ({ props }) => {
    return (
        <>
            <div className="container">
                <div className={`benefit-block ${props}`}>
                    <div className="list-benefit grid items-start lg:grid-cols-4 grid-cols-2 gap-[30px]">
                        <div className="benefit-item flex flex-col items-center justify-center">
                            <i className="icon-phone-call lg:text-7xl text-5xl"></i>
                            <div className="heading6 text-center mt-5">24/7 Customer Service</div>
                            <div className="caption1 text-secondary text-center mt-3">Kami siap melayani anda 24/7 Jam</div>
                        </div>
                        <div className="benefit-item flex flex-col items-center justify-center">
                            <i className="icon-return lg:text-7xl text-5xl"></i>
                            <div className="heading6 text-center mt-5">Garansi Uang Kembali</div>
                            <div className="caption1 text-secondary text-center mt-3">Jika anda tidak puas dengan hasilnya anda dapat mengajukan pengembalian uang.</div>
                        </div>
                        <div className="benefit-item flex flex-col items-center justify-center">
                            <i className="icon-guarantee lg:text-7xl text-5xl"></i>
                            <div className="heading6 text-center mt-5">Barang Berkualitas</div>
                            <div className="caption1 text-secondary text-center mt-3">Kami pastikan produk yang kami jual berkualitas tinggi dengan standar internasional walau buatan lokal</div>
                        </div>
                        <div className="benefit-item flex flex-col items-center justify-center">
                            <i className="icon-delivery-truck lg:text-7xl text-5xl"></i>
                            <div className="heading6 text-center mt-5">Pengiriman ke suluruh indonesia</div>
                            <div className="caption1 text-secondary text-center mt-3">kami siap mengirim ke suluruh ke indonesia</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Benefit