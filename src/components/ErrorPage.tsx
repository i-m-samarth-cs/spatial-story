import * as React from 'react'
import NextImage from 'next/image'
import Link from 'next/link'
import AppBarView from './AppBar'
import FooterView from './Footer'

export type ErrorPageProps = {
  className?: string
}

function ErrorPage(props: ErrorPageProps) {
  return (
    <div
      className={`flex flex-col items-stretch min-h-screen ${
        props.className ?? ''
      }`}
    >
      <AppBarView />
      <div className="flex-1 self-stretch px-20 pt-24 flex flex-col justify-between items-center gap-12">
        <div className="flex flex-col justify-start items-center gap-6">
          <div className="flex flex-col justify-start items-center gap-2">
            <h1 className="justify-start text-stone-900 text-8xl font-extrabold">
              Uh-oh!
            </h1>
            <h2 className="justify-start text-stone-900 text-2xl font-bold leading-10">
              500 error
            </h2>
            <p className="text-center justify-start text-stone-900 text-lg font-normal leading-7">
              Something went wrong at our end. We are trying to fix the problem.
            </p>
            <p className="text-center justify-start text-stone-900 text-lg font-normal leading-7">
              Please try again at a later stage.
            </p>
          </div>
          <Link
            href="/"
            className="px-6 py-3 rounded-[10px] flex flex-col justify-start items-center gap-3 overflow-hidden justify-center text-white text-lg font-semibold leading-relaxed bg-stone-900 hover:bg-stone-800"
          >
            Back to Home
          </Link>
        </div>
        <NextImage
          src="/404.png"
          alt="A confused dog with glasses and a knitted sweater."
          className="object-cover translate-x-[-60px]"
          width={504}
          height={288}
        />
      </div>
      <FooterView />
    </div>
  )
}

export default ErrorPage
