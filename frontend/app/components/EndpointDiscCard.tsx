import type { Endpoint } from '@shared/types/recon'

type EndpointDiscCardProps = {
  endpoints: Endpoint[]
}

const EndpointDiscCard = ({ endpoints }: EndpointDiscCardProps) => {
  if (endpoints.length === 0) {
    return null
  }

  return (
    <div className='mt-4 bg-white border border-[#D9DEE5] rounded-lg overflow-hidden'>

      <div className='flex items-center justify-between px-5 py-4 border-b border-[#D9DEE5]'>
        <span className='text-sm font-semibold text-[#111827]'>
          {endpoints.length} Endpoint
          {endpoints.length !== 1 ? 's' : ''}
        </span>

        <span className='text-[11px] font-semibold tracking-[0.15em] text-[#667085] uppercase'>
          Endpoint Discovery
        </span>
      </div>

      <ul className='divide-y divide-[#D9DEE5] max-h-[320px] overflow-y-auto'>
        {endpoints.map((ep) => (
          <li
            key={ep.url}
            className='flex items-center gap-3 px-5 py-3'
          >
            <span className='text-[10px] font-semibold tracking-wider text-[#667085] bg-[#F7F8FA] border border-[#D9DEE5] rounded px-1.5 py-0.5 flex-shrink-0'>
              {ep.method}
            </span>

            <span className='text-sm font-mono text-[#111827] truncate'>
              {new URL(ep.url).pathname + new URL(ep.url).search}
            </span>
          </li>
        ))}
      </ul>

    </div>
  )
}

export default EndpointDiscCard