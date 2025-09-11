import type {
  AssetContent,
  BlockContent,
  LinkContent,
  RichTextContent,
  Story,
} from '../delivery-api'

export type Content =
  | UnknownContent
  | PageContent
  | TestimonialContent
  | TestimonialsContent
  | CardsContent
  | CardContent
  | HeroContent
  | TabsContent
  | TabContent
  | TeamMembersContent
  | TeamMemberContent
  | ButtonContent

/**
 * When the parsing of a component fails, fall back fack to this component.
 * Parsing could fail for several reasons; for example,
 * 1. You changed the schema of a component without updating the content.
 * 2. You have modeled the content incorrectly in your type alias and parser
 */
export type UnknownContent = BlockContent<{
  component: 'unknown'
}>

export type PageContent = BlockContent<{
  component: 'page'
  body: Content[]
}>

export type BackgroundColor =
  | 'beige'
  | 'white'
  | 'grey'
  | 'purple'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'pink'
  | 'blue'

export type TestimonialContent = BlockContent<{
  component: 'testimonial'
  quote: string
  image?: AssetContent
  name: string
  title: string
  imageBackgroundColor: BackgroundColor
}>

export type TestimonialsContent = BlockContent<{
  component: 'testimonials'
  title: string
  description: string
  testimonials: Content[]
}>

export type CardsContent = BlockContent<{
  component: 'cards'
  description: RichTextContent
  cards: CardContent[]
}>

export type CardContent = BlockContent<{
  component: 'card'
  description: RichTextContent
  icon?: AssetContent
}>

export type HeroContent = BlockContent<{
  component: 'hero'
  image?: AssetContent
  imagePadding: boolean
  textAlignment: 'left' | 'right' | 'center'
  description: RichTextContent
  backgroundColor: BackgroundColor
  buttons: ButtonContent[]
}>

export type TabsContent = BlockContent<{
  component: 'tabs'
  description: RichTextContent
  tabs: TabContent[]
}>

export type TabContent = BlockContent<{
  component: 'tab'
  title: string
  content: Content[]
}>

export type TeamMemberContent = BlockContent<{
  component: 'teamMember'
  name: string
  title: string
  image?: AssetContent
  backgroundColor: BackgroundColor
}>

export type TeamMembersContent = BlockContent<{
  component: 'teamMembers'
  description: RichTextContent
  teamMembers: (Story & {
    content: TeamMemberContent
  })[]
}>

export type ButtonContent = BlockContent<{
  component: 'button'
  text: string
  link?: LinkContent
  color: 'primary' | 'secondary'
}>
