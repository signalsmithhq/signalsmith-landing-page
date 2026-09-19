export function SectionHeading({ eyebrow, title, body, light = false }: { eyebrow: string; title: string; body?: string; light?: boolean }) {
  return <div className={light ? "text-white" : "text-[var(--ink)]"}>
    <p className={light ? "eyebrow text-white/55" : "eyebrow"}>{eyebrow}</p>
    <h2 className="section-title mt-5 max-w-4xl font-medium">{title}</h2>
    {body && <p className={"mt-7 max-w-xl text-base leading-7 " + (light ? "text-white/65" : "text-black/60")}>{body}</p>}
  </div>;
}
