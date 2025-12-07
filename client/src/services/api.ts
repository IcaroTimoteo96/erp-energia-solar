import axios from 'axios';

const getBaseUrl = () => {
  let url = import.meta.env.VITE_API_URL || '/api';
  if (url !== '/api' && !url.endsWith('/api')) {
    url = `${url}/api`;
  }
  return url;
};

const api = axios.create({
  baseURL: getBaseUrl(),
});

export const leadService = {
  getAll: () => api.get('/leads'),
  getById: (id: string) => api.get(`/leads/${id}`),
  create: (data: any) => api.post('/leads', data),
  update: (id: string, data: any) => api.put(`/leads/${id}`, data),
  delete: (id: string) => api.delete(`/leads/${id}`),
};

export const quoteService = {
  getAll: () => api.get('/quotes'),
  getById: (id: string) => api.get(`/quotes/${id}`),
  create: (data: any) => api.post('/quotes', data),
  calculate: (data: any) => api.post('/quotes/calculate', data),
};

export const projectService = {
  getAll: () => api.get('/projects'),
  getById: (id: string) => api.get(`/projects/${id}`),
  create: (data: any) => api.post('/projects', data),
  uploadDocument: (id: string, data: any) => api.post(`/projects/${id}/documents`, data),
};

export const serviceOrderService = {
  getAll: () => api.get('/service-orders'),
  getById: (id: string) => api.get(`/service-orders/${id}`),
  create: (data: any) => api.post('/service-orders', data),
  addChecklistItem: (id: string, data: any) => api.post(`/service-orders/${id}/checklist`, data),
};

export const productService = {
  getAll: () => api.get('/products'),
  getById: (id: string) => api.get(`/products/${id}`),
  create: (data: any) => api.post('/products', data),
  update: (id: string, data: any) => api.put(`/products/${id}`, data),
  delete: (id: string) => api.delete(`/products/${id}`),
};

export const ticketService = {
  getAll: () => api.get('/tickets'),
  getById: (id: string) => api.get(`/tickets/${id}`),
  create: (data: any) => api.post('/tickets', data),
  update: (id: string, data: any) => api.put(`/tickets/${id}`, data),
  delete: (id: string) => api.delete(`/tickets/${id}`),
};

export const interactionService = {
  getByLeadId: (leadId: string) => api.get(`/interactions/lead/${leadId}`),
  create: (data: any) => api.post('/interactions', data),
};

export const dashboardService = {
  getSummary: () => api.get('/dashboard/summary'),
};

export const invoiceService = {
  getAll: () => api.get('/invoices'),
};

export const transactionService = {
  getBalance: () => api.get('/transactions/balance'),
};

export default api;
