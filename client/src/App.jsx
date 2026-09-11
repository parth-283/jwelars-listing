import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import JewelryList from './pages/JewelryList';
import JewelryDetail from './pages/JewelryDetail';
import JewelryForm from './pages/JewelryForm';
import AdminLoginModal from './components/AdminLoginModal';
import API from './utils/api';

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    const storedUser = localStorage.getItem('admin_user');
    if (token && storedUser) {
      try {
        setAdminUser(JSON.parse(storedUser));
      } catch (e) {
        setAdminUser({ username: 'admin', role: 'admin' });
      }
    }
  }, []);

  const handleRefresh = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    setAdminUser(null);
  };

  const handleDeleteProduct = async (id) => {
    if (!adminUser) {
      setIsLoginModalOpen(true);
      return;
    }

    if (!window.confirm('Are you sure you want to delete this jewelry item?')) return;

    try {
      await API.delete(`/jewelry/${id}`);
    } catch (err) {
      console.warn('API delete error notice:', err.message);
    }
    handleRefresh();
  };

  const isAdmin = Boolean(adminUser);

  return (
    <Router>
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans">
        <Navbar
          isAdmin={isAdmin}
          onOpenAddModal={() => setIsAddModalOpen(true)}
          onOpenLoginModal={() => setIsLoginModalOpen(true)}
          onLogout={handleLogout}
        />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route
              path="/"
              element={
                <JewelryList
                  isAdmin={isAdmin}
                  onSelectProduct={(product) => setSelectedProduct(product)}
                  onEditProduct={(product) => setEditingProduct(product)}
                  onDeleteProduct={handleDeleteProduct}
                  refreshTrigger={refreshTrigger}
                />
              }
            />
          </Routes>
        </main>

        <footer className="border-t border-zinc-900 bg-zinc-950/80 py-8 text-center text-xs text-zinc-500">
          <div className="max-w-7xl mx-auto px-4">
            <p>© {new Date().getFullYear()} JWELARS - High Jewelry Catalog. Public Visitor Mode & Admin Management.</p>
          </div>
        </footer>

        {/* Product Detail Modal */}
        {selectedProduct && (
          <JewelryDetail
            product={selectedProduct}
            isAdmin={isAdmin}
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

        {/* Admin Login Modal */}
        {isLoginModalOpen && (
          <AdminLoginModal
            onClose={() => setIsLoginModalOpen(false)}
            onLoginSuccess={(user) => setAdminUser(user)}
          />
        )}
      </div>
    </Router>
  );
}
