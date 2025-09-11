import * as React from 'react'
import NextImage from 'next/image'
import Link from 'next/link'
import AppBarView from './AppBar'
import FooterView from './Footer'

export type NotFoundPageProps = {
  className?: string
}

function NotFoundPage(props: NotFoundPageProps) {
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
              404 error
            </h2>
            <p className="text-center justify-start text-stone-900 text-lg font-normal leading-7">
              We couldn’t find the page you’re looking for.
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
          alt="A confused dog with a glasses and a knitted sweater."
          className="object-cover translate-x-[-60px] max-w-none"
          width={504}
          height={288}
        />
      </div>
      <FooterView />
    </div>
  )
}

export default NotFoundPage
