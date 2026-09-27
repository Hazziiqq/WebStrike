import { Request, Response } from 'express'
import { analyzeHttp } from '../recon/httpAnalyzer'
import { discoverEndpoints } from '../recon/endPointDiscovery'
export const startRecon = async (req: Request, res: Response) => {
  const { target } = req.body

  if (!target) {
    return res.status(400).json({ error: 'Target URL is required' })
  }

  const analysis = await analyzeHttp(target)

  const endpoints = analysis.reachable
    ? discoverEndpoints(analysis.body, analysis.finalUrl)
    : []

  return res.json({
    ...analysis,
    endpoints,
  })
}