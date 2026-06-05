export default function Loading() {
  return (
    <div className="min-h-screen bg-ivory pt-24 px-6">
      <div className="max-w-7xl mx-auto animate-pulse">
        {/* Hero skeleton */}
        <div className="h-64 bg-charcoal/10 rounded mb-8" />
        {/* Content rows */}
        <div className="space-y-4">
          <div className="h-4 bg-charcoal/10 rounded w-1/4" />
          <div className="h-8 bg-charcoal/10 rounded w-1/2" />
          <div className="h-4 bg-charcoal/10 rounded w-3/4" />
          <div className="h-4 bg-charcoal/10 rounded w-2/3" />
        </div>
      </div>
    </div>
  );
}
