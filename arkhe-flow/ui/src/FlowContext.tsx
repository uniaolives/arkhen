
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FlowContextType {
  isExecuting: boolean;
  setIsExecuting: (val: boolean) => void;
  lastProof: string | null;
  setLastProof: (val: string | null) => void;
}

const FlowContext = createContext<FlowContextType | undefined>(undefined);

export const FlowProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isExecuting, setIsExecuting] = useState(false);
  const [lastProof, setLastProof] = useState<string | null>(null);

  return (
    <FlowContext.Provider value={{ isExecuting, setIsExecuting, lastProof, setLastProof }}>
      {children}
    </FlowContext.Provider>
  );
};

export const useFlow = () => {
  const context = useContext(FlowContext);
  if (!context) throw new Error('useFlow must be used within a FlowProvider');
  return context;
};
