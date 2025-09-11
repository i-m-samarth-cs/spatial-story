import * as React from 'react'
import { storyblokEditable } from '@storyblok/react/rsc'
import Link from 'next/link'
import type { ButtonContent } from '../content'
import type {
  AssetLinkContent,
  EmailLinkContent,
  StoryLinkContent,
  UrlLinkContent,
} from '../delivery-api'

export type ButtonProps = {
  blok: ButtonContent
}

const classFromContent = (content: ButtonContent): string =>
  `self-center px-6 py-3 rounded-lg inline-flex flex-col items-end gap-3 overflow-hidden text-right justify-center text-sm font-semibold leading-tight transition-border duration-300 ease-in-out ${colorStyles(
    content,
  )}`

const colorStyles = (content: ButtonContent): string => {
  switch (content.color) {
    case 'primary':
      return 'bg-stone-900 hover:bg-stone-800 text-white hover:border-stone-800'
    case 'secondary':
      return 'bg-white color-stone-900 hover:bg-stone-100 hover:border-stone-900'
  }
}

/**
 * Converts a story link slug to a URL path for this application.
 * `/pages/mypage` -> `/mypage`
 * @param slugs
 */
const hrefFromStoryLink = (slugs: string): string =>
  '/' + slugs.split('/').slice(1).join('/')

function Button(props: ButtonProps) {
  return (
    <>
      {props.blok.link?.linktype === 'url' ? (
        <Link
          rel="noopener noreferrer"
          {...storyblokEditable(props.blok)}
          href={(props.blok.link as UrlLinkContent)?.cached_url}
          target={props.blok.link?.target}
          className={classFromContent(props.blok)}
        >
          {props.blok.text}
        </Link>
      ) : null}
      {props.blok.link?.linktype === 'story' ? (
        <Link
          rel="noopener noreferrer"
          {...storyblokEditable(props.blok)}
          href={hrefFromStoryLink(
            (props.blok.link as StoryLinkContent)?.cached_url,
          )}
          target={props.blok.link?.target}
          className={classFromContent(props.blok)}
        >
          {props.blok.text}
        </Link>
      ) : null}
      {props.blok.link?.linktype === 'email' ? (
        <Link
          {...storyblokEditable(props.blok)}
          href={`mailto:${(props.blok.link as EmailLinkContent)?.email}`}
          className={classFromContent(props.blok)}
        >
          {props.blok.text}
        </Link>
      ) : null}
      {props.blok.link?.linktype === 'asset' ? (
        <Link
          rel="noopener noreferrer"
          {...storyblokEditable(props.blok)}
          href={(props.blok.link as AssetLinkContent)?.cached_url}
          className={classFromContent(props.blok)}
        >
          {props.blok.text}
        </Link>
      ) : null}
    </>
  )
}

export default Button
