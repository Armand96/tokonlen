import React from 'react'
import { TestimonialType } from '@/type/TestimonialType'

interface TestimonialProps {
    data: TestimonialType
    type: string
}

const TestimonialItem: React.FC<TestimonialProps> = ({ data, type }) => {
    return (
                <div className="testimonial-item style-one h-full">
                    <div className="testimonial-main bg-white p-8 rounded-2xl h-full">
                        <div className="heading6 title mt-4">{data.title}</div>
                        <div className="desc mt-2">{data.description}</div>
                        <div className="text-button name mt-4">{data.name}</div>
                        <div className="caption2 date text-secondary2 mt-1">{data.date}</div>
                    </div>
                </div>
    )
}

export default TestimonialItem