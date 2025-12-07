import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

interface User {
  email: string;
  fullName: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }

    // Configurar interceptor para adicionar token em todas as requisições
    const interceptorId = api.interceptors.request.use(
      (config) => {
        const tokenToUse = localStorage.getItem('token'); // Pegar sempre do localStorage para garantir
        if (tokenToUse) {
          config.headers.Authorization = `Bearer ${tokenToUse}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Interceptor para tratar erros 401 (Token expirado/inválido)
    const responseInterceptorId = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          logout(); // Auto logout se der 401
        }
        return Promise.reject(error);
      }
    );

    return () => {

      api.interceptors.request.eject(interceptorId);
      api.interceptors.response.eject(responseInterceptorId);
    };
  }, []);

  const login = (newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
    // Não precisa mais setar o header aqui manualmente, o interceptor cuida disso
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
