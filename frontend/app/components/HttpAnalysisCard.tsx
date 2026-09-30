import type { ReconResult } from '@shared/types/recon'

type HttpAnalysisCardProps = {
  result: ReconResult
}

const HttpAnalysisCard = ({ result }: HttpAnalysisCardProps) => {
  return (
    <div className='mt-8 bg-white border border-[#D9DEE5] rounded-lg overflow-hidden'>

      <div className='flex items-center justify-between px-5 py-4 border-b border-[#D9DEE5]'>
        <div className='flex items-center gap-2.5'>
          <span
            className={`w-2 h-2 rounded-full ${
              result.reachable ? 'bg-[#16A34A]' : 'bg-[#DC2626]'
            }`}
          />

          <span className='text-sm font-semibold text-[#111827]'>
            {result.reachable
              ? `${result.status} ${result.statusText}`
              : 'Unreachable'}
          </span>
        </div>

        <span className='text-[11px] font-semibold tracking-[0.15em] text-[#667085] uppercase'>
          HTTP Analysis
        </span>
      </div>

      <div className='px-5 py-4'>
        {result.reachable ? (
          <dl className='flex flex-col gap-3 text-sm'>

            <div className='flex justify-between gap-6'>
              <dt className='text-[#667085]'>Server</dt>
              <dd className='text-[#111827] font-mono text-[13px] truncate'>
                {result.server || '—'}
              </dd>
            </div>

            <div className='flex justify-between gap-6'>
              <dt className='text-[#667085]'>Content-Type</dt>
              <dd className='text-[#111827] font-mono text-[13px] truncate'>
                {result.contentType || '—'}
              </dd>
            </div>

             <div className='flex flex-col gap-2'>
               <dt className='text-[#667085]'>Headers</dt>

              <dd className='bg-[#F7F8FA] border border-[#E5E7EB] rounded-md p-3 font-mono text-[12px]'>
              {Object.entries(result.headers).map(([key, value]) => (
              <div key={key} className='flex gap-4'>
              <span className='text-[#667085]'>{key}:</span>
              <span className='text-[#111827] break-all'>  {value}</span>
            </div>
            ))}
           </dd>
          </div>

            <div className='flex justify-between gap-6'>
              <dt className='text-[#667085]'>Response Time</dt>
              <dd className='text-[#111827] font-mono text-[13px]'>
                {result.responseTimeMs}ms
              </dd>
            </div>

            <div className='flex justify-between gap-6'>
              <dt className='text-[#667085]'>Final URL</dt>
              <dd className='text-[#111827] font-mono text-[13px] truncate'>
                {result.finalUrl}
              </dd>
            </div>

          </dl>
        ) : (
          <p className='text-sm text-[#667085]'>
            {result.error || 'The target could not be reached.'}
          </p>
        )}
      </div>

    </div>
  )
}

export default HttpAnalysisCard