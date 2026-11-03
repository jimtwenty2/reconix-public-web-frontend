import { Callout, Code, DocLink, DocSection, Mono } from "@/components/docs-layout";
import type { GroupContent } from "@/content/docs/types";

export const gettingStarted: GroupContent = {
  requirements: {
    lede: "What you need before you install Reconix.",
    body: (
      <>
        <DocSection title="Software">
          <ul>
            <li>Python 3.9 or later for the terminal app.</li>
            <li>Node.js 20 or later, only if you want the local dashboard.</li>
          </ul>
        </DocSection>
        <DocSection title="Model access">
          <p>
            An OpenAI-compatible endpoint for the steps that need language understanding. A local Ollama server is
            the default; any OpenAI-compatible endpoint works. You add the provider and pick the model inside the
            terminal, not in a file. See <DocLink href="/docs/guardrails/model-switching">Model switching</DocLink>.
          </p>
        </DocSection>
        <DocSection title="Authorization">
          <p>Written authorization for every target you plan to assess.</p>
          <Callout variant="warning" title="Authorized use only">
            Reconix enforces the scope you approve, but the authorization itself comes from you or your organization. See{" "}
            <DocLink href="/docs/guardrails/authorized-use">Authorized use</DocLink>.
          </Callout>
        </DocSection>
      </>
    ),
  },
  installation: {
    lede: "Install the terminal app in its own virtual environment, then start it.",
    notice: "Setup instructions are currently under review and may not fully reflect the latest implementation.",
    body: (
      <>
        <DocSection title="Install the terminal app">
          <p>Clone the repository and install the terminal app. Replace the repository URL with your team&apos;s.</p>
          <Code>{`git clone <your-reconix-repo> reconix
cd reconix/apps/tui
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python -m reconix`}</Code>
          <Callout>
            Keep the virtual environment at <Mono>apps/tui/.venv</Mono>: the local dashboard looks for that Python
            first.
          </Callout>
        </DocSection>
        <DocSection title="Add a model">
          <p>
            In the terminal, add a provider with <Mono>/provider</Mono> and pick its model with <Mono>/model</Mono>.
            API keys are stored encrypted, never in a file you edit by hand.
          </p>
        </DocSection>
        <DocSection title="Next steps">
          <p>
            Review the settings in <DocLink href="/docs/getting-started/configuration">Configuration</DocLink>, then run your{" "}
            <DocLink href="/docs/getting-started/first-assessment">first assessment</DocLink>.
          </p>
        </DocSection>
      </>
    ),
  },
  configuration: {
    lede: "The terminal app reads its settings from apps/tui/.env.",
    notice: "Configuration details are subject to change as development progresses.",
    body: (
      <>
        <DocSection title="Environment settings">
          <p>
            Copy the example file and edit it: <Mono>cp .env.example .env</Mono> in <Mono>apps/tui</Mono>.
          </p>
          <ul>
            <li>
              <Mono>LLM_BASE_URL</Mono>: the OpenAI-compatible endpoint, ending in <Mono>/v1</Mono> for most servers.
              Defaults to <Mono>http://localhost:11434/v1</Mono>, a local Ollama.
            </li>
            <li>
              <Mono>LLM_MODEL</Mono>: the model id to use.
            </li>
            <li>
              <Mono>LLM_TIMEOUT</Mono>: per-request timeout, in seconds.
            </li>
            <li>
              <Mono>HARNESS_DB_PATH</Mono>: the local database of targets, scans and findings. Defaults to{" "}
              <Mono>~/.reconix/harness.db</Mono>.
            </li>
          </ul>
          <Callout>
            Provider API keys do not live in this file. Add them in the terminal with <Mono>/provider</Mono>: they are
            encrypted with the key in <Mono>LLM_KEY_FILE</Mono>.
          </Callout>
        </DocSection>
        <DocSection title="Going further">
          <p>
            Templates, the Scope Manifest and the risk policies are covered in{" "}
            <DocLink href="/docs/configuration">Configuration</DocLink>.
          </p>
        </DocSection>
      </>
    ),
  },
  "first-assessment": {
    lede: "From a plain-language request to a report, with every step approved by you.",
    body: (
      <>
        <DocSection title="Run it">
          <ol className="space-y-2 [&_li]:ml-5 [&_li]:list-decimal">
            <li>
              Start the terminal app with <Mono>python -m reconix</Mono>.
            </li>
            <li>
              Describe what you want assessed in plain language: Reconix reads the target out of your sentence and
              picks the matching template. Or type <Mono>/new</Mono>, or <Mono>/template</Mono> to choose Network, API,
              Source Code or Web URL yourself.
            </li>
            <li>Answer the questions Reconix asks and review the draft Scope Manifest.</li>
            <li>
              <strong>Approve the scope</strong> at the approval gate (<Mono>/approval</Mono>). Nothing runs before this
              step.
            </li>
            <li>
              Follow the run with <Mono>/status</Mono>, and approve any medium- or high-risk action when prompted. You
              can stop an assessment at any time.
            </li>
            <li>
              Read the results with <Mono>/findings</Mono>, then <Mono>/report</Mono> and <Mono>/export</Mono> for PDF,
              JSON or DOCX.
            </li>
          </ol>
        </DocSection>
        <DocSection title="Review the results">
          <p>
            Type <Mono>/web</Mono> to open the{" "}
            <DocLink href="/docs/interfaces/local-viewer">local dashboard</DocLink>, which shows the findings, their
            masked evidence and the report. The activity log and audit trail are in the terminal, under{" "}
            <Mono>/audit</Mono>. The full flow is in{" "}
            <DocLink href="/docs/assessments/workflow">Assessment workflow</DocLink>.
          </p>
        </DocSection>
      </>
    ),
  },
};
