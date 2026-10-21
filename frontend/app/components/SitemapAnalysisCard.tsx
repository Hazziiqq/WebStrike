
import type { SitemapFinding } from '@shared/types/recon'

type SitemapAnalysisCardProps = {
  findings: SitemapFinding[]
}

const SitemapAnalysisCard = ({ findings = [] }: SitemapAnalysisCardProps) => {
  return (
    <div className='mt-4 bg-white border border-[#D9DEE5] rounded-lg overflow-hidden'>

      {/* Header */}
      <div className='flex items-center justify-between px-5 py-4 border-b border-[#D9DEE5]'>
        <span className='text-sm font-semibold text-[#111827]'>
          Sitemap Analysis
        </span>

        <span className='text-[11px] font-semibold tracking-[0.15em] text-[#667085] uppercase'>
          URL Discovery
        </span>
      </div>

      {/* Discovered URLs */}
      <div className='divide-y divide-[#D9DEE5]'>
        {findings.length > 0 ? (
          findings.map((finding, index) => (
            <div
              key={`${finding.url}-${index}`}
              className='flex items-center justify-between gap-4 px-5 py-3'
            >
              <div className='min-w-0'>
                <p className='text-sm font-mono text-[#111827] break-all'>
                  {finding.path}
                </p>

                <p className='mt-1 text-xs text-[#667085] break-all'>
                  {finding.url}
                </p>
              </div>

              <span className='shrink-0 text-[10px] font-semibold tracking-wider uppercase px-2 py-1 rounded border text-[#1D4ED8] bg-[#EFF6FF] border-[#BFDBFE]'>
                Sitemap
              </span>
            </div>
          ))
        ) : (
          <div className='px-5 py-6 text-center'>
            <p className='text-sm text-[#667085]'>
              No URLs discovered in sitemap.xml
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className='px-5 py-3 border-t border-[#D9DEE5] bg-[#F9FAFB]'>
        <p className='text-xs text-[#667085]'>
          {findings.length} URL{findings.length !== 1 ? 's' : ''} discovered
        </p>
      </div>

    </div>
  )
}

export default SitemapAnalysisCard
