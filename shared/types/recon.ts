export type HttpAnalysisResult = {
  reachable: boolean
  status: number | null
  statusText: string | null
  contentType: string | null
  server: string | null
  responseTimeMs: number
  finalUrl: string
  body: string
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
}