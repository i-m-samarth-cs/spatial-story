import * as React from 'react'
import { storyblokEditable } from '@storyblok/react/rsc'
import NextImage from 'next/image'
import type { TeamMemberContent } from '../content'
import { backgroundColor } from './backgroundColorClass'

type TeamMemberProps = {
  blok: TeamMemberContent
}

function TeamMember(props: TeamMemberProps) {
  return (
    <div
      className="w-96 inline-flex flex-col justify-start items-start gap-6"
      {...storyblokEditable(props.blok)}
    >
      <div
        className={`self-stretch relative rounded-xl inline-flex justify-start items-center gap-2.5 overflow-hidden ${backgroundColor(
          props.blok.backgroundColor,
        )}`}
      >
        {props.blok.image ? (
          <NextImage
            className="translate-y-[50px] w-96 h-96 rounded-md object-contain"
            src={props.blok.image?.filename}
            alt={props.blok.image?.alt ?? ''}
            width={368}
            height={384}
          />
        ) : null}
      </div>
      <div className="self-stretch flex flex-col justify-start items-start">
        <div className="justify-start text-stone-900 text-2xl font-extrabold leading-loose">
          {props.blok.name}
        </div>
        <div className="self-stretch justify-start text-stone-900 text-base font-normal leading-7">
          {props.blok.title}
        </div>
      </div>
    </div>
  )
}

export default TeamMember
