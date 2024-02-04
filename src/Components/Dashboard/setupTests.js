// setupTests.js
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

// Mock store configuration
const mockStore = configureStore({
    
});

global.mockStore = mockStore;
global.Provider = Provider; // Include Provider in the global scope for convenience
