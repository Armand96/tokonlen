import React from 'react'

// redux
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { changeLayoutTheme, changeSideBarType, showRightSidebar } from '../redux/actions'

// hooks
import { useViewPort } from '../hooks'

// constants
import { SideBarType, LayoutTheme } from '../constants'

// assets
import profilePic from '@/assets/images/users/avatar-1.jpg'

import MaximizeScreen from '../components/MaximizeScreen'
import ProfileDropDown from '../components/ProfileDropDown'

export interface NotificationItem {
	id: number
	text: string
	subText: string
	icon?: string
	avatar?: string
	bgColor?: string
	createdAt: Date
}



/**
 * profile menu items
 */
const profileMenus = [
	{
		label: 'Logout',
		icon: 'ri-logout-box-line',
		redirectTo: '/auth/logout',
	},
]


const Topbar = () => {
	const dispatch = useDispatch<AppDispatch>()
	const { width } = useViewPort()

	const { layoutTheme, sideBarType } = useSelector((state: RootState) => ({
		layoutTheme: state.Layout.layoutTheme,
		sideBarType: state.Layout.sideBarType,
	}))

	/**
	 * Toggle the leftmenu when having mobile screen
	 */
	const handleLeftMenuCallBack = () => {
		const HTMLTag = document.getElementsByTagName('html')[0]
		if (width < 1140) {
			if (sideBarType === SideBarType.LEFT_SIDEBAR_TYPE_SMALL) {
				dispatch(changeSideBarType(SideBarType.LEFT_SIDEBAR_TYPE_DEFAULT))
			} else if (sideBarType === SideBarType.LEFT_SIDEBAR_TYPE_MOBILE) {
				showLeftSideBarBackdrop()
				HTMLTag.classList.add('sidenav-enable')
			} else {
				dispatch(changeSideBarType(SideBarType.LEFT_SIDEBAR_TYPE_SMALL))
			}
		} else if (sideBarType === SideBarType.LEFT_SIDEBAR_TYPE_SMALL || sideBarType === SideBarType.LEFT_SIDEBAR_TYPE_HIDDEN) {
			dispatch(changeSideBarType(SideBarType.LEFT_SIDEBAR_TYPE_DEFAULT))
		} else if (sideBarType === SideBarType.LEFT_SIDEBAR_TYPE_MOBILE) {
			showLeftSideBarBackdrop()
			HTMLTag.classList.add('sidenav-enable')
		} else {
			dispatch(changeSideBarType(SideBarType.LEFT_SIDEBAR_TYPE_SMALL))
		}
	}

	/**
	 * toggling style to the body tag
	 */
	function toggleBodyStyle(set: boolean) {
		if (set == false) {
			document.body.removeAttribute('style')
		} else {
			document.body.style.overflow = 'hidden'
			document.body.style.paddingRight = '16px'
		}
	}

	/**
	 * creates backdrop for leftsidebar
	 */
	function showLeftSideBarBackdrop() {
		const backdrop = document.createElement('div')
		backdrop.id = 'custom-backdrop'
		backdrop.className = 'transition-all fixed inset-0 z-40 bg-gray-900 bg-opacity-50 dark:bg-opacity-80'
		document.body.appendChild(backdrop)

		backdrop.addEventListener('click', function () {
			document.getElementsByTagName('html')[0].classList.remove('sidenav-enable')
			toggleBodyStyle(false)
			dispatch(changeSideBarType(SideBarType.LEFT_SIDEBAR_TYPE_MOBILE))
			hideLeftSideBarBackdrop()
		})
	}

	function hideLeftSideBarBackdrop() {
		const backdrop = document.getElementById('custom-backdrop')
		document.getElementsByTagName('html')[0].classList.remove('sidenav-enable')
		if (backdrop) {
			document.body.removeChild(backdrop)
			document.body.style.removeProperty('overflow')
		}
	}


	return (
		<React.Fragment>
			<header className="app-header flex justify-between items-center px-4 gap-3.5">

				<button id="button-toggle-menu" className="nav-link p-2" onClick={handleLeftMenuCallBack}>
					<span className="sr-only">Menu Toggle Button</span>
					<span className="flex items-center justify-center">
						<i className="ri-menu-2-fill text-2xl"></i>
					</span>
				</button>
				

				<div className="flex w-fit gap-x-6">
					

					<div className="md:flex hidden">
						<MaximizeScreen />
					</div>

					<div className="relative">
						<ProfileDropDown profiliePic={profilePic} menuItems={profileMenus} username="Admin" userTitle="Admin" />
					</div>
				</div>
			</header>
		</React.Fragment>
	)
}

export default Topbar
