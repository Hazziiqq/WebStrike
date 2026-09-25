'use client'

import { useState } from 'react'
import axios from 'axios'

const Page = () => {
  const [target, setTarget] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const startRecon = async () => {
    if (!target) return

    setLoading(true)
    setMessage('')

    try {
      const response = await axios.post('http://localhost:5000/api/recon', {
        target,
      })
      setMessage(`Received: ${response.data.received}`)
    } catch (error: any) {
      if (error.response) {
        setMessage(`Error ${error.response.status}: ${error.response.data.error || 'Request failed'}`)
      } else {
        setMessage('Could not reach the backend.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='py-16 md:py-24'>
      <div className='max-w-[640px] mx-auto px-6'>

        <span className='block text-xs font-semibold tracking-[0.2em] text-[#1D4ED8] mb-5'>
          — NEW ASSESSMENT
        </span>

        <h1 className='text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[1.12] tracking-tight text-[#111827] mb-6 max-w-[18ch]'>
          Map the target before you test it.
        </h1>

        <p className='text-base text-[#667085] leading-relaxed max-w-[44ch] mb-12'>
          Provide an authorized target URL. WebStrike will perform reconnaissance and build an attack-surface map for security testing.
        </p>

        <div className='max-w-[640px]'>

          <label
            htmlFor='target'
            className='block text-[11px] font-semibold tracking-[0.15em] text-[#667085] uppercase mb-2.5'
          >
            Target URL
          </label>

          <div className='flex gap-2.5'>
            <input
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              id='target'
              type='url'
              placeholder='https://example.com'
              disabled={loading}
              className='flex-1 bg-white border border-[#D9DEE5] rounded-md px-4 py-3 text-sm text-[#111827] placeholder:text-[#98A2B3] outline-none focus:border-[#1D4ED8] focus:ring-[3px] focus:ring-[#1D4ED8]/12 transition-colors disabled:opacity-60'
            />
            <button
              onClick={startRecon}
              disabled={loading}
              className='bg-[#1D4ED8] text-white text-sm font-medium rounded-md px-5 py-3 hover:bg-[#1E40AF] transition-colors whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed'
            >
              {loading ? 'Starting…' : 'Start Recon'}
            </button>
          </div>

          {message && (
            <p className='text-[13px] text-[#667085] mt-3.5'>
              {message}
            </p>
          )}

          <p className='text-[13px] text-[#667085] mt-3.5'>
            Only submit targets you are authorized to assess.
          </p>

        </div>

      </div>
    </div>
  )
}

export default Page