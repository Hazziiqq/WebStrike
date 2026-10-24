
import { DirectoryFinding } from "@shared/types/recon";

type DirectoryAnalysisCardProps = {
    findings: DirectoryFinding[];
};

export default function DirectoryAnalysisCard({
    findings = [],
}: DirectoryAnalysisCardProps) {
    return (
        <section className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="flex items-center justify-between gap-3">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                        Directory & File Discovery
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Results from checking common paths on the target
                    </p>
                </div>

                <span className="rounded-md bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
                    {findings.length} checked
                </span>
            </div>

            {findings.length === 0 ? (
                <div className="mt-5 rounded-lg border border-dashed border-gray-300 p-6 text-center">
                    <p className="text-sm text-gray-500">
                        No directory results available.
                    </p>
                </div>
            ) : (
                <div className="mt-5 overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-gray-200 text-gray-500">
                                <th className="px-3 py-3 font-medium">Path</th>
                                <th className="px-3 py-3 font-medium">Status</th>
                                <th className="px-3 py-3 font-medium">
                                    Response
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {findings.map((finding) => (
                                <tr
                                    key={finding.url}
                                    className="border-b border-gray-100 last:border-0"
                                >
                                    <td className="px-3 py-3">
                                        <p className="font-medium text-gray-800">
                                            {finding.path}
                                        </p>
                                        <p className="mt-1 max-w-xs truncate text-xs text-gray-500">
                                            {finding.url}
                                        </p>
                                    </td>

                                    <td className="px-3 py-3">
                                        <span
                                            className={`inline-flex rounded-md px-2 py-1 text-xs font-medium ${
                                                finding.status >= 200 &&
                                                finding.status < 300
                                                    ? "bg-green-50 text-green-700"
                                                    : finding.status >= 400
                                                      ? "bg-red-50 text-red-700"
                                                      : "bg-gray-100 text-gray-700"
                                            }`}
                                        >
                                            {finding.status}
                                        </span>
                                    </td>

                                    <td className="px-3 py-3 text-gray-600">
                                        {finding.statusText || "No status text"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="mt-4 border-t border-gray-100 pt-3 text-xs text-gray-500">
                {findings.length} HTTP responses recorded
            </div>
        </section>
    );
}
