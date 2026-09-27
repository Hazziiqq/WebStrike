import * as cheerio from 'cheerio'
import { Endpoint } from '@shared/types/recon'

export const discoverEndpoints = (
  html: string,
  baseUrl: string
): Endpoint[] => {
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

  document('a[href]').each((_, element) => {
    const href = document(element).attr('href')

    if (!href) return

    let resolvedUrl: URL

    try {
      resolvedUrl = new URL(href, base)
    } catch {
      return
    }

    // Only allow HTTP and HTTPS
    if (
      resolvedUrl.protocol !== 'http:' &&
      resolvedUrl.protocol !== 'https:'
    ) {
      return
    }

    // Only discover endpoints on the same host
    if (resolvedUrl.host !== base.host) return

    // Remove URL fragment
    resolvedUrl.hash = ''

    const fullUrl = resolvedUrl.toString()

    // Skip duplicate URLs
    if (seenUrls.has(fullUrl)) return

    seenUrls.add(fullUrl)

    endpoints.push({
      url: fullUrl,
      path: resolvedUrl.pathname,
      method: 'GET',
      source: 'link',
    })
  })

  return endpoints
}