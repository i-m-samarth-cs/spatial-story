import * as React from 'react'

export type LinkedInIconProps = {
  className?: string
}

function LinkedInIcon(props: LinkedInIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="18"
      viewBox="0 0 22 18"
      fill="none"
      className={props.className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.64285 17.3748H0.259033V5.65137H4.64285V17.3748Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.45105 4.05078H2.42249C0.951416 4.05078 0 3.15063 0 2.02563C0 0.875244 0.98053 0 2.48016 0C3.9798 0 4.90265 0.875244 4.93121 2.02563C4.93121 3.15063 3.9798 4.05078 2.45105 4.05078Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.4499 17.3755H16.0667V11.1038C16.0667 9.52759 15.4319 8.45264 13.8458 8.45264C12.6348 8.45264 11.9135 9.17773 11.5966 9.87769C11.4807 10.1282 11.4524 10.4783 11.4524 10.8286V17.3755H7.06885C7.06885 17.3755 7.12625 6.75195 7.06885 5.6521H11.4524V7.31201C12.0349 6.51318 13.0773 5.37695 15.4031 5.37695C18.2873 5.37695 20.4499 7.05249 20.4499 10.6533V17.3755Z"
        fill="white"
      />
    </svg>
  )
}

export default LinkedInIcon
