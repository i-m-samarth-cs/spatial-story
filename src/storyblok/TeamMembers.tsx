import * as React from 'react'
import { storyblokEditable } from '@storyblok/react/rsc'
import type { TeamMembersContent } from '../content'
import RichTextView from '../components/RichText'
import TeamMember from './TeamMember'

export type TeamMembersProps = {
  blok: TeamMembersContent
}

function TeamMembers(props: TeamMembersProps) {
  return (
    <div
      className="self-stretch px-5 py-10 md:px-20 md:py-24 items-center flex flex-col"
      {...storyblokEditable(props.blok)}
    >
      <div className="max-w-6xl flex flex-col gap-10">
        <RichTextView doc={props.blok.description} />
        <div className="self-stretch flex justify-start items-stretch gap-4 md:gap-6 flex-col md:flex-row">
          {props.blok.teamMembers?.map((member) => (
            <TeamMember
              key={member.content._uid}
              blok={member.content}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default TeamMembers
