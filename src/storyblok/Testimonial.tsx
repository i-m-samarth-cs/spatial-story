import * as React from 'react'
import { storyblokEditable } from '@storyblok/react/rsc'
import NextImage from 'next/image'
import type { TestimonialContent } from '../content'
import { backgroundColor } from './backgroundColorClass'

export type TestimonialProps = {
  blok: TestimonialContent
}

function Testimonial(props: TestimonialProps) {
  return (
    <div
      className="flex flex-col items-start gap-6 p-12 flex-1 rounded-[12px] bg-white"
      {...storyblokEditable(props.blok)}
    >
      <p className="self-stretch justify-start text-stone-900 text-base font-normal leading-normal">
        “{props.blok.quote}”
      </p>
      <div className="self-stretch flex gap-5">
        {props.blok.image ? (
          <div
            className={`aspect-[1/1] shrink-0 w-[44px] h-[44px] overflow-hidden rounded-full ${backgroundColor(
              props.blok.imageBackgroundColor,
            )}`}
          >
            <NextImage
              className="object-cover w-full h-full "
              src={props.blok.image?.filename}
              alt={props.blok.image?.alt ?? ''}
              width={100}
              height={100}
            />
          </div>
        ) : null}
        <div className="flex flex-col">
          <div className="justify-start text-stone-900 text-base font-bold font-['Inter']">
            {props.blok.name}
          </div>
          <div className="justify-start text-stone-900 text-base font-normal leading-normal">
            {props.blok.title}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Testimonial
