import { object, parseString } from 'pure-parse'

/**
 * The search params that Storyblok includes when viewing inside the iframe in the Visual Editor.
 * The search params after opening the "Open Draft" button in the Visual Editor.
 * Also defined in `@storyblok/preview-bridge`
 */
export type PreviewSearchParams = {
  /**
   * The ID for the story.
   * Stringified number
   */
  _storyblok: string
  /**
   * The component name of the root block
   */
  _storyblok_c: string
  /**
   * The language code of the story being viewed
   */
  _storyblok_lang: string
  /**
   * Stringified number. The ID of the release, or `"undefined"` if it is not a preview for a release.
   */
  _storyblok_release: string
  /**
   * Stringified number. The timestamp, in milliseconds, of when the iframe element was created.
   */
  _storyblok_rl: string
  /**
   * Stringified number. The space ID of the story.
   */
  '_storyblok_tk[space_id]': string
  /**
   * Stringified number
   */
  '_storyblok_tk[timestamp]': string
  /**
   * Delivery API token with preview scope
   */
  '_storyblok_tk[token]': string
  _storyblok_version: string
}

/**
 * The search params after opening the "Open Published" button in the Visual Editor.
 */
type PublishedSearchParams = {
  _storyblok_published: string
}

/**
 * Description of the search params that Storyblok includes when
 * - Viewing inside the iframe in the Visual Editor
 * - Opening the "Open Draft" or "Open Published" buttons
 */
export type BridgeSearchParams =
  | ({
      version: 'draft'
    } & PreviewSearchParams)
  | {
      version: 'published'
      // Used to override the path from the URL.
      // For example, for `/pages/about?_storyblok_published=12345`,
      // one should fetch based on the id `12345` and not the path `/pages/about`.
      _storyblok_published?: string
    }

const parsePublishedSearchParams = object<PublishedSearchParams>({
  _storyblok_published: parseString,
})

const parsePreviewSearchParams = object<PreviewSearchParams>({
  _storyblok: parseString,
  _storyblok_c: parseString,
  _storyblok_lang: parseString,
  _storyblok_release: parseString,
  _storyblok_rl: parseString,
  '_storyblok_tk[space_id]': parseString,
  '_storyblok_tk[timestamp]': parseString,
  '_storyblok_tk[token]': parseString,
  _storyblok_version: parseString,
})

export const parseBridgeSearchParams = (
  searchParams: unknown,
): BridgeSearchParams => {
  const draftResult = parsePreviewSearchParams(searchParams)
  if (!draftResult.error) {
    return {
      version: 'draft',
      ...draftResult.value,
    }
  }

  const publishedResult = parsePublishedSearchParams(searchParams)
  if (!publishedResult.error) {
    return {
      version: 'published',
      ...publishedResult.value,
    }
  }
  return {
    version: 'published',
  }
}
