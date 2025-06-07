import React, { createContext, useContext, useState, useEffect } from 'react';
import * as msal from "@azure/msal-browser";
import authService from './services/AuthService';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
  login: () => void;
  logout: () => void;
  getToken: () => Promise<string>;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
  getToken: async () => '',
});

export const useAuth = () => useContext(AuthContext);

// Properly configure MSAL for B2C with improved state handling
const msalConfig = {
  auth: {
    clientId: '2e08ce02-4722-4efe-b6de-c98b201907ab',
    authority: 'https://bagtagauth.b2clogin.com/bagtagauth.onmicrosoft.com/B2C_1_susi',
    knownAuthorities: ['bagtagauth.b2clogin.com'],
    redirectUri: window.location.origin,
    postLogoutRedirectUri: window.location.origin,
    navigateToLoginRequestUrl: true,
  },
  cache: {
    cacheLocation: 'sessionStorage', // Changed to sessionStorage which often has better compatibility with redirects
    storeAuthStateInCookie: true,    // Set to true to help with state preservation across redirects
  },
  system: {
    loggerOptions: {
      loggerCallback: (level: msal.LogLevel, message: string, containsPii: boolean) => {
        if (containsPii) {
          return;
        }
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
      logLevel: msal.LogLevel.Verbose,
    }
  }
};

// Create a single instance of MSAL
const msalInstance = new msal.PublicClientApplication(msalConfig);

// B2C policy configuration for token requests
const tokenRequest = {
  scopes: ["openid", "profile"],
  extraQueryParameters: {
    domain_hint: 'bagtagauth.onmicrosoft.com'
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<any | null>(null);
  const [isInitializing, setIsInitializing] = useState<boolean>(true);

  useEffect(() => {
    // Check if this page load is part of a redirect callback
    const urlParams = new URLSearchParams(window.location.search);
    const errorDesc = urlParams.get("error_description");
    const code = urlParams.get("code");
    const state = urlParams.get("state");
    const isRedirectCallback = code && state;
    
    // Handle redirect and initialize authentication state
    const initializeAuth = async () => {
      try {
        setIsInitializing(true);
        
        // If there's an error in the URL, log it
        if (errorDesc) {
          console.error("Auth error from redirect:", errorDesc);
          setIsInitializing(false);
          return;
        }
        
        // Handle redirect if this is a response from auth server
        if (isRedirectCallback) {
          try {
            // Process the response from the redirect
            const response = await msalInstance.handleRedirectPromise();
            
            if (response) {
              console.log("Successfully handled redirect response");
              setIsAuthenticated(true);
              setUser(response.account);
              
              // Store account info if needed
              localStorage.setItem('user_info', JSON.stringify(response.account));
              localStorage.setItem('auth_token', response.idToken || '');
            } 
          } catch (err) {
            console.error("Error handling redirect:", err);
            // Clear any partial state that might be causing issues
            sessionStorage.removeItem(`msal.${msalConfig.auth.clientId}.client.info`);
            sessionStorage.removeItem(`msal.${msalConfig.auth.clientId}.idtoken`);
          }
        }
        
        // Check if user is already logged in - do this regardless of redirect
        const accounts = msalInstance.getAllAccounts();
        if (accounts.length > 0) {
          console.log("Found existing account, attempting to get token silently");
          setIsAuthenticated(true);
          setUser(accounts[0]);
          
          try {
            // Try to get a token silently to verify the session is still valid
            await msalInstance.acquireTokenSilent({
              ...tokenRequest,
              account: accounts[0]
            });
          } catch (err) {
            console.warn("Silent token acquisition failed:", err);
            // Don't reset authenticated state here, let the user continue
            // They can retry or logout explicitly if needed
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

  const login = () => {
    authService.login();
  };

  const logout = () => {
    // Log out from Azure B2C
    const accounts = msalInstance.getAllAccounts();
    if (accounts.length > 0) {
      try {
        msalInstance.logoutRedirect({
          account: accounts[0]
        });
      } catch (err) {
        console.error("Error during logout:", err);
      }
    }
    
    // Clear local state
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_info');
    setIsAuthenticated(false);
    setUser(null);
  };

  const getToken = async (): Promise<string> => {
    try {
      const accounts = msalInstance.getAllAccounts();
      if (accounts.length === 0) {
        console.warn("No accounts found when trying to get token");
        return '';
      }
      
      const response = await msalInstance.acquireTokenSilent({
        ...tokenRequest,
        account: accounts[0]
      });
      
      return response.idToken || '';
    } catch (error) {
      console.error("Error acquiring token:", error);
      // Fallback to interactive login if silent token acquisition fails
      try {
        const response = await msalInstance.acquireTokenPopup({
          ...tokenRequest
        });
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
    getToken
  };

  // Show a simple loading state if still initializing
  if (isInitializing) {
    return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
