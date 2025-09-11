import {
  equals,
  lazy,
  object,
  oneOf,
  optional,
  type Parser,
  parseString,
} from 'pure-parse'
import type {
  AssetLinkContent,
  EmailLinkContent,
  LinkContent,
  StoryLinkContent,
  UrlLinkContent,
} from '../delivery-api'

export const parseLinkContent: Parser<LinkContent> = lazy(() =>
  oneOf(
    parseUrlLinkContent,
    parseStoryLinkContent,
    parseEmailLinkContent,
    parseAssetLinkContent,
  ),
)

const parseTarget = optional(oneOf(equals('_blank'), equals('_self')))

const parseUrlLinkContent = object<UrlLinkContent>({
  fieldtype: equals('multilink'),
  linktype: equals('url'),
  cached_url: parseString,
  target: parseTarget,
})

const parseStoryLinkContent = object<StoryLinkContent>({
  fieldtype: equals('multilink'),
  linktype: equals('story'),
  id: parseString,
  cached_url: parseString,
  target: parseTarget,
})

const parseEmailLinkContent = object<EmailLinkContent>({
  fieldtype: equals('multilink'),
  linktype: equals('email'),
  target: parseTarget,
  email: parseString,
})

const parseAssetLinkContent = object<AssetLinkContent>({
  fieldtype: equals('multilink'),
  linktype: equals('asset'),
  cached_url: parseString,
  target: parseTarget,
})
