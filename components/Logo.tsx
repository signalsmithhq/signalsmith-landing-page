import Image from "next/image";

export function Logo({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
  const markSize = compact ? 54 : 48;
  return <span className="flex items-center gap-3" aria-label="SignalSmith">
    <Image
      src="/assets/signalsmith-mark.svg"
      alt=""
      width={1208}
      height={1302}
      unoptimized
      priority
      className={light ? "invert mix-blend-screen" : ""}
      style={{ width: markSize, height: markSize, objectFit: "contain" }}
    />
    <span className={compact ? "text-[26px] font-medium tracking-[-.045em]" : "text-[23px] font-medium tracking-[-.04em]"}>SignalSmith</span>
  </span>;
}
