import { chromium } from 'playwright'
import { Endpoint } from '@shared/types/recon'

export const discoverJavaScriptEndpoints = async (
  targetUrl: string): Promise<Endpoint[]> => {

  const endpoints: Endpoint[] = []
  const seenUrls = new Set<string>()

  const browser = await chromium.launch({
    headless: true,
  })

  const page = await browser.newPage()

  page.on('request', (request) => {

    const url = request.url()
    const method = request.method()
    const resourceType = request.resourceType()


    if (resourceType !== 'xhr' && resourceType !== 'fetch'
    ) {
      return
    }

    if (method !== 'GET' && method !== 'POST'
    ) {
      return
    }

    let parsedUrl: URL

    try {
      parsedUrl = new URL(url)
    } catch {
      return
    }


    const baseUrl = new URL(targetUrl)

    if (parsedUrl.host !== baseUrl.host) {
      return
    }

    parsedUrl.hash = ''

    const fullUrl = parsedUrl.toString()
    const endpointKey = `${method}:${fullUrl}`


    if (seenUrls.has(endpointKey)) {
      return
    }

    seenUrls.add(endpointKey)

    endpoints.push({
      url: fullUrl,
      path: parsedUrl.pathname + parsedUrl.search,
      method,
      source: 'javascript',
    })
  })

  try {
    await page.goto(targetUrl, {
      waitUntil: 'networkidle',
      timeout: 10000,
    })
  } catch {

  }

  await browser.close()

  return endpoints
}