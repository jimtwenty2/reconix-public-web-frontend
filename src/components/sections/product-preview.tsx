import Image from "next/image";
import {
  FileText,
  LayoutDashboard,
  ShieldAlert,
  SlidersHorizontal,
  SquareTerminal,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { AsciiBanner } from "@/components/ascii-banner";
import { SectionShell } from "@/components/section-shell";
import { ProductTabs, type ProductView } from "@/components/product-tabs";
import { ScopeScreen } from "@/components/product-preview/scope-screen";

const icon = { strokeWidth: 1.6, "aria-hidden": true } as const;

/**
 * Dashboard, Findings and Report are real captures of the local web dashboard
 * (reconix-core-backend/apps/web on its sample data), not mocks. `.app-window` gives them the
 * same rounded, bordered, shadowed frame as the other screens, and clips the corners.
 */
function Shot({ src, height }: { src: string; height: number }) {
  return (
    <div className="app-window">
      <Image
        src={src}
        alt=""
        width={2400}
        height={height}
        sizes="(min-width: 1280px) 1152px, 100vw"
        className="block h-auto w-full"
        priority={false}
      />
    </div>
  );
}

/**
 * The Execution tab is the Figma frame exported as SVG, served as-is so its paths, type
 * outlines and colours stay exactly as designed. `next/image` refuses SVG without
 * `dangerouslyAllowSVG`, so this is a plain <img>; the file carries its own dark
 * background, so no `.app-window` frame — only the rounded clip.
 */
function ExecutionShot() {
  return (
    <div className="overflow-hidden rounded-[0.875rem] shadow-[0_30px_80px_-32px_color-mix(in_oklab,var(--primary)_38%,transparent)]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/execution-state.svg"
        alt=""
        width={1404}
        height={600}
        loading="lazy"
        decoding="async"
        className="block h-auto w-full"
      />
    </div>
  );
}

/** Ordered as an assessment runs: overview first, then scope → run → findings → report. */
const VIEWS: ProductView[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    surface: "viewer",
    icon: <LayoutDashboard {...icon} />,
    caption:
      "Every run at a glance: findings by severity, progress, tool execution and the latest activity.",
    // note: "Local dashboard · sample data",
    screen: <Shot src="/reconix-dashboard.webp" height={1500} />,
  },
  {
    id: "scope",
    label: "Scope",
    surface: "terminal",
    icon: <SlidersHorizontal {...icon} />,
    caption:
      "The agent drafts a scope manifest from a template: the target, what it may do and which tools. Nothing runs until you approve it.",
    note: "Terminal · sample manifest",
    screen: <ScopeScreen />,
  },
  {
    id: "execution",
    label: "Execution",
    surface: "terminal",
    icon: <SquareTerminal {...icon} />,
    caption:
      "Every action is checked live: LOW runs, excluded targets are blocked, MEDIUM waits for you.",
    note: "Terminal · sample run",
    screen: <ExecutionShot />,
  },
  {
    id: "findings",
    label: "Findings",
    surface: "viewer",
    icon: <ShieldAlert {...icon} />,
    caption:
      "Filter by severity, then open a finding for its CWE, description, impact, masked evidence and remediation.",
    // note: "Local dashboard · sample data",
    screen: <Shot src="/reconix-findings.webp" height={1698} />,
  },
  {
    id: "report",
    label: "Report",
    surface: "viewer",
    icon: <FileText {...icon} />,
    caption:
      "Combine assessment results across multiple runs, analyze vulnerabilities, and export comprehensive security reports in PDF, DOCX, or JSON formats.",
    // note: "Local dashboard · sample data",
    screen: <Shot src="/reconix-report.webp" height={1558} />,
  },
];

export function ProductPreview() {
  return (
    <SectionShell id="product" backdrop="glow" tint="primary">
      <Reveal className="mb-10 max-w-3xl space-y-4">
        <p
          data-reveal
          className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-primary"
        >
          Product tour
        </p>
        <div data-reveal>
          <AsciiBanner text="In action" />
        </div>
        <h2
          data-reveal
          className="text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          See Reconix in action.
        </h2>
        <p
          data-reveal
          className="text-base leading-relaxed text-foreground/90 sm:text-lg"
        >
          From defining the scope to reading findings and exporting the report,
          one assessment in the terminal where you approve and the viewer where
          you review.
        </p>
      </Reveal>
      <Reveal stagger={0.12}>
        <ProductTabs views={VIEWS} />
      </Reveal>
    </SectionShell>
  );
}
