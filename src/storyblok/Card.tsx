import * as React from 'react'
import { storyblokEditable } from '@storyblok/react/rsc'
import NextImage from 'next/image'
import type { CardContent } from '../content'
import RichTextView from '../components/RichText'

export type CardProps = {
  blok: CardContent
  className?: string
}

function Card(props: CardProps) {
  return (
    <div
      {...storyblokEditable(props.blok)}
      className={`flex flex-col justify-start items-start gap-4 bg-white rounded-[20px] p-4 sm:p-6 ${props.className}`}
    >
      {props.blok.icon ? (
        <NextImage
          className="box-content p-2 w-10 h-10 sm:w-[34px] sm:h-[34px]"
          src={props.blok.icon?.filename}
          alt={props.blok.icon?.alt ?? ''}
          width={34}
          height={34}
        />
      ) : null}
      <RichTextView doc={props.blok.description} />
    </div>
  )
}

export default Card
