import * as React from 'react'
import { richTextResolver } from '@storyblok/richtext'
import type { StoryblokRichTextNode } from '@storyblok/richtext'

export type RichTextProps = {
  doc: unknown
}

const renderRichText = richTextResolver<string>().render

function RichText(props: RichTextProps) {
  return (
    <div
      className="rich-text flex flex-col justify-start items-start gap-2"
      dangerouslySetInnerHTML={{
        __html: renderRichText(props.doc as StoryblokRichTextNode),
      }}
    />
  )
}

export default RichText
