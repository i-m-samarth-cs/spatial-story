import * as React from 'react'

export type YouTubeIconProps = {
  className?: string
}

function YouTubeIcon(props: YouTubeIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="18"
      viewBox="0 0 28 18"
      fill="none"
      className={props.className}
    >
      <g clipPath="url(#clip0_13371_32510)">
        <path
          d="M22.1424 0H6.35756C3.26059 0 0.75 2.36549 0.75 5.2832V12.7168C0.75 15.6345 3.26059 18 6.35756 18H22.1424C25.2394 18 27.75 15.6345 27.75 12.7168V5.2832C27.75 2.36549 25.2394 0 22.1424 0ZM18.5833 9.35645L11.2936 12.6782C11.0994 12.7667 10.875 12.6314 10.875 12.4258V5.57422C10.875 5.36569 11.1053 5.23044 11.2999 5.32471L18.5896 8.85449C18.8064 8.95941 18.8026 9.25655 18.5833 9.35645Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_13371_32510">
          <rect
            width="27"
            height="18"
            fill="white"
            transform="translate(0.75)"
          />
        </clipPath>
      </defs>
    </svg>
  )
}

export default YouTubeIcon
