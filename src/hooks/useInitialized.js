import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { store } from '../app/store';

export const useInitialized = () => {
  const state = store.getState()
  const [isInitialized, setIsInitialized] = useState(state.auth.initialized);
  useEffect(() => {
    setIsInitialized(state.auth.initialized);
  }, [state.auth.initialized]);
  return isInitialized;
}