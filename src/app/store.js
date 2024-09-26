import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/authSlicer'


const loadFromLocalStorage = () => {
  try {
    const serializedState = sessionStorage.getItem('authState');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState)
  } catch (e) {
    console.warn("Error loading from localStorage", e)
    return undefined
  }
};

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: loadFromLocalStorage(),
})

export default store
export { loadFromLocalStorage }