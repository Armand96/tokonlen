import React from 'react'
import { ModalLayout } from '../HeadlessUI'
import { HelperFunction } from '../../helpers/HelpersFunction'

import { Swiper as Swiperjs, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/scrollbar'
import 'swiper/css/effect-fade'
import 'swiper/css/effect-creative'
import 'swiper/css/effect-flip'

interface ModalPreviewTypes {
	toggleModal: () => void,
	isOpen: boolean,
	img: any[]
}

const ModalPreviewMulti = ({ toggleModal, isOpen, img }: ModalPreviewTypes) => {
	const pagination = {
		clickable: true,
		renderBullet: function (index: number, className: string) {
			return '<span class="' + className + '">' + (index + 1) + '</span>'
		},
	}
	return (

		<ModalLayout showModal={isOpen} toggleModal={toggleModal} placement="items-center justify-center" panelClassName='overflow-x-hidden'>
			<div className="duration-300 ease-in-out transition-all m-3 sm:mx-auto flex flex-col bg-white shadow-sm rounded dark:bg-gray-800">
			
				<div className="card">
					<div className="p-6">
						<h4 className="card-title mb-4">Preview image</h4>

						<Swiperjs className="pagination-custom-swiper rounded w-[900px]" loop={true} navigation={true} autoplay={{ delay: 2000 }} pagination={{ type: 'bullets' }} modules={[Pagination, Autoplay, Navigation]}>
							{
								img?.map((image: any, index: number) => (
									<SwiperSlide key={index}>
										<img className='object-contain max-h-[80vh] w-full ' src={HelperFunction.GetImage(image?.image)} alt="Preview" />
									</SwiperSlide>
								))
							}
							

						</Swiperjs>

					
					</div>
				</div>
				<div className="flex justify-end items-center gap-2 p-4 border-t dark:border-slate-700">
					<button className="btn bg-light text-gray-800 transition-all" onClick={toggleModal}>
						Close
					</button>

				</div>
			</div>
		</ModalLayout>

	)
}

export default ModalPreviewMulti