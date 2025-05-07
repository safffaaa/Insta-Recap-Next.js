'use client';

import { Provider } from 'react-redux';
import { store } from '../store/store';
import { useEffect, useState } from 'react';

export default function Providers({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything until we're on the client side
  if (!mounted || !store) {
    return null;
  }

  return <Provider store={store}>{children}</Provider>;
} 