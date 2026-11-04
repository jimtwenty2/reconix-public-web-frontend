import { DocsLayout, DocSection } from "@/components/docs-layout";

export const metadata = { title: "Architecture · Reconix" };

const components = [
  { name: "Terminal (TUI)", stack: "Python · Textual · Rich", role: "The primary interface. Starts assessments, edits the scope, approves actions and shows results." },
  { name: "Backend", stack: "FastAPI · SQLAlchemy · PostgreSQL", role: "Validates every request against the Scope Manifest, applies the Risk Policy and execution limits, and records approvals and audit events." },
  { name: "AI Service", stack: "Python · LiteLLM · LangGraph · Qdrant", role: "Reads requests, drafts scopes, classifies and correlates findings, and explains impact and remediation with retrieved knowledge." },
  { name: "Tool Service", stack: "Kali container, over MCP", role: "Runs approved tools from validated inputs, returns normalized results, and masks sensitive output." },
  { name: "LLM", stack: "Ollama (local) or any OpenAI-compatible endpoint", role: "Called only in steps that need language understanding, with a short context rather than raw tool output." },
  { name: "Knowledge base", stack: "BGE-M3 embeddings · Qdrant · NVD API", role: "Hybrid search over OWASP, CWE, CVE/NVD and internal documents." },
  { name: "Local dashboard", stack: "Next.js · TypeScript", role: "Reads the runs the terminal saved: assessments, findings, evidence and reports." },
];

/** The DocSection titles below are linked from the docs overview card: keep `sections` in DOCS_NAV in step. */
export default function Architecture() {
  return (
    <DocsLayout href="/docs/architecture" lede="How the terminal, backend, AI service and tool service work together, and where the checks happen.">
      <DocSection title="Request path">
        <p>A request travels from the Terminal to the Backend, then to the AI Service and the LLM. The answer returns along the same path. Tool runs go through the Backend&apos;s checks before they reach the Tool Service.</p>
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs sm:text-sm">
          {["Terminal", "Backend", "AI Service", "LLM / Knowledge base"].map((s, i, a) => (
            <span key={s} className="flex items-center gap-2">
              <span className="rounded-md border border-border bg-card px-3 py-1.5 text-foreground">{s}</span>
              {i < a.length - 1 && <span>→</span>}
            </span>
          ))}
        </div>
      </DocSection>
      <DocSection title="Components">
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-card font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              <tr><th className="p-3">Component</th><th className="p-3">Stack</th><th className="p-3">Role</th></tr>
            </thead>
            <tbody>
              {components.map((c) => (
                <tr key={c.name} className="border-t border-border align-top">
                  <td className="p-3 font-medium text-foreground">{c.name}</td>
                  <td className="p-3 font-mono text-xs">{c.stack}</td>
                  <td className="p-3">{c.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocSection>
      <DocSection title="Where the checks run">
        <ul>
          <li>Scope and command validation happen in the Backend before any tool request is forwarded.</li>
          <li>Risk classification uses a fixed Risk Policy Table; the AI may suggest a level, but the Backend decides.</li>
          <li>Execution limits are checked before every tool call and monitored while a tool runs.</li>
          <li>Output masking runs before results are displayed, stored or written to a report.</li>
        </ul>
      </DocSection>
      <DocSection title="Deployment">
        <p>Docker Compose runs the supporting services on your own machine: PostgreSQL, Qdrant, Ollama and the Kali tool container. The Backend, the terminal app and the local dashboard run directly on the host, and everything binds to <span className="font-mono text-sm">127.0.0.1</span> only.</p>
      </DocSection>
    </DocsLayout>
  );
}
