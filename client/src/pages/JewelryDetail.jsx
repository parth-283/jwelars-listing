import { useState } from 'react';
import { X, Gem, CheckCircle, ShieldCheck, Tag, Sparkles } from 'lucide-react';

export default function JewelryDetail({ product, onClose, onEdit }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!product) return null;

  const images = product.images?.length > 0
    ? product.images
    : [{ url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800', angle: 'front' }];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl glass-panel rounded-3xl border border-zinc-800 shadow-2xl overflow-hidden my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-zinc-900/80 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors border border-zinc-700/50"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Images Gallery Column */}
          <div className="p-6 bg-zinc-900/60 flex flex-col justify-between space-y-4">
            <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800">
              <img
                src={images[activeImageIndex]?.url}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 px-3 py-1 rounded-lg bg-zinc-950/80 backdrop-blur-sm text-xs font-mono text-amber-400 border border-zinc-800">
                Angle: {images[activeImageIndex]?.angle || 'Front View'}
              </div>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      activeImageIndex === idx ? 'border-amber-400 scale-105' : 'border-zinc-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img.url} alt={`Angle ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Column */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-widest">
                  <span>{product.id || 'JWL-ITEM'}</span>
                  <span>•</span>
                  <span className="capitalize">{product.category}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-100 mt-1">
                  {product.name}
                </h2>
              </div>

              <div className="text-3xl font-serif font-bold text-amber-400">
                ${product.price?.toLocaleString()}
              </div>

              <p className="text-zinc-300 text-sm leading-relaxed">
                {product.description || 'No detailed description provided.'}
              </p>

              {/* Material & Stock status */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800/80">
                  <span className="text-[11px] text-zinc-500 uppercase font-medium block">Precious Metal</span>
                  <span className="text-sm font-semibold text-zinc-200 capitalize">{product.material || 'Gold'}</span>
                </div>
                <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800/80">
                  <span className="text-[11px] text-zinc-500 uppercase font-medium block">Stock Availability</span>
                  <span className="text-sm font-semibold text-emerald-400 flex items-center gap-1.5 mt-0.5">
                    <CheckCircle className="w-3.5 h-3.5" /> In Stock ({product.inStock || 1})
                  </span>
                </div>
              </div>

              {/* Specifications */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-zinc-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-400" /> Specifications & Certification
                </h4>
                <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 text-xs space-y-2">
                  <div className="flex justify-between border-b border-zinc-800/80 pb-1.5">
                    <span className="text-zinc-400">Weight:</span>
                    <span className="font-medium text-zinc-200">{product.specifications?.weight || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-800/80 pb-1.5">
                    <span className="text-zinc-400">Gemstone Details:</span>
                    <span className="font-medium text-zinc-200">{product.specifications?.gemstone || 'None'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Certificate No:</span>
                    <span className="font-medium text-amber-300">{product.specifications?.certificate || 'Included'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="pt-4 border-t border-zinc-800 flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  onClose();
                  onEdit && onEdit(product);
                }}
                className="px-5 py-2.5 rounded-xl bg-amber-500 text-zinc-950 font-semibold text-sm hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20"
              >
                Edit Item
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
