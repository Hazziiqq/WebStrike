
import { DirectoryFinding } from "@shared/types/recon";

const getResponseFingerprint = (html: string) => {
    return html.toLowerCase().trim().replace(/\s/g, '');
};

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
    } catch {
        return [];
    }

    // Generate a random URL to establish the baseline response
    const randomSuffix = Math.random().toString(36).slice(2);
    const randomUrl = new URL(`/webstrike-random-${randomSuffix}`, base);

    let baselineStatus: number;
    let baselineFingerprint: string;

    // Baseline request
    const baselineController = new AbortController();
    const baselineTimeout = setTimeout(
        () => baselineController.abort(),
        10000
    );

    try {
        const baselineResponse = await fetch(randomUrl, {
            signal: baselineController.signal,
            method: "GET",
        });

        baselineStatus = baselineResponse.status;

        const baselineBody = await baselineResponse.text();

        baselineFingerprint = getResponseFingerprint(baselineBody);
    } catch {
        // If baseline fails, do not perform generic-response comparison
        baselineStatus = -1;
        baselineFingerprint = "";
    } finally {
        clearTimeout(baselineTimeout);
    }

    // Test each directory
    for (const path of paths) {
        const controller = new AbortController();

        const timeoutId = setTimeout(
            () => controller.abort(),
            10000
        );

        try {
            const fullUrl = new URL(path, base);
            const result = fullUrl.toString();

            const response = await fetch(result, {
                signal: controller.signal,
                method: "GET",
            });

            const candidateBody = await response.text();

            const candidateFingerprint =
                getResponseFingerprint(candidateBody);

            const possibleGenericResponse =
                baselineStatus !== -1 &&
                response.status === baselineStatus &&
                candidateFingerprint === baselineFingerprint;

            findings.push({
                url: result,
                path: path,
                status: response.status,
                statusText: response.statusText,
                possibleGenericResponse: possibleGenericResponse,
            });

        } catch {
            continue;
        } finally {
            clearTimeout(timeoutId);
        }
    }

    return findings;
};
