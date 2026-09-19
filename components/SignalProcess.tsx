const steps = [
  ["Problem", "What are we solving?"], ["Complexity", "What makes it difficult?"], ["Craft", "What does it require?"], ["Signal", "What actually matters?"], ["Decision", "What changes?"],
];
const annotations = ["Raw material", "Ambiguity", "Transformation", "Clarity", "Action"];
const stages = ["problem", "complexity", "craft", "signal", "decision"];
export function SignalProcess({ dark = false }: { dark?: boolean }) {
  return <div className={dark ? "text-white" : "text-[var(--ink)]"}>
    <div className="grid grid-cols-1 md:grid-cols-5">
      {steps.map(([name, detail], i) => <div key={name} tabIndex={0} aria-label={`${String(i + 1).padStart(2, "0")} ${name}`} data-stage={stages[i]} className="signal-stage relative min-w-0 border-l border-current/20 px-5 py-5 first:border-l-0 md:min-h-[175px] md:px-6">
        <span className="signal-stage-number eyebrow block">{String(i + 1).padStart(2, "0")}</span>
        <span className="signal-stage-annotation eyebrow" aria-hidden="true">{annotations[i]}</span>
        <h3 className="mt-12 max-w-full whitespace-nowrap text-2xl font-medium tracking-tight">{name}</h3><p className={"mt-2 max-w-full text-xs uppercase tracking-[.16em] " + (dark ? "text-white/45" : "text-black/45")}>{detail}</p>
        {i < steps.length - 1 && <span className="absolute right-4 top-6 hidden text-lg text-current/30 md:block" aria-hidden="true">→</span>}
      </div>)}
    </div>
  </div>;
}
