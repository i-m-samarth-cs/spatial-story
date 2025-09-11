import * as React from 'react'
import { storyblokEditable } from '@storyblok/react/rsc'
import type { TestimonialsContent } from '../content'
import Content from './Content'

export type TestimonialsProps = {
  blok: TestimonialsContent
}

function Testimonials(props: TestimonialsProps) {
  return (
    <div
      className="flex flex-col items-center self-stretch gap-[60px] px-5 pt-[60px] pb-[100px] bg-neutral-100 sm:gap-[60px] sm:px-20 sm:pt-[60px] sm:pb-[100px]"
      {...storyblokEditable(props.blok)}
    >
      <div className="flex flex-col gap-2 sm:gap-4">
        <h2 className="flex-1 text-center text-3xl leading-[38px] tracking-[-0.3px] font-extrabold text-[#1F1F1F] font-inter       sm:text-[60px] sm:leading-[72px] sm:tracking-[-0.6px]">
          {props.blok.title}
        </h2>
        <p className="self-stretch text-center text-base leading-6 text-[#44474A] font-inter font-normal       sm:text-[18px] sm:leading-[28px]">
          {props.blok.description}
        </p>
      </div>
      <div className="self-stretch flex justify-start items-stretch gap-4 md:gap-6 flex-col md:flex-row">
        {props.blok.testimonials?.map((testimonial, index) => (
          <Content
            blok={testimonial}
            key={index}
          />
        ))}
      </div>
    </div>
  )
}

export default Testimonials
