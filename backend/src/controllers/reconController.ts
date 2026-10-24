import { Request, Response } from 'express'
import { analyzeHttp } from '../recon/httpAnalyzer'
import { discoverEndpoints } from '../recon/endPointDiscovery'
import { discoverTechnologies } from '../recon/techDetection'
import { discoverJavaScriptEndpoints } from '../recon/javascriptDiscovery'
import { analyzeSecurityHeaders } from '../recon/securityHeaderAnalysis'
import { discoverRobots } from '../recon/robotsDiscovery'
import { discoverSitemap } from '../recon/sitemapDiscovery'
import { discoverDirectory } from '../recon/directoryDiscovery'

export const startRecon = async (req: Request, res: Response) => {
  const { target } = req.body

  if (!target) {
    return res.status(400).json({ error: 'Target URL is required' })
  }

  const analysis = await analyzeHttp(target)

  const htmlEndpoints = analysis.reachable ? discoverEndpoints(analysis.body, analysis.finalUrl) : []

  const javascriptEndpoints = analysis.reachable? await discoverJavaScriptEndpoints(analysis.finalUrl) : []
  
  const securityHead  = analysis.reachable ? analyzeSecurityHeaders(analysis.headers) : []

  const infoRobots = analysis.reachable? await discoverRobots(analysis.finalUrl) : []

  const infoSitemap = analysis.reachable? await discoverSitemap(analysis.finalUrl) : []

  const directoryFindings = analysis.reachable? await discoverDirectory(analysis.finalUrl) : []

  const allEndpoints = [
  ...htmlEndpoints,
  ...javascriptEndpoints,
  ]

  const seenUrls = new Set<string>()

  const endpoints = allEndpoints.filter((endpoint) => {
  const key = `${endpoint.method}:${endpoint.url}`

  if (seenUrls.has(key)) {
    return false
  }

  seenUrls.add(key)
  return true
})

  const technologies = analysis.reachable ? discoverTechnologies(analysis,endpoints): []

  return res.json({
    ...analysis,
    endpoints,
    technologies,
    securityHead,
    infoRobots,
    infoSitemap,
    directoryFindings,

  })
}