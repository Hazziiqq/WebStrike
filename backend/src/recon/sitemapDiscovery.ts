import { SitemapFinding } from "@shared/types/recon";

export const discoverSitemap = async(baseUrl: string): Promise<SitemapFinding[]> => {

    let base: URL
    const finding: SitemapFinding[] = []
    const seenPaths = new Set<string>()
    const controller = new AbortController()

    try {
        base = new URL(baseUrl)
    } catch (error) {
        return[]
    }
    const timeOut = 10000
    const timeoutId = setTimeout(() => controller.abort(), timeOut)

    const sitemapUrl = new URL('/sitemap.xml', base)

    try {
        const response = await fetch(sitemapUrl,{
            method:'GET',
            signal:controller.signal,
            redirect: 'follow'
        })

        if(!response.ok){
            return []
        }

        const sitemapText = await response.text()
        const matches = sitemapText.matchAll(/<loc>\s*([\s\S]*?)\s*<\/loc>/gi)

        for(const match of matches){
            const rawUrl = match[1].trim()

            try {
                const parsedUrl = new URL(rawUrl)

                if(!['https:','http:'].includes(parsedUrl.protocol)){
                    continue
                }

                const url = parsedUrl.toString()
                if(seenPaths.has(url)){
                    continue
                }
                seenPaths.add(url)

                finding.push({
                    url,
                    path: `${parsedUrl.pathname}${parsedUrl.search}`,
                    source:'sitemap',
                })

            } catch (error) {
                continue
            }
        }
    } catch (error) {
        return []
    }finally{
        clearTimeout(timeoutId)
    }

    return finding
}