import { SecurityHeaders } from "@shared/types/recon";

export const analyzeSecurityHeaders = (headers: Record<string,string>): SecurityHeaders[] => {

    const securityHeaders: SecurityHeaders[] = []
    const securityHeaderNames = [
        'content-security-policy',
        'strict-transport-security',
        'x-frame-options',
        'x-content-type-options',
        'referrer-policy',
        'permissions-policy',
    ]

    securityHeaderNames.forEach((headerName) =>{
        const value = headers[headerName]
        securityHeaders.push({
            name: headerName,
            present: value !== undefined,
            value: value ?? null,
        })
    })
    return securityHeaders
}