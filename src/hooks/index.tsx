import React from 'react';

import { AuthProvider } from './auth';
import { KeyboardProvider } from './keyboard';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <KeyboardProvider>{children}</KeyboardProvider>
  </AuthProvider>
);

export default AppProvider;
