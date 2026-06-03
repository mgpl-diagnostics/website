'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface BookTestContextType {
  isOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
}

const BookTestContext = createContext<BookTestContextType | null>(null);

export function BookTestProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <BookTestContext.Provider
      value={{
        isOpen,
        openDialog: () => setIsOpen(true),
        closeDialog: () => setIsOpen(false),
      }}
    >
      {children}
    </BookTestContext.Provider>
  );
}

export function useBookTest() {
  const ctx = useContext(BookTestContext);
  if (!ctx) throw new Error('useBookTest must be inside BookTestProvider');
  return ctx;
}
