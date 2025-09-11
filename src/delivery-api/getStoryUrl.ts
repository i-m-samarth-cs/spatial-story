import { type BridgeSearchParams } from '../BridgeSearchParams'

/**
 * Given the path and query of the current page, return the path to fetch the story from the delivery API.
 * @example
 * ```ts
 * const url = getStoryUrl(
 *   ['about', 'team'],
 *   {
 *     version: 'published',
 *   },
 * )
 * console.log(url) // 'pages/about/team'
 * ```
 * @example
 * ```ts
 * const url = getStoryUrl(
 *  ['about', 'team'],
 *  {
 *   version: 'draft',
 *   _storyblok: '12345',
 *  },
 * )
 * console.log(url) // '12345'
 * ```
 * @param slugs an array of the path segments of the current page
 * @param bridgeSearchParams an object containing the parsed search parameters from the Storyblok bridge
 */
export const getStoryPath = (
  slugs: string[],
  bridgeSearchParams: BridgeSearchParams,
): string => {
  // When the page is opened in the editor, or after clicking the "Open Draft/Published" button, use the id of the story.
  // Otherwise, use the path in the URL, prepended with `pages` (where all pages are stored).
  const id =
    bridgeSearchParams.version === 'draft'
      ? bridgeSearchParams._storyblok
      : bridgeSearchParams._storyblok_published

  // All stories that can be viewed as pages are stored in the "pages" folder.
  const path = ['pages', ...slugs].join('/')

  // If the id is specified in the query (for example when embedded in the editor), it takes precedence over the slugs.
  return id ?? path
}
