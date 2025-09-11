import * as React from 'react'

export type HamburgerIconProps = {
  className?: string
}

function HamburgerIcon(props: HamburgerIconProps) {
  return (
    <svg
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      className={props.className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  )
}

export default HamburgerIcon
