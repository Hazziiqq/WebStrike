import { HttpAnalysisResult } from "@shared/types/recon"

const TIMEOUT_MS = 10000

export const analyzeHttp = async (url: string): Promise<HttpAnalysisResult> => {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS)
  const browserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  const startTime = Date.now()

  try {
    const response = await fetch(url, {
      method: 'GET',
      signal: controller.signal,
      redirect: 'follow',
      headers:{
        'User-Agent': browserAgent,
      }
    })

    const responseTimeMs = Date.now() - startTime
    const body = await response.text()

    return {
      reachable: true,
      status: response.status,
      statusText: response.statusText,
      contentType: response.headers.get('content-type'),
      server: response.headers.get('server'),
      responseTimeMs,
      finalUrl: response.url,
      body,
    }
  } catch (error) {
    const responseTimeMs = Date.now() - startTime

    return {
      reachable: false,
      status: null,
      statusText: null,
      contentType: null,
      server: null,
      responseTimeMs,
      finalUrl: url,
      body: '',
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  } finally {
    clearTimeout(timeoutId)
  }
}