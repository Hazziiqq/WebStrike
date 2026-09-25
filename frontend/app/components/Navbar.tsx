'use client'

import Link from 'next/link'
import { useState } from 'react'

const links = [
  { label: 'Platform', href: '/platform' },
  { label: 'Recon', href: '/recon' },
  { label: 'Scanner', href: '/scanner' },
  { label: 'Documentation', href: '/documentation' },
]

const Navbar = () => {
  const [open, setOpen] = useState(false)

  return (
    <nav className='w-full border-b border-[#D9DEE5] bg-[#F7F8FA]'>
      <div className='max-w-[1200px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between'>

        <Link
          href='/'
          className='flex items-center whitespace-nowrap gap-2'
        >
          <span className='text-[#1D4ED8] text-base leading-none'>◈</span>
          <span className='text-sm font-semibold tracking-widest text-[#111827]'>
            WEBSTRIKE
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className='hidden md:flex items-center justify-center text-sm text-[#667085] gap-1'>
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className='px-3 py-2 rounded-md hover:text-[#111827] hover:bg-black/[0.04] transition-colors'
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side, desktop only for now */}
        <div className='hidden md:flex items-center gap-6'>
          <a
            href='https://github.com'
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center gap-2 text-sm text-[#667085] hover:text-[#111827] transition-colors'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='w-4 h-4'
            >
              <path d='M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.1c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z' />
            </svg>
            GitHub
          </a>
        </div>

        {/* Hamburger menu */}
        <button
          onClick={() => setOpen(!open)}
          aria-label='Toggle menu'
          className='md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5'
        >
          <span className='block w-5 h-[1.5px] bg-[#111827]'></span>
          <span className='block w-5 h-[1.5px] bg-[#111827]'></span>
          <span className='block w-5 h-[1.5px] bg-[#111827]'></span>
        </button>

      </div>

      {/* Mobile menu panel*/}
      {open && (
        <div className='md:hidden border-t border-[#D9DEE5] bg-[#F7F8FA]'>
          <ul className='flex flex-col px-4 sm:px-6 py-4 gap-1 text-sm text-[#667085]'>
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className='block px-3 py-2 rounded-md hover:text-[#111827] hover:bg-black/[0.04] transition-colors'
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}

export default Navbar