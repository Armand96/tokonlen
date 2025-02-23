import MenuOne from '@/components/Header/Menu/MenuOne'
import Slider from '@/components/Slider/Slider'
import WhatNewOne from '@/components/Home/WhatNewOne'
import productData from '@/data/Product.json'
import Collection from '@/components/Home/Collection'
import TabFeatures from '@/components/Home/TabFeatures'
import Benefit from '@/components/Home/Benefit'
import testimonialData from '@/data/Testimonial.json'
import Testimonial from '@/components/Home/Testimonial'
import Brand from '@/components/Home/Brand'
import Footer from '@/components/Footer/Footer'

export default async function Home() {
 


  return (
    <>
      <div id="header" className='relative w-full'>
        <MenuOne  props="bg-transparent" />
        <Slider />
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

