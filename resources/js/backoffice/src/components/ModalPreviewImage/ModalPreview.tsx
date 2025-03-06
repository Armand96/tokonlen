import React from 'react'
import { ModalLayout } from '../HeadlessUI'
import { HelperFunction } from '../../helpers/HelpersFunction'


interface ModalPreviewTypes {
	toggleModal: () => void,
	isOpen: boolean,
	img: string
}

const ModalPreview = ({ toggleModal, isOpen, img }: ModalPreviewTypes) => {
	return (

		<ModalLayout showModal={isOpen} toggleModal={toggleModal} placement="items-center justify-center">
			<div className="duration-300 ease-in-out transition-all m-3 sm:mx-auto flex flex-col bg-white shadow-sm rounded dark:bg-gray-800">

				<img className='object-contain max-h-[80vh] w-full' src={HelperFunction.GetImage(img)} alt="Preview" />
				<div className="flex justify-end items-center gap-2 p-4 border-t dark:border-slate-700">
					<button className="btn bg-light text-gray-800 transition-all" onClick={toggleModal}>
						Close
					</button>

				</div>
			</div>
		</ModalLayout>

	)
}

export default ModalPreview