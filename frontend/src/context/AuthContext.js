import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('prascy-admin');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(!!user);

  useEffect(() => {
    if (user) {
      localStorage.setItem('prascy-admin', JSON.stringify(user));
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('prascy-admin');
      setIsAuthenticated(false);
    }
  }, [user]);

  const login = (credentials) => {
    // Mock login - in production would validate against backend
    if (credentials.email === 'admin@prascy.pl' && credentials.password === 'admin123') {
      const adminUser = {
        id: '1',
        email: credentials.email,
        name: 'Administrator',
        role: 'admin',
        avatar: null
      };
      setUser(adminUser);
      return { success: true, user: adminUser };
    }
    return { success: false, error: 'Nieprawidłowe dane logowania' };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};
