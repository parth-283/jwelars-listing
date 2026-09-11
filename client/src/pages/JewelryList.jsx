import { useState, useEffect } from 'react';
import { Search, RefreshCw, Gem, Trash2, Edit3, Eye, ShieldCheck, Lock } from 'lucide-react';
import API from '../utils/api';

const MOCK_ITEMS = [
  {
    _id: 'mock-1',
    id: 'JWL-101',
    name: 'Solitaire Diamond Ring',
    category: 'ring',
    material: 'platinum',
    price: 4850,
    description: 'Flawless 1.5-carat round brilliant cut diamond set in pure platinum with classic six-prong crown.',
    images: [{ url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800' }],
    specifications: { weight: '4.2g', gemstone: 'Diamond 1.5ct', certificate: 'GIA-221948' },
    availability: true
  },
  {
    _id: 'mock-2',
    id: 'JWL-102',
    name: 'Royal Sapphire Pendant',
    category: 'pendant',
    material: 'gold',
    price: 3200,
    description: 'Deep royal blue Ceylon sapphire framed by a halo of micro-pave diamonds in 18k yellow gold.',
    images: [{ url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800' }],
    specifications: { weight: '5.8g', gemstone: 'Blue Sapphire 2.1ct', certificate: 'AGL-88391' },
    availability: true
  },
  {
    _id: 'mock-3',
    id: 'JWL-103',
    name: 'Eternal Rose Gold Bangle',
    category: 'bracelet',
    material: 'gold',
    price: 2150,
    description: 'Sleek hinged bangle crafted in 18k rose gold with subtle geometric diamond-cut facets.',
    images: [{ url: 'https://images.unsplash.com/photo-1611591475140-be3617c978d2?auto=format&fit=crop&q=80&w=800' }],
    specifications: { weight: '12.4g', gemstone: 'None', certificate: 'Authenticity Guarantee' },
    availability: true
  },
  {
    _id: 'mock-4',
    id: 'JWL-104',
    name: 'Emerald Drop Earrings',
    category: 'earring',
    material: 'gold',
    price: 5600,
    description: 'Vibrant Colombian emerald drops accented by marquise-cut diamond studs in 18k white gold.',
    images: [{ url: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&q=80&w=800' }],
    specifications: { weight: '6.1g', gemstone: 'Emerald 3.0ct tw', certificate: 'SSEF-9921' },
    availability: true
  }
];

export default function JewelryList({ isAdmin, onSelectProduct, onEditProduct, onDeleteProduct, refreshTrigger }) {
  const [jewelry, setJewelry] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [material, setMaterial] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [loading, setLoading] = useState(true);
  const [isUsingMock, setIsUsingMock] = useState(false);

  useEffect(() => {
    fetchJewelry();
  }, [search, category, material, minPrice, maxPrice, refreshTrigger]);

  const fetchJewelry = async () => {
    setLoading(true);
    try {
      const { data } = await API.get('/jewelry', {
        params: { search, category, material, minPrice, maxPrice }
      });

      if (data && data.success && Array.isArray(data.data) && data.data.length > 0) {
        setJewelry(data.data);
        setIsUsingMock(false);
      } else if (search || category || material || minPrice || maxPrice) {
        setJewelry(data?.data || []);
        setIsUsingMock(false);
      } else {
        setJewelry(MOCK_ITEMS);
        setIsUsingMock(true);
      }
    } catch (error) {
      console.warn('API fetch notice: Server endpoint unavailable or empty. Displaying demo items.', error.message);
      let filtered = MOCK_ITEMS;
      if (category) filtered = filtered.filter(i => i.category === category);
      if (material) filtered = filtered.filter(i => i.material === material);
      if (search) filtered = filtered.filter(i => i.name.toLowerCase().includes(search.toLowerCase()));
      setJewelry(filtered);
      setIsUsingMock(true);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 via-amber-950/30 to-zinc-900 border border-amber-500/20 p-8 md:p-12 shadow-2xl">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Gem className="w-3.5 h-3.5" /> High Jewelry Catalog
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-zinc-100 tracking-tight leading-tight">
            Curated Elegance & Precision Management
          </h1>
          <p className="mt-3 text-zinc-400 text-sm sm:text-base leading-relaxed">
            Visitors can browse pieces, filter by material, and view certificate specifications. Admins can log in to modify inventory.
          </p>
        </div>
        <div className="absolute right-[-40px] bottom-[-40px] w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Filter Control Bar */}
      <div className="glass-panel p-5 rounded-2xl border border-zinc-800 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="relative lg:col-span-2">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search by title, specs, or tag..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-700/60 text-zinc-100 placeholder-zinc-500 text-sm focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          <div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-700/60 text-zinc-100 text-sm focus:outline-none focus:border-amber-500 transition-colors"
            >
              <option value="">All Categories</option>
              <option value="ring">Ring</option>
              <option value="necklace">Necklace</option>
              <option value="bracelet">Bracelet</option>
              <option value="earring">Earring</option>
              <option value="pendant">Pendant</option>
            </select>
          </div>

          <div>
            <select
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-700/60 text-zinc-100 text-sm focus:outline-none focus:border-amber-500 transition-colors"
            >
              <option value="">All Materials</option>
              <option value="gold">Gold</option>
              <option value="silver">Silver</option>
              <option value="platinum">Platinum</option>
              <option value="bronze">Bronze</option>
            </select>
          </div>

          <button
            onClick={fetchJewelry}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-800 text-zinc-300 hover:text-amber-400 hover:bg-zinc-700 text-sm font-medium transition-all"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Product Items Grid */}
      {loading ? (
        <div className="py-24 text-center space-y-3">
          <div className="w-12 h-12 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin mx-auto" />
          <p className="text-zinc-400 text-sm">Loading jewelry collection...</p>
        </div>
      ) : jewelry.length === 0 ? (
        <div className="py-20 text-center glass-panel rounded-2xl border border-zinc-800 space-y-3">
          <Gem className="w-12 h-12 text-zinc-600 mx-auto" />
          <p className="text-zinc-300 font-serif text-lg">No items match your selected filters</p>
          <p className="text-zinc-500 text-sm">Try clearing your search terms or filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {jewelry.map((item) => (
            <div
              key={item._id || item.id}
              className="group glass-panel rounded-2xl border border-zinc-800/80 overflow-hidden hover:border-amber-500/40 transition-all duration-300 flex flex-col"
            >
              <div className="relative h-64 w-full bg-zinc-900 overflow-hidden">
                <img
                  src={item.images?.[0]?.url || 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800'}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
                
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-zinc-950/80 backdrop-blur-md border border-zinc-700/50 text-[11px] font-medium uppercase tracking-wider text-amber-400">
                  {item.category || 'Jewelry'}
                </div>

                {/* Admin-only Edit / Delete action overlay */}
                {isAdmin && (
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      onClick={() => onEditProduct && onEditProduct(item)}
                      className="p-2 rounded-lg bg-zinc-900/90 text-zinc-200 hover:text-amber-400 hover:bg-zinc-800 transition-colors shadow-lg"
                      title="Edit Item"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteProduct && onDeleteProduct(item._id || item.id)}
                      className="p-2 rounded-lg bg-zinc-900/90 text-zinc-200 hover:text-rose-400 hover:bg-zinc-800 transition-colors shadow-lg"
                      title="Delete Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}

                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                  <span className="text-xs font-mono text-zinc-400">{item.id || 'JWL-NUM'}</span>
                  <span className="text-2xl font-serif font-bold text-amber-400">${item.price?.toLocaleString()}</span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif font-bold text-lg text-zinc-100 group-hover:text-amber-300 transition-colors line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-zinc-400 text-xs line-clamp-2 leading-relaxed">
                    {item.description || 'No description specified.'}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
                  <span className="capitalize text-zinc-300 font-medium">
                    Material: <strong className="text-amber-400/90">{item.material || 'Gold'}</strong>
                  </span>
                  <button
                    onClick={() => onSelectProduct && onSelectProduct(item)}
                    className="flex items-center gap-1 text-amber-400 hover:text-amber-300 font-semibold transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" /> Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
