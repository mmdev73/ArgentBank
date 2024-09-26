import { useEffect, useState } from 'react';
import store from '../app/store';

export const useInitialized = () => {
  const state = store.getState()
  const [isInitialized, setIsInitialized] = useState(state.auth.initialized);
  useEffect(() => {
    setIsInitialized(state.auth.initialized);
  }, [state.auth.initialized]);
  return isInitialized;
} 