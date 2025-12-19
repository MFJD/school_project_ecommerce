interface PopularSectionProps {
  categories: any[];
}

export default function PopularSection({ categories }: PopularSectionProps) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-8">
      <h2 className="text-2xl font-bold mb-6">Popular Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.slice(0, 4).map((cat: any) => (
          <div key={cat._id} className="bg-violet-100 rounded-xl p-6 text-center hover:bg-violet-200 transition cursor-pointer">
            <h3 className="font-semibold text-violet-800">{cat.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}