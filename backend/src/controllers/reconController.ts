import { Request, Response } from 'express'
import { analyzeHttp } from '../recon/httpAnalyzer'
import { discoverEndpoints } from '../recon/endPointDiscovery'
import { discoverTechnologies } from '../recon/techDetection'
import { discoverJavaScriptEndpoints } from '../recon/javascriptDiscovery'
import { analyzeSecurityHeaders } from '../recon/securityHeaderAnalysis'

export const startRecon = async (req: Request, res: Response) => {
  const { target } = req.body

  if (!target) {
    return res.status(400).json({ error: 'Target URL is required' })
  }

  const analysis = await analyzeHttp(target)

  const htmlEndpoints = analysis.reachable
    ? discoverEndpoints(analysis.body, analysis.finalUrl)
    : []

  const javascriptEndpoints = analysis.reachable
    ? await discoverJavaScriptEndpoints(analysis.finalUrl)
    : []

  const endpoints = [
    ...htmlEndpoints,
    ...javascriptEndpoints,
  ]

  const technologies = analysis.reachable
    ? discoverTechnologies(analysis)
    : []
  const securityHead  = analysis.reachable ? analyzeSecurityHeaders(analysis.headers) : []

  return res.json({
    ...analysis,
    endpoints,
    technologies,
    securityHead,
  })
}