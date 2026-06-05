export default function CollectionsLoading() {
  return (
    <div className="pt-24 bg-ivory min-h-screen animate-pulse">
      <div className="h-48 bg-charcoal/20" />
      {[0, 1, 2].map((i) => (
        <div key={i} className={`py-20 px-6 ${i % 2 ? "bg-cream" : "bg-ivory"}`}>
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="aspect-[4/3] bg-charcoal/10 rounded" />
            <div className="space-y-4">
              <div className="h-3 bg-charcoal/10 rounded w-1/4" />
              <div className="h-10 bg-charcoal/10 rounded w-1/2" />
              <div className="h-4 bg-charcoal/10 rounded w-full" />
              <div className="h-4 bg-charcoal/10 rounded w-3/4" />
              <div className="grid grid-cols-2 gap-3">
                {[0, 1, 2, 3].map((j) => (
                  <div key={j} className="h-20 bg-charcoal/10 rounded" />
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
