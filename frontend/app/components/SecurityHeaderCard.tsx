import { SecurityHeaders } from '@shared/types/recon'

type SecurityHeaderCardProps = {
  securities: SecurityHeaders[]
}

const SecurityHeaderCard = ({
  securities,
}: SecurityHeaderCardProps) => {
  return (
    <div className='mt-4 bg-white border border-[#D9DEE5] rounded-lg overflow-hidden'>

      {/* Header */}
      <div className='flex items-center justify-between px-5 py-4 border-b border-[#D9DEE5]'>
        <span className='text-sm font-semibold text-[#111827]'>
          Security Headers
        </span>

        <span className='text-[11px] font-semibold tracking-[0.15em] text-[#667085] uppercase'>
          Header Analysis
        </span>
      </div>

      {/* Header List */}
      <div className='divide-y divide-[#D9DEE5]'>
        {securities.map((security) => (
          <div
            key={security.name}
            className='flex items-center justify-between gap-4 px-5 py-3'
          >
            {/* Header Information */}
            <div className='min-w-0'>
              <p className='text-sm font-mono text-[#111827]'>
                {security.name}
              </p>

              <p className='mt-1 text-xs text-[#667085] break-all'>
                {security.value || 'Not set'}
              </p>
            </div>

            {/* Status */}
            <span
              className={`shrink-0 text-[10px] font-semibold tracking-wider uppercase px-2 py-1 rounded border ${
                security.present
                  ? 'text-[#166534] bg-[#F0FDF4] border-[#BBF7D0]'
                  : 'text-[#991B1B] bg-[#FEF2F2] border-[#FECACA]'
              }`}
            >
              {security.present ? 'Present' : 'Missing'}
            </span>
          </div>
        ))}
      </div>

    </div>
  )
}

export default SecurityHeaderCard
