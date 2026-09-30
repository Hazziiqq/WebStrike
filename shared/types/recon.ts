export type HttpAnalysisResult = {
  reachable: boolean
  status: number | null
  statusText: string | null
  contentType: string | null
  server: string | null
  responseTimeMs: number
  finalUrl: string
  body: string
  headers: Record<string, string>
  error?: string
}

export type Endpoint = {
  url: string
  path: string
  method: 'GET'
  source: 'link'
}

export type ReconResult = HttpAnalysisResult & {
  endpoints: Endpoint[]
  technologies: Technology[]
}

export type Technology = {
  name: string,
  category: string,
  confidence:  'high' | 'medium' | 'low',
}