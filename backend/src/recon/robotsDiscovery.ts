
import { RobotsFinding } from "@shared/types/recon"

export const discoverRobots = async (baseUrl: string): Promise<RobotsFinding[]> => {
    let base: URL
    const findings: RobotsFinding[] = []
    const seenPaths = new Set<string>()
    const controller = new AbortController()

    try {
        base = new URL(baseUrl)
    } catch (error) {
        return []
    }

    const timeOut = 10000
    const timeoutId = setTimeout(() => controller.abort(), timeOut)
    const robotsUrl = new URL('/robots.txt', base)

    try {
        const response = await fetch(robotsUrl, {
            method: 'GET',
            signal: controller.signal,
            redirect: 'follow',
        })

        if (!response.ok) {
            return []
        }

        const robotsText = await response.text()
        const lines = robotsText.split('\n')

        lines.forEach((line) => {
            const cleanLine = line.trim()
            const commentFreeLine = cleanLine.split('#')[0].trim()

            if (commentFreeLine === '') {
                return 
            }

            const lowerLine = commentFreeLine.toLowerCase()

            const robotsInfo = (directive: 'allow' | 'disallow') => {
                const path = commentFreeLine.split(':').slice(1).join(':').trim()

                if (!path.startsWith('/') || path === '/') {
                    return
                }

                const key = `${directive}:${path}`

                if (seenPaths.has(key)) {
                    return
                }

                seenPaths.add(key)

                findings.push({
                    path,
                    directive
                })
            }

            if (lowerLine.startsWith('disallow:')) {
                robotsInfo('disallow')
            } else if (lowerLine.startsWith('allow:')) {
                robotsInfo('allow')
            }
        })

    } catch (error) {
        return []
    } finally {
        clearTimeout(timeoutId)
    }

    return findings
}
