import { Callout, Code, DocLink, DocSection, Mono } from "@/components/docs-layout";
import type { GroupContent } from "@/content/docs/types";

/** The terminal app's slash commands, as its own command registry groups them. */
const COMMANDS: { title: string; items: { name: string; description: string }[] }[] = [
  {
    title: "Start & navigate",
    items: [
      { name: "/help", description: "Show shortcuts for this screen." },
      { name: "/new", description: "Start a new assessment, optionally on a target." },
      { name: "/template", description: "Pick a template, then type its target." },
    ],
  },
  {
    title: "Flow",
    items: [
      { name: "/plan", description: "Review and run the test plan." },
      { name: "/approval", description: "Open the approval gate." },
      { name: "/status", description: "Live execution, after the plan runs." },
    ],
  },
  {
    title: "Findings & reports",
    items: [
      { name: "/findings", description: "List all findings." },
      { name: "/finding", description: "Open one finding." },
      { name: "/report", description: "Open the assessment report." },
      { name: "/export", description: "Export the report as PDF, JSON or DOCX." },
      { name: "/summary", description: "Show the assessment summary." },
    ],
  },
  {
    title: "Assessments & data",
    items: [
      { name: "/assessments", description: "List and reopen assessments." },
      { name: "/audit", description: "Activity log and audit trail." },
    ],
  },
  {
    title: "AI models & agent",
    items: [
      { name: "/assess", description: "Run a real assessment with the AI agent; needs a model." },
      { name: "/add-on", description: "Add reference files for the AI." },
      { name: "/provider", description: "Manage LLM providers: set, test, use or unset." },
      { name: "/model", description: "Pick the active model." },
    ],
  },
  {
    title: "Dashboard & session",
    items: [
      { name: "/web", description: "Open the local dashboard in your browser, starting it if needed." },
      { name: "/quit", description: "Quit Reconix." },
    ],
  },
];

export const interfaces: GroupContent = {
  terminal: {
    lede: "The primary interface. Start assessments, edit the scope, approve actions and see results.",
    body: (
      <>
        <DocSection title="What it does">
          <ul>
            <li>Starts assessments from a plain-language request or a template.</li>
            <li>Shows the draft Scope Manifest so you can edit it, and asks for your approval.</li>
            <li>Pauses for your approval on medium- and high-risk actions; you can stop an assessment at any time.</li>
            <li>Shows results, generates the report and exports it.</li>
          </ul>
        </DocSection>
        <DocSection title="Start it">
          <Code>{`cd apps/tui
source .venv/bin/activate
python -m reconix`}</Code>
          <p>
            Installation is in <DocLink href="/docs/getting-started/installation">Installation</DocLink>.
          </p>
        </DocSection>
        <DocSection title="Commands">
          <p>
            Describe what you want assessed in plain language, or use a slash command. <Mono>/help</Mono> lists the
            shortcuts for whichever screen you are on.
          </p>
          <div className="space-y-5">
            {COMMANDS.map((g) => (
              <div key={g.title}>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{g.title}</p>
                <ul className="mt-2">
                  {g.items.map((c) => (
                    <li key={c.name}>
                      <Mono>{c.name}</Mono>: {c.description}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p>
            The four templates behind <Mono>/template</Mono> are described in{" "}
            <DocLink href="/docs/assessments/templates">Assessment templates</DocLink>.
          </p>
        </DocSection>
      </>
    ),
  },
  "vscode-extension": {
    lede: "Reconix inside VS Code, next to the code and configuration you are assessing.",
    draft: true,
    body: (
      <>
        <DocSection title="What it is">
          <p>
            The VS Code extension is another way to work with Reconix, alongside the{" "}
            <DocLink href="/docs/interfaces/terminal">terminal</DocLink> and the{" "}
            <DocLink href="/docs/interfaces/local-viewer">local dashboard</DocLink>. The Scope Manifest, the risk
            policies and the approval gates apply exactly as they do in the terminal. See{" "}
            <DocLink href="/docs/guardrails/scope-and-safety">Scope &amp; safety</DocLink>.
          </p>
          <Callout variant="draft">
            Installation, the commands the extension adds and its settings are still to document.
          </Callout>
        </DocSection>
      </>
    ),
  },
  "local-viewer": {
    lede: "A local web dashboard for the runs the terminal saved, and a report ready to hand over.",
    body: (
      <>
        <DocSection title="What you can see">
          <ul>
            <li>An overview of your runs, and the list of past assessments.</li>
            <li>Findings, filtered by severity, review state and free-text search.</li>
            <li>One finding at a time: its severity, masked evidence, impact and remediation.</li>
            <li>Reports, exported as PDF, JSON or DOCX.</li>
            <li>An AI Assistant you can ask about the results.</li>
          </ul>
          <p>
            Assessments are started and approved in the terminal; the dashboard reads the runs it saved. The activity
            log and audit trail live in the terminal, under <Mono>/audit</Mono>.
          </p>
        </DocSection>
        <DocSection title="Start it">
          <p>
            From the terminal, type <Mono>/web</Mono>: it installs the packages the first time, starts the dashboard and
            opens your browser. By hand:
          </p>
          <Code>{`cd apps/web
npm install
npm run dev`}</Code>
          <p>
            The dashboard listens on <Mono>127.0.0.1</Mono> only, on port <Mono>3100</Mono> (<Mono>RECONIX_WEB_PORT</Mono>{" "}
            changes it), and reads the runs the terminal saved to <Mono>~/.reconix/assessments/</Mono>.
          </p>
          <Callout>
            Started by hand, the dashboard prints a one-time sign-in link in the terminal. Open it to sign in.
          </Callout>
        </DocSection>
      </>
    ),
  },
};
