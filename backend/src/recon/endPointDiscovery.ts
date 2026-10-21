import * as cheerio from 'cheerio'
import { Endpoint } from '@shared/types/recon'

export const discoverEndpoints = (html: string, baseUrl: string): Endpoint[] => {
  if (!html) return []

  const document = cheerio.load(html)
  const seenUrls = new Set<string>()
  const endpoints: Endpoint[] = []

  let base: URL

  try {
    base = new URL(baseUrl)
  } catch {
    return []
  }

  // Discover endpoints from links
  document('a[href]').each((_, element) => {
    const href = document(element).attr('href')

    if (!href) return

    let resolvedUrl: URL

    try {
      resolvedUrl = new URL(href, base)
    } catch {
      return
    }

    if (resolvedUrl.protocol !== 'http:' && resolvedUrl.protocol !== 'https:') {
      return
    }

    if (resolvedUrl.host !== base.host) return

    resolvedUrl.hash = ''

    const fullUrl = resolvedUrl.toString()
    const endpointKey = `GET:${fullUrl}`

    if (seenUrls.has(endpointKey)) return

    seenUrls.add(endpointKey)

    endpoints.push({
      url: fullUrl,
      path: resolvedUrl.pathname + resolvedUrl.search,
      method: 'GET',
      source: 'link',
    })
  })

  // Discover endpoints from forms
  document('form').each((_, element) => {
    const action = document(element).attr('action') || baseUrl

    const method =
      document(element).attr('method')?.toUpperCase() === 'POST'
        ? 'POST'
        : 'GET'

    let resolvedUrl: URL

    try {
      resolvedUrl = new URL(action, base)
    } catch {
      return
    }

    if (resolvedUrl.protocol !== 'http:' && resolvedUrl.protocol !== 'https:') {
      return
    }

    if (resolvedUrl.host !== base.host) return

    resolvedUrl.hash = ''

    const fullUrl = resolvedUrl.toString()
    const endpointKey = `${method}:${fullUrl}`

    if (seenUrls.has(endpointKey)) return

    seenUrls.add(endpointKey)

    endpoints.push({
      url: fullUrl,
      path: resolvedUrl.pathname + resolvedUrl.search,
      method,
      source: 'form',
    })
  })

  return endpoints
} 