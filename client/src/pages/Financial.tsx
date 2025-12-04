import { useEffect, useState } from 'react';
import { DollarSign, FileText, Plus } from 'lucide-react';
import axios from 'axios';
import CreateInvoiceModal from '../components/modals/CreateInvoiceModal';

const Financial = () => {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [balance, setBalance] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [invoicesRes, balanceRes] = await Promise.all([
        axios.get('/api/invoices'),
        axios.get('/api/transactions/balance')
      ]);
      setInvoices(invoicesRes.data);
      setBalance(balanceRes.data.balance);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestão Financeira</h2>
          <p className="text-gray-500">Controle de faturamento e fluxo de caixa</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={20} />
          Nova Fatura
        </button>
      </div>

      <CreateInvoiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={loadData}
      />

      {/* Resumo Financeiro */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Saldo Total</p>
              <p className="text-2xl font-bold text-gray-900">R$ {balance.toLocaleString()}</p>
            </div>
            <DollarSign className="text-green-500" size={40} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Faturas Abertas</p>
              <p className="text-2xl font-bold text-gray-900">
                {invoices.filter(i => i.status === 'Pending').length}
              </p>
            </div>
            <FileText className="text-orange-500" size={40} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Faturado</p>
              <p className="text-2xl font-bold text-gray-900">
                R$ {invoices.reduce((sum, i) => sum + (i.totalAmount || 0), 0).toLocaleString()}
              </p>
            </div>
            <DollarSign className="text-blue-500" size={40} />
          </div>
        </div>
      </div>

      {/* Lista de Faturas */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100 font-semibold text-gray-700">Faturas Recentes</div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-gray-600">Número</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-600">Projeto</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-600">Data</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-600">Valor</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{invoice.invoiceNumber}</td>
                  <td className="px-6 py-4 text-gray-600">{invoice.project?.name || 'N/A'}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(invoice.issueDate).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    R$ {invoice.totalAmount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      invoice.status === 'Paid' ? 'bg-green-100 text-green-700' :
                      invoice.status === 'Pending' ? 'bg-orange-100 text-orange-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {invoice.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Financial;
