import type { Technology } from '@shared/types/recon'

type TechnologyCardProps = {
  technologies: Technology[]
}

const TechnologyCard = ({ technologies }: TechnologyCardProps) => {
  return (
    <div className='mt-8 bg-white border border-[#D9DEE5] rounded-lg overflow-hidden'>

      <div className='px-5 py-4 border-b border-[#D9DEE5]'>
        <span className='text-sm font-semibold text-[#111827]'>
          Technology Detection
        </span>
      </div>

      <div className='px-5 py-4'>

        {technologies.length > 0 ? (
          <div className='flex flex-col gap-3'>

            {technologies.map((technology) => (
              <div
                key={`${technology.name}-${technology.category}`}
                className='flex items-center justify-between'
              >

                <div>
                  <p className='text-sm font-medium text-[#111827]'>
                    {technology.name}
                  </p>

                  <p className='text-xs text-[#667085]'>
                    {technology.category}
                  </p>
                </div>

                <span className='text-xs text-[#667085]'>
                  {technology.confidence}
                </span>

              </div>
            ))}

          </div>
        ) : (
          <p className='text-sm text-[#667085]'>
            No technologies detected.
          </p>
        )}

      </div>

    </div>
  )
}

export default TechnologyCard