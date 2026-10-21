
import type { RobotsFinding } from '@shared/types/recon'

type RobotsAnalysisCardProps = {
  paths: RobotsFinding[]
}

const RobotsAnalysisCard = ({ paths }: RobotsAnalysisCardProps) => {
  return (
    <div className='mt-4 bg-white border border-[#D9DEE5] rounded-lg overflow-hidden'>

      {/* Header */}
      <div className='flex items-center justify-between px-5 py-4 border-b border-[#D9DEE5]'>
        <span className='text-sm font-semibold text-[#111827]'>
          Robots.txt Analysis
        </span>

        <span className='text-[11px] font-semibold tracking-[0.15em] text-[#667085] uppercase'>
          Path Discovery
        </span>
      </div>

      {/* Discovered Paths */}
      <div className='divide-y divide-[#D9DEE5]'>
        {paths.length > 0 ? (
          paths.map((finding, index) => (
            <div
              key={`${finding.directive}-${finding.path}-${index}`}
              className='flex items-center justify-between gap-4 px-5 py-3'
            >
              {/* Path Information */}
              <div className='min-w-0'>
                <p className='text-sm font-mono text-[#111827] break-all'>
                  {finding.path}
                </p>

                <p className='mt-1 text-xs text-[#667085]'>
                  Source: robots.txt
                </p>
              </div>

              {/* Directive Label */}
              <span
                className={`shrink-0 text-[10px] font-semibold tracking-wider uppercase px-2 py-1 rounded border ${
                  finding.directive === 'disallow'
                    ? 'text-[#B42318] bg-[#FEF3F2] border-[#FECDCA]'
                    : 'text-[#027A48] bg-[#ECFDF3] border-[#ABEFC6]'
                }`}
              >
                {finding.directive}
              </span>
            </div>
          ))
        ) : (
          <div className='px-5 py-6 text-center'>
            <p className='text-sm text-[#667085]'>
              No paths discovered in robots.txt
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className='px-5 py-3 border-t border-[#D9DEE5] bg-[#F9FAFB]'>
        <p className='text-xs text-[#667085]'>
          {paths.length} rule{paths.length !== 1 ? 's' : ''} discovered
        </p>
      </div>

    </div>
  )
}

export default RobotsAnalysisCard
