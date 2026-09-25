import React from 'react'

const capabilities = [
  { label: 'RECON', text: "Map the target's attack surface." },
  { label: 'ENDPOINTS', text: 'Discover accessible application routes.' },
  { label: 'PARAMETERS', text: 'Identify inputs available for security testing.' },
  { label: 'FINDINGS', text: 'Track and investigate discovered issues.' },
]

const Hero = () => {
  return (
    <section className='bg-[#F7F8FA]'>

      {/* Hero content */}
      <div className='py-16 md:py-24'>
        <div className='max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-16 items-center'>

          {/* Left column */}
          <div className='flex flex-col items-start'>

            <span className='text-xs font-semibold tracking-[0.2em] text-[#1D4ED8] mb-5'>
              — OFFENSIVE WEB SECURITY
            </span>

            <h1 className='text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[1.12] tracking-tight text-[#111827] mb-6 max-w-[18ch]'>
              Find the attack surface before you attack it.
            </h1>

            <p className='text-base text-[#667085] leading-relaxed max-w-[44ch] mb-8'>
              WebStrike is an offensive security platform for reconnaissance and authorized web application security testing.
            </p>

            <div className='flex flex-wrap items-center gap-3'>
              <button className='px-5 py-3 rounded-md bg-[#1D4ED8] text-white text-sm font-medium hover:bg-[#1E40AF] transition-colors'>
                Start Assessment →
              </button>
              <button className='px-5 py-3 rounded-md border border-[#D9DEE5] text-[#111827] text-sm font-medium hover:bg-black/[0.03] transition-colors'>
                View Documentation
              </button>
            </div>

          </div>

          {/* Right column — preview card */}
          <div className='w-full max-w-[520px] mx-auto bg-white border border-[#D9DEE5] rounded-xl overflow-hidden shadow-sm'>

            <div className='flex items-center justify-between px-5 py-3 border-b border-[#D9DEE5]'>
              <div className='flex gap-1.5'>
                <span className='w-2.5 h-2.5 rounded-full bg-[#D9DEE5]'></span>
                <span className='w-2.5 h-2.5 rounded-full bg-[#D9DEE5]'></span>
                <span className='w-2.5 h-2.5 rounded-full bg-[#D9DEE5]'></span>
              </div>
              <span className='text-[10px] font-semibold tracking-[0.18em] text-[#667085]'>WEBSTRIKE</span>
            </div>

            <div className='px-5 py-5'>

              <p className='text-[10px] font-semibold tracking-[0.15em] text-[#667085] mb-2'>TARGET</p>

              <div className='flex items-center justify-between px-3 py-2.5 rounded-md bg-[#F7F8FA] border border-[#D9DEE5] mb-6'>
                <span className='font-mono text-sm text-[#111827]'>https://example.com</span>
                <span className='flex items-center gap-1.5 text-xs font-medium text-[#16A34A]'>
                  <span className='w-1.5 h-1.5 rounded-full bg-[#16A34A]'></span>
                  Ready
                </span>
              </div>

              <p className='text-[10px] font-semibold tracking-[0.15em] text-[#667085] mb-3'>RECONNAISSANCE</p>

              <ul className='flex flex-col gap-3 mb-6'>
                {[
                  { label: 'Target reachable', done: true },
                  { label: 'HTTP analysis', done: true },
                  { label: 'Endpoint discovery', done: true },
                  { label: 'Technology detection', done: true },
                  { label: 'Parameter mapping', done: false },
                ].map((item) => (
                  <li key={item.label} className='flex items-center gap-3 text-sm'>
                    <span className='w-3 flex items-center justify-center flex-shrink-0'>
                      {item.done ? (
                        <span className='text-[#16A34A] text-xs leading-none'>✓</span>
                      ) : (
                        <span className='w-2.5 h-2.5 rounded-full border border-[#D9DEE5]'></span>
                      )}
                    </span>
                    <span className={item.done ? 'text-[#111827]' : 'text-[#667085]'}>
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>

              <div className='w-full px-4 py-3 rounded-md bg-[#1D4ED8] text-white text-sm font-medium text-center'>
               Reconnaissance Engine
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Capability strip */}
<div className='border-t border-b border-[#D9DEE5]'>
  <div className='max-w-[1200px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4'>
    {capabilities.map((item, i) => (
      <div
        key={item.label}
        className='relative py-14 md:py-16 px-6 md:px-8'
      >
        {/* Inset vertical divider — only between columns, only on desktop */}
        {i > 0 && (
          <span className='hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-[65%] bg-[#D9DEE5]' />
        )}

        <p className='text-[10px] font-bold tracking-[0.18em] text-[#111827] mb-3'>
          {item.label}
        </p>
        <p className='text-sm text-[#667085] leading-relaxed'>
          {item.text}
        </p>
      </div>
    ))}
  </div>
</div>

    </section>
  )
}

export default Hero