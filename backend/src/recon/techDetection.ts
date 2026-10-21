import { HttpAnalysisResult, Technology,Endpoint } from '@shared/types/recon'

export const discoverTechnologies = (
  analysis: HttpAnalysisResult,  endpoints: Endpoint[]
): Technology[] => {

    const technologies: Technology[] = []

    const headers = analysis.headers
    const body = analysis.body.toLowerCase()

    const hasPhpEndpoints = endpoints.some((endpoint) => {
  return endpoint.path.toLowerCase().includes('.php')
  })
   

    const addTech = (name: string, category:string, confidence: Technology['confidence']) => {
        technologies.push({
            name,
            category,
            confidence,

        })
    }

    if(hasPhpEndpoints){
      addTech('PHP', 'Language', 'medium')
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

     if(serverLower.includes('microsoft-iis')){
      addTech('IIS', 'Server', 'high')
     }

     if(serverLower.includes('litespeed')){
      addTech('LiteSpeed', 'Server', 'high')
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

    } if (poweredByLower.includes('asp.net')) {
      addTech('asp.net', 'Framework', 'high')
    }
  }

  // WordPress detection
  if (body.includes('wp-content') || body.includes('wp-includes')) {
    addTech('WordPress', 'CMS', 'high')
  }

  // nextjs detection
  if (body.includes('__next_data__') || body.includes('_next/static')) {
    addTech('Next.js', 'Framework', 'high')
    
  }
  
 if(body.includes('data-reactroot')){
  addTech('React.js', 'Library', 'medium')
 }

  if(body.includes('data-v-app')){
  addTech('Vue.js', 'Library', 'medium')
 }
 
  if(body.includes('/_astro/')){
  addTech('Astro', 'Framework', 'medium')
 }

  return technologies
}