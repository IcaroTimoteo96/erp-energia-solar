import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { quoteService } from '../services/api';
import SolarCalculator from '../components/SolarCalculator';
import CreateQuoteModal from '../components/modals/CreateQuoteModal';
import { useLanguage } from '../context/LanguageContext';

const Quotes = () => {
  const [quotes, setQuotes] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    loadQuotes();
  }, []);

  const loadQuotes = async () => {
    try {
      const response = await quoteService.getAll();
      setQuotes(response.data);
    } catch (error) {
      console.error('Error loading quotes:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{t.quotes.title}</h2>
          <p className="text-gray-500">{t.quotes.subtitle}</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
        >
          <Plus size={20} />
          {t.quotes.newQuote}
        </button>
      </div>

      <CreateQuoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={loadQuotes}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 font-semibold text-gray-700">{t.quotes.recentQuotes}</div>
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 font-semibold text-gray-600">{t.quotes.client}</th>
                  <th className="px-6 py-4 font-semibold text-gray-600">{t.quotes.systemSize}</th>
                  <th className="px-6 py-4 font-semibold text-gray-600">{t.quotes.totalPrice}</th>
                  <th className="px-6 py-4 font-semibold text-gray-600">{t.quotes.status}</th>
                  <th className="px-6 py-4 font-semibold text-gray-600"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {quotes.map((quote) => (
                  <tr key={quote.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{quote.lead?.name || 'Unknown'}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{quote.systemSizeKw} kWp</td>
                    <td className="px-6 py-4 font-medium text-gray-900">${quote.totalPrice.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        quote.status === 'Accepted' ? 'bg-green-100 text-green-700' :
                        quote.status === 'Sent' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {quote.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-sm text-blue-600 hover:text-blue-800">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
                {quotes.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                      No quotes generated yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <SolarCalculator />
        </div>
      </div>
    </div>
  );
};

export default Quotes;
