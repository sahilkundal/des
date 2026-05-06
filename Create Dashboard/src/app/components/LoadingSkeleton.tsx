interface LoadingSkeletonProps {
  className?: string;
  count?: number;
}

export function LoadingSkeleton({ className = "", count = 1 }: LoadingSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={`skeleton-${i}`}
          className={`bg-[var(--muted)] rounded-lg shimmer ${className}`}
          style={{ height: "100%" }}
        />
      ))}
    </>
  );
}

export function LoadingCodeBlock() {
  return (
    <div className="glass rounded-xl p-4 space-y-3">
      <LoadingSkeleton className="h-4 w-3/4" />
      <LoadingSkeleton className="h-4 w-full" />
      <LoadingSkeleton className="h-4 w-5/6" />
      <LoadingSkeleton className="h-4 w-full" />
      <LoadingSkeleton className="h-4 w-2/3" />
    </div>
  );
}

export function LoadingCard() {
  return (
    <div className="glass rounded-xl p-6 space-y-4">
      <LoadingSkeleton className="h-6 w-1/3" />
      <LoadingSkeleton className="h-10 w-1/2" />
      <LoadingSkeleton className="h-4 w-2/3" />
    </div>
  );
}
