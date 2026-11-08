import { Check, ChevronRight, Info, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The Scope tab of "See Reconix in action": a recreation of the TUI's scope-manifest
 * approval step, built in React/Tailwind rather than shipped as a flat screenshot so it
 * stays sharp and reflows on small screens. Static by design — ProductTabs renders it
 * aria-hidden and the approval options are a picture of the TUI, not controls: nothing
 * here can start an assessment.
 * Host follows the repo rule for sample data: RFC 5737 TEST-NET-3 only.
 */

const TARGET = "203.0.113.24";

/** Exactly what the Network template permits; drawn from the TUI's own manifest copy. */
const PERMITTED = [
  "Find which hosts are up",
  "Check which ports are open",
  "Identify the services behind open ports",
  "Only connect to ports 22, 80, 443, 8080 and 8443, using TCP connect",
];

const OPTIONS: { n: number; label: string; tag?: string; desc?: string; tone?: "go" | "stop" }[] = [
  {
    n: 1,
    label: "Approve scope",
    tag: "Recommended",
    desc: "Lock the manifest; next you review the test plan.",
    tone: "go",
  },
  { n: 2, label: "Edit manifest", desc: "Change methods, excluded paths, ports, tools or the time limit." },
  { n: 3, label: "Reject", desc: "Discard this draft: nothing is tested and the assessment stops.", tone: "stop" },
  { n: 4, label: "Type something." },
  { n: 5, label: "Chat about this" },
];

export function ScopeScreen() {
  return (
    <div className="app-window">
      <div className="flex items-center gap-3 border-b border-border bg-background/70 px-4 py-2.5">
        <span aria-hidden className="flex shrink-0 gap-1.5">
          <span className="size-2.5 rounded-full bg-muted-foreground/30" />
          <span className="size-2.5 rounded-full bg-muted-foreground/30" />
          <span className="size-2.5 rounded-full bg-primary/80" />
        </span>
        <div className="min-w-0 flex-1 truncate font-mono text-[11px] text-muted-foreground">
          <span className="text-foreground">reconix</span> · scope manifest
        </div>
      </div>

      <div className="app-terminal space-y-4 p-4 font-mono text-[12px] leading-relaxed sm:space-y-5 sm:p-5 sm:text-[13px]">
        <p className="flex gap-2.5">
          <span aria-hidden className="text-primary">
            ◆
          </span>
          <span className="min-w-0">
            <span className="text-foreground">reconix</span>{" "}
            <span className="text-muted-foreground">
              Network template auto-selected · drafted a scope manifest for your approval
            </span>
          </span>
        </p>

        <div className="rounded-lg border border-primary/40 bg-primary/[0.04] p-3.5 sm:p-4">
          <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
            <ShieldCheck className="size-3.5" aria-hidden strokeWidth={2} /> Scope
          </p>

          <p className="mt-3 text-foreground">
            Reconix will test <span className="text-primary">{TARGET}</span> as a{" "}
            <span className="text-primary">network</span>.
          </p>

          <p className="mt-4 font-semibold text-foreground">What it may do</p>
          <ul className="mt-1.5 space-y-1">
            {PERMITTED.map((p) => (
              <li key={p} className="flex gap-2 text-foreground/90">
                <Check className="mt-[0.3em] size-3.5 shrink-0 text-success" aria-hidden strokeWidth={2.5} />
                <span>{p}</span>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-border/60 pt-3">
            <p className="text-muted-foreground">
              Tools it will use: <span className="text-foreground">nmap, testssl.sh</span>
            </p>
            <p className="text-accent">draft · needs your approval</p>
          </div>
        </div>

        <p className="flex gap-2 text-muted-foreground">
          <Info className="mt-[0.3em] size-3.5 shrink-0" aria-hidden strokeWidth={1.75} />
          <span>The agent can only act inside this manifest. Anything else is blocked before a tool runs.</span>
        </p>

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">Scope</p>
          <p className="mt-2 text-foreground">Approve this scope manifest?</p>

          <ul className="mt-2.5 space-y-1.5">
            {OPTIONS.map((o) => {
              const chosen = o.n === 1;
              return (
                <li key={o.n} className="grid grid-cols-[1rem_1fr] gap-x-1.5">
                  <ChevronRight
                    className={cn("mt-[0.3em] size-3.5 text-primary", !chosen && "invisible")}
                    aria-hidden
                    strokeWidth={2.5}
                  />
                  <div className="min-w-0">
                    <p
                      className={cn(
                        o.tone === "go" && "text-primary",
                        o.tone === "stop" && "text-danger",
                        !o.tone && "text-foreground/90"
                      )}
                    >
                      {o.n}. {o.label}
                      {o.tag && <span className="text-muted-foreground"> ({o.tag})</span>}
                    </p>
                    {o.desc && <p className="text-muted-foreground">{o.desc}</p>}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-border bg-background/70 px-4 py-2 font-mono text-[11px] text-muted-foreground">
        <span>Enter to select</span>
        <span>↑/↓ to navigate</span>
        <span>Esc to go back</span>
      </div>
    </div>
  );
}
