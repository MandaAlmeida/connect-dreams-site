/** Two overlapping circles: the "connect" in Connect Dreams. */
export function BrandMark({ size = 26 }: { size?: number }) {
  return (
    <svg className="brand-mark" width={size} height={size} viewBox="0 0 26 26" aria-hidden="true" focusable="false">
      <circle cx="9" cy="13" r="8" fill="var(--accent)" />
      <circle cx="17" cy="13" r="8" fill="none" stroke="currentColor" strokeWidth="2.25" />
    </svg>
  );
}
