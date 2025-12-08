import { useEffect, useState } from 'react';
import { Plus, Package, AlertTriangle, Search, MoreVertical } from 'lucide-react';
import { productService } from '../services/api';
import CreateProductModal from '../components/modals/CreateProductModal';
import { useLanguage } from '../context/LanguageContext';

const Inventory = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await productService.getAll();
      if (Array.isArray(response.data)) {
        setProducts(response.data);
      } else {
        console.error('Expected array of products but got:', response.data);
        setProducts([]);
      }
    } catch (error) {
      console.error('Error loading products:', error);
      setProducts([]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{t.inventory.title}</h2>
          <p className="text-gray-500">{t.inventory.subtitle}</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
        >
          <Plus size={20} />
          {t.inventory.addProduct}
        </button>
      </div>

      <CreateProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={loadProducts}
      />

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder={t.common.search}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
          />
        </div>
        <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 bg-white">
          <option>All Types</option>
          <option>Panel</option>
          <option>Inverter</option>
          <option>Structure</option>
          <option>Cable</option>
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 font-semibold text-gray-600">{t.inventory.productName}</th>
              <th className="px-6 py-4 font-semibold text-gray-600">{t.inventory.type}</th>
              <th className="px-6 py-4 font-semibold text-gray-600">{t.inventory.manufacturer}</th>
              <th className="px-6 py-4 font-semibold text-gray-600">{t.inventory.stock}</th>
              <th className="px-6 py-4 font-semibold text-gray-600">{t.inventory.price}</th>
              <th className="px-6 py-4 font-semibold text-gray-600"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
                      <Package size={20} />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{product.name}</div>
                      <div className="text-xs text-gray-500">{product.model}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">{product.type}</td>
                <td className="px-6 py-4 text-gray-600">{product.manufacturer}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className={`font-medium ${product.stockQuantity < 10 ? 'text-red-600' : 'text-gray-900'}`}>
                      {product.stockQuantity}
                    </span>
                    {product.stockQuantity < 10 && (
                      <AlertTriangle size={16} className="text-red-500" />
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">${product.price.toLocaleString()}</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100">
                    <MoreVertical size={20} />
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                  {t.common.noData}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;
