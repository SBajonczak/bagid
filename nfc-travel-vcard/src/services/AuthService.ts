import * as msal from "@azure/msal-browser";

// Azure B2C configuration
const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_AZURE_B2C_CLIENT_ID || "",
    authority: process.env.REACT_APP_AZURE_B2C_AUTHORITY || "",
    redirectUri: window.location.origin,
    postLogoutRedirectUri: window.location.origin,
    navigateToLoginRequestUrl: true,
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
};

// MSAL instance
const msalInstance = new msal.PublicClientApplication(msalConfig);

// Authentication requests
const loginRequest = {
  scopes: ["openid", "profile", "email"],
};

export interface AuthUser {
  displayName?: string;
  email?: string;
  userId: string;
  idToken?: string;
  accessToken?: string;
}

class AuthService {
  private currentUser: AuthUser | null = null;

  constructor() {
    // Handle redirect promise on page load
    msalInstance.handleRedirectPromise().then(this.handleResponse).catch(console.error);
    
    // Check if user is already logged in
    const accounts = msalInstance.getAllAccounts();
    if (accounts.length > 0) {
      this.setUserFromAccount(accounts[0]);
    }
  }

  private handleResponse = (response: msal.AuthenticationResult | null): void => {
    if (response && response.account) {
      this.setUserFromAccount(response.account);
    }
  };

  private setUserFromAccount(account: msal.AccountInfo): void {
    const claims = account.idTokenClaims as any;
    
    this.currentUser = {
      displayName: claims.name,
      email: claims.emails?.[0] || claims.email,
      userId: account.localAccountId,
      idToken: account.idToken,
    };
  }

  public async login(): Promise<AuthUser | null> {
    try {
      await msalInstance.loginRedirect(loginRequest);
      return null; // This will redirect, so nothing will execute after this
    } catch (error) {
      console.error("Login failed", error);
      return null;
    }
  }

  public logout(): void {
    msalInstance.logout();
  }

  public async getAccessToken(): Promise<string | null> {
    try {
      const accounts = msalInstance.getAllAccounts();
      if (accounts.length === 0) return null;
      
      const request = {
        scopes: ["openid", "profile", "email"],
        account: accounts[0],
      };
      
      const response = await msalInstance.acquireTokenSilent(request);
      return response.accessToken;
    } catch (error) {
      console.error("Error getting access token", error);
      return null;
    }
  }

  public isAuthenticated(): boolean {
    return msalInstance.getAllAccounts().length > 0;
  }

  public getCurrentUser(): AuthUser | null {
    if (this.currentUser) return this.currentUser;
    
    const accounts = msalInstance.getAllAccounts();
    if (accounts.length > 0) {
      this.setUserFromAccount(accounts[0]);
      return this.currentUser;
    }
    
    return null;
  }
}

export const authService = new AuthService();
export default authService;
