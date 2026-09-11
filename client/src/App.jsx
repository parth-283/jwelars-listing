import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import JewelryList from './pages/JewelryList';
import JewelryDetail from './pages/JewelryDetail';
import JewelryForm from './pages/JewelryForm';
import API from './utils/api';

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleRefresh = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this jewelry item?')) return;
    try {
      await API.delete(`/jewelry/${id}`);
    } catch (err) {
      console.warn('API delete error notice:', err.message);
    }
    handleRefresh();
  };

  return (
    <Router>
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans">
        <Navbar onOpenAddModal={() => setIsAddModalOpen(true)} />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route
              path="/"
              element={
                <JewelryList
                  onSelectProduct={(product) => setSelectedProduct(product)}
                  onEditProduct={(product) => setEditingProduct(product)}
                  onDeleteProduct={handleDeleteProduct}
                  refreshTrigger={refreshTrigger}
                />
              }
            />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="border-t border-zinc-900 bg-zinc-950/80 py-8 text-center text-xs text-zinc-500">
          <div className="max-w-7xl mx-auto px-4">
            <p>© {new Date().getFullYear()} JWELARS - High Jewelry Catalog System. Express + MongoDB + React Solution.</p>
          </div>
        </footer>

        {/* Product Detail Modal */}
        {selectedProduct && (
          <JewelryDetail
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onEdit={(prod) => setEditingProduct(prod)}
          />
        )}

        {/* Add Modal */}
        {isAddModalOpen && (
          <JewelryForm
            onClose={() => setIsAddModalOpen(false)}
            onSuccess={handleRefresh}
          />
        )}

        {/* Edit Modal */}
        {editingProduct && (
          <JewelryForm
            product={editingProduct}
            onClose={() => setEditingProduct(null)}
            onSuccess={handleRefresh}
          />
        )}
      </div>
    </Router>
  );
}
