import { HttpAnalysisResult, Technology } from '@shared/types/recon'

export const discoverTechnologies = (
  analysis: HttpAnalysisResult
): Technology[] => {

    const technologies: Technology[] = []

    const headers = analysis.headers
    const body = analysis.body.toLowerCase()

    const addTech = (name: string, category:string, confidence: Technology['confidence']) => {
        technologies.push({
            name,
            category,
            confidence,

        })
    }

    const server = headers['server']
    if(server){
        const serverLower = server.toLowerCase()

         if (serverLower.includes('nginx')) {
      addTech('Nginx', 'Server', 'high')
    }

    if (serverLower.includes('apache')) {
      addTech('Apache', 'Server', 'high')
    }

    if (serverLower.includes('cloudflare')) {
      addTech('Cloudflare', 'CDN', 'high')
    }
    }

    const poweredBy = headers['x-powered-by']

  if (poweredBy) {
    const poweredByLower = poweredBy.toLowerCase()

    if (poweredByLower.includes('express')) {
      addTech('Express', 'Framework', 'high')
    }

    if (poweredByLower.includes('php')) {
      addTech('PHP', 'Language', 'high')
    }
  }

  // WordPress detection
  if (
    body.includes('wp-content') ||
    body.includes('wp-includes')
  ) {
    addTech('WordPress', 'CMS', 'high')
  }

  // React detection
  if (
    body.includes('__next_data__') ||
    body.includes('_next/static')
  ) {
    addTech('Next.js', 'Framework', 'high')
    addTech('React', 'Library', 'medium')
  }

  return technologies
}