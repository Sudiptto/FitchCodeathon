import React, { createContext, useState, ReactNode } from 'react';

interface UserContextType {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

export const UserContext = createContext<UserContextType>({
  email: '',
  setEmail: () => {},
});

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [email, setEmail] = useState<string>('');

  return (
    <UserContext.Provider value={{ email, setEmail }}>
      {children}
    </UserContext.Provider>
  );
};