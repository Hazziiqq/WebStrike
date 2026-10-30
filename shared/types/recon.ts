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
  method: 'GET' | 'POST'
  source: 'link' | 'form' | 'javascript' | 'robots'
}

export type ReconResult = HttpAnalysisResult & {
  endpoints: Endpoint[]
  technologies: Technology[]
  securityHead: SecurityHeaders[]
  infoRobots: RobotsFinding[]
  infoSitemap: SitemapFinding[]
  directoryFindings: DirectoryFinding[];
}

export type Technology = {
  name: string,
  category: string,
  confidence:  'high' | 'medium' | 'low',
}

export type SecurityHeaders = {
  name: string,
  present: boolean,
  value: string | null,
}

export type RobotsFinding = {
  path: string,
  directive: 'allow' | 'disallow'
}

export type SitemapFinding = {
  url: string,
  path: string,
  source: 'sitemap'
}

export type DirectoryFinding = {
    url: string;
    path: string;
    status: number;
    statusText: string;
    possibleGenericResponse: boolean;
};