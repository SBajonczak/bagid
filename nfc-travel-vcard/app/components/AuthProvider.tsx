'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as msal from "@azure/msal-browser";

interface AuthContextType {
  isAuthenticated: boolean;
  user: msal.AccountInfo | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  getToken: () => Promise<string>;
  isInitializing: boolean;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: async () => {},
  logout: async () => {},
  getToken: async () => '',
  isInitializing: true,
});

export const useAuth = () => useContext(AuthContext);

// MSAL Configuration for Azure B2C
const msalConfig: msal.Configuration = {
  auth: {
    clientId: '2e08ce02-4722-4efe-b6de-c98b201907ab',
    authority: 'https://bagtagauth.b2clogin.com/bagtagauth.onmicrosoft.com/B2C_1_susi',
    knownAuthorities: ['bagtagauth.b2clogin.com'],
    redirectUri: typeof window !== 'undefined' ? window.location.origin : '',
    postLogoutRedirectUri: typeof window !== 'undefined' ? window.location.origin : '',
    navigateToLoginRequestUrl: true,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: true,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level: msal.LogLevel, message: string, containsPii: boolean) => {
        if (containsPii) return;
        switch (level) {
          case msal.LogLevel.Error:
            console.error(message);
            return;
          case msal.LogLevel.Info:
            console.info(message);
            return;
          case msal.LogLevel.Verbose:
            console.debug(message);
            return;
          case msal.LogLevel.Warning:
            console.warn(message);
            return;
        }
      },
      piiLoggingEnabled: false,
      logLevel: msal.LogLevel.Warning,
    }
  }
};

let msalInstance: msal.PublicClientApplication | null = null;
let initializationPromise: Promise<void> | null = null;

const getMsalInstance = () => {
  if (!msalInstance && typeof window !== 'undefined') {
    msalInstance = new msal.PublicClientApplication(msalConfig);
  }
  return msalInstance;
};

const initializeMsal = async () => {
  if (!initializationPromise) {
    initializationPromise = (async () => {
      const instance = getMsalInstance();
      if (instance) {
        await instance.initialize();
      }
    })();
  }
  return initializationPromise;
};

const tokenRequest = {
  scopes: ["openid", "profile"],
  extraQueryParameters: {
    domain_hint: 'bagtagauth.onmicrosoft.com'
  }
};

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<msal.AccountInfo | null>(null);
  const [isInitializing, setIsInitializing] = useState<boolean>(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setIsInitializing(true);
        
        // Initialize MSAL first
        await initializeMsal();
        
        const instance = getMsalInstance();
        if (!instance) return;

        // MSAL handles both query params and hash fragments automatically
        // Always call handleRedirectPromise() to check for auth callbacks
        try {
          const response = await instance.handleRedirectPromise();
          if (response) {
            console.log("Successfully handled redirect response", response);
            setIsAuthenticated(true);
            setUser(response.account);
            localStorage.setItem('user_info', JSON.stringify(response.account));
            localStorage.setItem('auth_token', response.idToken || '');
            
            // Clean URL by removing hash fragment
            window.history.replaceState({}, document.title, window.location.pathname);
            
            // Dispatch custom event for auth state change
            window.dispatchEvent(new Event('auth_state_changed'));
          }
        } catch (err) {
          console.error("Error handling redirect:", err);
        }
        
        // Check for existing accounts
        const accounts = instance.getAllAccounts();
        if (accounts.length > 0) {
          console.log("Found existing account", accounts[0]);
          setIsAuthenticated(true);
          setUser(accounts[0]);
          
          try {
            const tokenResponse = await instance.acquireTokenSilent({
              ...tokenRequest,
              account: accounts[0]
            });
            console.log("Token acquired silently");
            localStorage.setItem('auth_token', tokenResponse.idToken || '');
          } catch (err) {
            console.warn("Silent token acquisition failed:", err);
          }
        }
      } catch (error) {
        console.error("Error during auth initialization:", error);
      } finally {
        setIsInitializing(false);
      }
    };
    
    initializeAuth();
  }, []);

  const login = async () => {
    await initializeMsal();
    const instance = getMsalInstance();
    if (instance) {
      instance.loginRedirect(tokenRequest);
    }
  };

  const logout = async () => {
    await initializeMsal();
    const instance = getMsalInstance();
    if (!instance) return;

    const accounts = instance.getAllAccounts();
    if (accounts.length > 0) {
      try {
        instance.logoutRedirect({
          account: accounts[0]
        });
      } catch (err) {
        console.error("Error during logout:", err);
      }
    }
    
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_info');
    setIsAuthenticated(false);
    setUser(null);
  };

  const getToken = async (): Promise<string> => {
    try {
      await initializeMsal();
      const instance = getMsalInstance();
      if (!instance) return '';

      const accounts = instance.getAllAccounts();
      if (accounts.length === 0) {
        console.warn("No accounts found when trying to get token");
        return '';
      }
      
      const response = await instance.acquireTokenSilent({
        ...tokenRequest,
        account: accounts[0]
      });
      
      return response.idToken || '';
    } catch (error) {
      console.error("Error acquiring token:", error);
      try {
        await initializeMsal();
        const instance = getMsalInstance();
        if (!instance) return '';
        
        const response = await instance.acquireTokenPopup(tokenRequest);
        return response.idToken || '';
      } catch (popupError) {
        console.error("Failed to get token via popup:", popupError);
        return '';
      }
    }
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    getToken,
    isInitializing
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
