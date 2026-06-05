export default function GalleryLoading() {
  return (
    <div className="pt-24 bg-ivory min-h-screen animate-pulse">
      <div className="h-48 bg-charcoal/20" />
      <div className="bg-ivory border-b border-gold/15 px-6 py-4">
        <div className="max-w-7xl mx-auto flex gap-6">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-4 w-16 bg-charcoal/10 rounded" />
          ))}
        </div>
      </div>
      <section className="py-10 px-6 bg-ivory">
        <div className="max-w-7xl mx-auto columns-2 md:columns-3 gap-4 space-y-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className={`break-inside-avoid bg-charcoal/10 rounded ${i % 3 === 0 ? "aspect-[3/4]" : "aspect-square"}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
