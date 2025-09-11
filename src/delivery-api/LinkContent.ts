export type UrlLinkContent = {
  fieldtype: 'multilink'
  target?: '_blank' | '_self'
  linktype: 'url'
  cached_url: string
}

export type EmailLinkContent = {
  fieldtype: 'multilink'
  target?: '_blank' | '_self'
  linktype: 'email'
  email: string
}

export type AssetLinkContent = {
  fieldtype: 'multilink'
  target?: '_blank' | '_self'
  linktype: 'asset'
  cached_url: string
}

export type StoryLinkContent = {
  fieldtype: 'multilink'
  target?: '_blank' | '_self'
  linktype: 'story'
  cached_url: string
  // Actually a `_uid`
  id: string
}

export type LinkContent =
  | UrlLinkContent
  | EmailLinkContent
  | AssetLinkContent
  | StoryLinkContent
