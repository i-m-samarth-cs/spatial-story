import * as React from 'react'
import { storyblokEditable } from '@storyblok/react/rsc'
import type { CardsContent } from '../content'
import RichTextView from '../components/RichText'
import Card from './Card'

export type CardsProps = {
  blok: CardsContent
}

function Cards(props: CardsProps) {
  return (
    <div
      className="self-stretch px-5 py-10 md:px-20 md:py-24 bg-neutral-100 items-center flex flex-col"
      {...storyblokEditable(props.blok)}
    >
      <div className="max-w-6xl flex flex-col gap-10">
        <div className="self-stretch flex-1 inline-flex flex-col justify-center items-start gap-2">
          <RichTextView doc={props.blok.description} />
        </div>
        <div className="self-stretch flex justify-start items-stretch gap-4 md:gap-6 flex-col md:flex-row">
          {props.blok.cards?.map((card) => (
            <Card
              className="flex-1 self-stretch"
              key={card._uid}
              blok={card}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Cards
