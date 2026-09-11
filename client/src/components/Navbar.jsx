import { Link, useLocation } from 'react-router-dom';
import { Gem, PlusCircle, Sparkles } from 'lucide-react';

export default function Navbar({ onOpenAddModal }) {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-200 flex items-center justify-center text-zinc-950 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
            <Gem className="w-5 h-5" />
          </div>
          <div>
            <span className="font-serif text-xl font-bold tracking-tight text-zinc-100 flex items-center gap-1.5">
              JWELARS
              <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            </span>
            <span className="text-[10px] uppercase tracking-widest text-amber-400/90 font-medium block">
              High Jewelry Management
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 font-semibold text-sm hover:from-amber-400 hover:to-amber-500 shadow-lg shadow-amber-500/20 active:scale-95 transition-all duration-200"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Item</span>
          </button>
        </div>
      </div>
    </header>
  );
}
