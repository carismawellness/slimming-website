"use client";

import { useEffect, useRef, useState } from "react";

/*
  Highlighted stat / proof numbers.

  Drop-in: replace a rendered stat figure with <CountUp value="10,000+" /> (or a
  number). It parses a leading prefix (€, ~, etc.), the numeric core (with `,`
  thousands and `.` decimals) and a trailing suffix (%, +, k, x, ★, etc.), then
  renders prefix + formatted + suffix.

  - SEO safe: server-rendered HTML shows the final value, never a "0" fallback.
  - tabular-nums so the width doesn't jitter while counting.
  - Non-numeric values (no digits) render verbatim, so it's always safe to wrap.
*/
export default function CountUp({
  value,
  duration = 1600,
  className,
  style,
}: {
  value: string | number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const raw = String(value);
  // prefix (non-digits) · numeric core (digits, commas, dots) · suffix (rest)
  const m = raw.match(/^(\D*?)(\d[\d.,]*)(.*)$/);
  const valid = !!m; // stable boolean — DON'T depend on `m` (new array every render)

  const numStr = m ? m[2] : "";
  const prefix = m ? m[1] : "";
  const suffix = m ? m[3] : "";
  const hasComma = numStr.includes(",");
  const decimals = numStr.includes(".") ? (numStr.split(".")[1]?.length ?? 0) : 0;
  const target = m ? parseFloat(numStr.replace(/,/g, "")) : 0;

  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(target);
  const [done, setDone] = useState(true);

  useEffect(() => {
    if (!valid) return;
    const el = ref.current;
    if (!el) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(target);
      setDone(true);
      return;
    }
    let raf = 0;
    let start = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          io.unobserve(el);
          const step = (t: number) => {
            if (!start) start = t;
            const p = Math.min((t - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
            setN(target * eased);
            if (p < 1) raf = requestAnimationFrame(step);
            else {
              setN(target);
              setDone(true);
            }
          };
          raf = requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [valid, target, duration]);

  if (!m) return <span className={className} style={style}>{raw}</span>;

  const current = done ? target : n;
  const formatted = current.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: hasComma,
  });

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums", ...style }}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
