import { Link } from 'react-router-dom'

import React from 'react'

const LogoBox = () => {
	return (
		<>
			<Link to="/" className="logo-box">
				<div className="logo-light">
					{/* <img src={logo} className="logo-lg h-[22px]" alt="Light logo" />
					<img src={logoSm} className="logo-sm h-[22px]" alt="Small logo" /> */}
					<p className='text-xl font-bold logo-sm'>Z</p>
					<p className='text-xl font-bold logo-lg'>Zhindaya</p>

				</div>
{/* 
				<div className="logo-dark">
					<img src={logoDark} className="logo-lg h-[22px]" alt="Dark logo" />
					<img src={logoSm} className="logo-sm h-[22px]" alt="Small logo" />
				</div> */}
			</Link>
		</>
	)
}

export default LogoBox
