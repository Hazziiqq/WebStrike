
'use client'

import { useState } from 'react'
import axios, { isAxiosError } from 'axios'
import { useLottie } from 'lottie-react'
import fingerprintAnimation from '../../public/Fingerprint.json'

import HttpAnalysisCard from '../components/HttpAnalysisCard'
import EndpointDiscCard from '../components/EndpointDiscCard'
import TechnologyCard from '../components/TechnologyCard'
import SecurityHeaderCard from '../components/SecurityHeaderCard'
import RobotsAnalysisCard from '../components/RobotsAnalysisCard'
import SitemapAnalysisCard from '../components/SitemapAnalysisCard'
import DirectoryAnalysisCard from '../components/DirectoryAnalysisCard'

import type { ReconResult } from '@shared/types/recon'

const tabs = [
  { id: 'http', label: 'HTTP Analysis', number: '01' },
  { id: 'technology', label: 'Technology Detection', number: '02' },
  { id: 'endpoints', label: 'Endpoint Discovery', number: '03' },
  { id: 'headers', label: 'Security Headers', number: '04' },
  { id: 'robots', label: 'Robots.txt', number: '05' },
  { id: 'sitemap', label: 'Sitemap Discovery', number: '06' },
  { id: 'directory', label: 'Directory Discovery', number: '07' },
] as const

type TabId = (typeof tabs)[number]['id']

// Fingerprint Lottie Animation

const FingerprintAnimation = () => {
  const lottie = useLottie({
    src: fingerprintAnimation,
    loop: true,
    autoplay: true,
  })

  return (
    <div className="w-full max-w-[400px]">
      <div ref={lottie.setDisplayRef} style={{ width: '100%', aspectRatio: '1 / 1' }} />
    </div>
  )
}

const Page = () => {
  const [target, setTarget] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ReconResult | null>(null)
  const [activeTab, setActiveTab] = useState<TabId>('http')

  const startRecon = async () => {
    if (!target.trim()) return

    setLoading(true)
    setMessage('')
    setResult(null)
    setActiveTab('http')

    try {
      const response = await axios.post(
        'http://localhost:5000/api/recon',
        {
          target,
        }
      )

      setResult(response.data)
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        if (error.response) {
          setMessage(
            `Error ${error.response.status}: ${
              error.response.data.error || 'Request failed'
            }`
          )
        } else {
          setMessage('Could not reach the backend.')
        }
      } else {
        setMessage('Something went wrong.')
      }
    } finally {
      setLoading(false)
    }
  }

  const renderActiveTab = () => {
    if (!result) return null

    switch (activeTab) {
      case 'http':
        return <HttpAnalysisCard result={result} />

      case 'technology':
        return (
          <TechnologyCard technologies={result.technologies} />
        )

      case 'endpoints':
        return (
          <EndpointDiscCard endpoints={result.endpoints} />
        )

      case 'headers':
        return (
          <SecurityHeaderCard securities={result.securityHead} />
        )

      case 'robots':
        return (
          <RobotsAnalysisCard paths={result.infoRobots} />
        )

      case 'sitemap':
        return (
          <SitemapAnalysisCard findings={result.infoSitemap} />
        )

      case 'directory':
        return (
          <DirectoryAnalysisCard findings={result.directoryFindings} />
        )

      default:
        return null
    }
  }

  return (
    <main className="min-h-screen bg-[#F7F8FA] py-16 md:py-20">

      <div className="max-w-[1400px] mx-auto px-6">

        {/* Assessment Header */}

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,700px)_minmax(0,1fr)] items-center gap-8 lg:gap-12 mb-12">

          {/* Left Side - Heading and Input */}

          <div className="max-w-[700px]">

            <span className="block text-xs font-semibold tracking-[0.2em] text-[#1D4ED8] mb-5">
              NEW ASSESSMENT
            </span>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[1.12] tracking-tight text-[#111827] mb-6">
              Map the target before you test it.
            </h1>

            <p className="text-base text-[#667085] leading-relaxed max-w-[560px] mb-9">
              Provide an authorized target URL. WebStrike will perform
              reconnaissance and build an attack-surface map for security
              testing.
            </p>

            {/* Target Input */}

            <label
              htmlFor="target"
              className="block text-[11px] font-semibold tracking-[0.15em] text-[#667085] uppercase mb-2.5"
            >
              Target URL
            </label>

            <div className="flex flex-col sm:flex-row gap-2.5">

              <input
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !loading) {
                    startRecon()
                  }
                }}
                id="target"
                type="url"
                placeholder="https://example.com"
                disabled={loading}
                className="flex-1 min-w-0 bg-white border border-[#D9DEE5] rounded-md px-4 py-3 text-sm text-[#111827] placeholder:text-[#98A2B3] outline-none focus:border-[#1D4ED8] focus:ring-[3px] focus:ring-[#1D4ED8]/10 transition-colors disabled:opacity-60"
              />

              <button
                onClick={startRecon}
                disabled={loading || !target.trim()}
                className="bg-[#1D4ED8] text-white text-sm font-medium rounded-md px-6 py-3 hover:bg-[#1E40AF] transition-colors whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Starting...' : 'Start Recon'}
              </button>

            </div>

            {message && (
              <p className="text-[13px] text-[#DC2626] mt-3.5">
                {message}
              </p>
            )}

            <p className="text-[13px] text-[#667085] mt-3.5">
              Only submit targets you are authorized to assess.
            </p>

          </div>

          {/* Right Side - Fingerprint Animation */}

          <div className="hidden lg:flex items-center justify-center w-full">

            <FingerprintAnimation />

          </div>

        </div>

        {/* Loading State */}

        {loading && (
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-8 text-center">

            <div className="mx-auto w-6 h-6 border-2 border-[#D9DEE5] border-t-[#1D4ED8] rounded-full animate-spin mb-4" />

            <p className="text-sm font-medium text-[#344054]">
              Performing reconnaissance...
            </p>

            <p className="text-xs text-[#667085] mt-1">
              Analyzing the target and collecting available information.
            </p>

          </div>
        )}

        {/* Reconnaissance Dashboard */}

        {result && (
          <section className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">

            {/* Dashboard Header */}

            <div className="px-5 md:px-7 py-5 border-b border-[#E5E7EB] flex flex-col sm:flex-row sm:items-center justify-between gap-3">

              <div>

                <h2 className="text-lg font-semibold text-[#111827]">
                  Reconnaissance Results
                </h2>

                <p className="text-xs text-[#667085] mt-1 break-all">
                  {result.finalUrl}
                </p>

              </div>

              <span className="inline-flex items-center gap-2 text-xs font-medium text-green-700 bg-green-50 px-3 py-1.5 rounded-md w-fit">

                <span className="w-1.5 h-1.5 rounded-full bg-green-600" />

                Assessment completed

              </span>

            </div>

            {/* Sidebar + Content */}

            <div className="grid grid-cols-1 md:grid-cols-[240px_minmax(0,1fr)] min-h-[500px]">

              {/* Left Sidebar */}

              <aside className="border-b md:border-b-0 md:border-r border-[#E5E7EB] bg-[#FAFBFC] p-4">

                <p className="text-[10px] font-semibold tracking-[0.16em] text-[#98A2B3] uppercase px-3 mb-3">
                  Recon Modules
                </p>

                <nav className="flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-visible">

                  {tabs.map((tab) => {

                    const isActive = activeTab === tab.id

                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-3 text-left w-full min-w-max md:min-w-0 px-3 py-3 rounded-md transition-colors ${
                          isActive
                            ? 'bg-[#EAF1FF] text-[#1D4ED8]'
                            : 'text-[#667085] hover:bg-[#F0F2F5] hover:text-[#111827]'
                        }`}
                      >

                        <span
                          className={`text-[10px] font-semibold ${
                            isActive
                              ? 'text-[#1D4ED8]'
                              : 'text-[#98A2B3]'
                          }`}
                        >
                          {tab.number}
                        </span>

                        <span
                          className={`text-[13px] ${
                            isActive
                              ? 'font-semibold'
                              : 'font-medium'
                          }`}
                        >
                          {tab.label}
                        </span>

                      </button>
                    )

                  })}

                </nav>

              </aside>

              {/* Right Content */}

              <div className="min-w-0 p-4 md:p-7">

                <div className="mb-5">

                  <p className="text-[10px] font-semibold tracking-[0.16em] text-[#98A2B3] uppercase mb-2">
                    Assessment Module
                  </p>

                  <h3 className="text-xl font-semibold text-[#111827]">
                    {tabs.find((tab) => tab.id === activeTab)?.label}
                  </h3>

                </div>

                {renderActiveTab()}

              </div>

            </div>

          </section>
        )}

      </div>

    </main>
  )
}

export default Page
