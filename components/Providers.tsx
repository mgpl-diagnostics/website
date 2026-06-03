'use client';

import { BookTestProvider } from '@/context/BookTestContext';
import BookTestDialog from '@/components/BookTestDialog';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <BookTestProvider>
      {children}
      <BookTestDialog />
    </BookTestProvider>
  );
}
