import React, { createContext, useState } from 'react';

// Contexte pour le jeton d'authentification
export const TokenContext = createContext();

// Contexte pour le nom d'utilisateur
export const UsernameContext = createContext();

// Provider pour le jeton
export const TokenProvider = ({ children }) => { 
  const [token, setToken] = useState(null); // Valeur par défaut
  return (
    <TokenContext.Provider value={[token, setToken]}>
      {children}
    </TokenContext.Provider>
  );
};

// Provider pour le nom d'utilisateur
export const UsernameProvider = ({ children }) => {
  const [username, setUsername] = useState(null); // Valeur par défaut
  return (
    <UsernameContext.Provider value={[username, setUsername]}>
      {children}
    </UsernameContext.Provider>
  );
};
