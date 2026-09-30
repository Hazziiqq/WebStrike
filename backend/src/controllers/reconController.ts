import { Request, Response } from 'express'
import { analyzeHttp } from '../recon/httpAnalyzer'
import { discoverEndpoints } from '../recon/endPointDiscovery'
import { discoverTechnologies } from '../recon/techDetection'

export const startRecon = async (req: Request, res: Response) => {
  const { target } = req.body

  if (!target) {
    return res.status(400).json({ error: 'Target URL is required' })
  }

  const analysis = await analyzeHttp(target)

  const endpoints = analysis.reachable ? discoverEndpoints(analysis.body, analysis.finalUrl): []
  const technologies = analysis.reachable ? discoverTechnologies(analysis): []

  return res.json({
    ...analysis,
    endpoints,
    technologies,
  })
}