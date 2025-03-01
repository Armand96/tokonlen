import MenuOne from '@/components/Header/Menu/MenuOneMainPage'
import WhatNewOne from '@/components/Home/WhatNewOne'
import Collection from '@/components/Home/Collection'
import Benefit from '@/components/Home/Benefit'
import testimonialData from '@/data/Testimonial.json'
import Testimonial from '@/components/Home/Testimonial'
import Brand from '@/components/Home/Brand'
import Footer from '@/components/Footer/Footer'
import SliderFour from '@/components/Slider/SliderFour'

export default async function Home() {

  return (
    <>
      <div id="header" className='relative w-full'>
        <MenuOne  props="bg-transparent" />
        <SliderFour />
      </div>
      <WhatNewOne  start={0} limit={4} />
      <Collection />
      <Benefit props="md:py-20 py-10" />
      <Testimonial data={testimonialData} limit={6} />
      <Brand />
      <Footer />
    </>
  )
}

