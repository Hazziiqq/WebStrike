
import { DirectoryFinding } from "@shared/types/recon";

export const discoverDirectory = async (
    baseUrl: string
): Promise<DirectoryFinding[]> => {
    const paths = [
        "/admin",
        "/administrator-panel",
        "/login",
        "/robots.txt",
        "/sitemap.xml",
        "/.git/HEAD",
        "/backup.zip",
    ];

    let base: URL;
    const findings: DirectoryFinding[] = [];

    try {
        base = new URL(baseUrl);

        if (!["http:", "https:"].includes(base.protocol)) {
            return [];
        }
    } catch (error) {
        return [];
    }

    for (const path of paths) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        try {
            const fullUrl = new URL(path, base);
            const result = fullUrl.toString();

            const response = await fetch(result, {
                signal: controller.signal,
                method: "GET",
            });

            findings.push({
                url: result,
                path: path,
                status: response.status,
                statusText: response.statusText,
            });
        } catch (error) {
            continue;
        } finally {
            clearTimeout(timeoutId);
        }
    }

    return findings;
};
