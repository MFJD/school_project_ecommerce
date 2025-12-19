interface ProductFilterProps {
  categories: any[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchText: string;
  setSearchText: (text: string) => void;
}

export default function ProductFilter({ 
  categories, 
  selectedCategory, 
  setSelectedCategory, 
  searchText, 
  setSearchText 
}: ProductFilterProps) {
  return (
    <section className="max-w-7xl mx-auto px-6">
      <div className="bg-white rounded-2xl shadow p-4 flex flex-col md:flex-row gap-3">
        <select 
          className="border rounded-lg px-3 py-2 text-sm"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All categories</option>
          {categories.map((cat: any) => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>
        <input
          className="border rounded-lg px-3 py-2 text-sm flex-1"
          placeholder="Search products"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
    </section>
  );
}