import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// << MODIFICADO: Adicionado 'token' ao tipo do contexto
interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null; // << ADICIONADO
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // << ADICIONADO: Estado para armazenar o token
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const isExpired = payload.exp * 1000 < Date.now();
        if (isExpired) {
          // A função logout já lida com a limpeza
          logout();
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        // A função logout já lida com a limpeza
        logout();
      }
    }
    // A remoção da navegação para /login aqui evita loops indesejados
    // A navegação deve ser gerenciada por rotas protegidas
  }, [token, navigate]);

  const login = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken); // << MODIFICADO: Atualiza o estado do token
    setIsAuthenticated(true);
    navigate("/home");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null); // << MODIFICADO: Limpa o estado do token
    setIsAuthenticated(false);
    navigate("/login");
  };

  // << MODIFICADO: Incluído 'token' no valor do provider
  const value = { isAuthenticated, token, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};