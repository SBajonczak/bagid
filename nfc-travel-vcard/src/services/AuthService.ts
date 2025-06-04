import { logger } from "@/utils/logger";

import * as msal from "@azure/msal-browser";

// Get environment variables from window._env_ (for runtime) or process.env (for build time)

// Azure B2C tenant and policy information
const tenant = "bagtagauth";
const policy = "B2C_1_susi";
const redirecturi= "https://www.bagtag.de"
//const redirecturi= "http://localhost:3000";
// Azure B2C configuration
const msalConfig = {
    auth: {
        clientId: "2e08ce02-4722-4efe-b6de-c98b201907ab",

        // Correct format for Azure B2C authority URL - no oauth2/v2.0/authorize part
        authority: `https://${tenant}.b2clogin.com/${tenant}.onmicrosoft.com/${policy}`,

        // Add knownAuthorities to fix the "not a trusted authority" error
        knownAuthorities: [`${tenant}.b2clogin.com`],
        redirectUri: `http://localhost:3000`, // Ensure this matches your Azure B2C configuration
        // redirectUri: `${redirecturi}`,
        postLogoutRedirectUri: window.location.origin,
        navigateToLoginRequestUrl: true,
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: false,
    },
    system: {
        // This is important - set it to "OIDC" to use ID tokens instead of access tokens
        tokenRenewalOffsetSeconds: 300, // Renew token 5 minutes before expiry
        allowRedirectInIframe: true
    }
};

// Log configuration for debugging (remove in production)
console.log('MSAL Config (without sensitive data):', {
    redirectUri: msalConfig.auth.redirectUri,
    hasClientId: !!msalConfig.auth.clientId,
    authority: msalConfig.auth.authority,

    knownAuthorities: msalConfig.auth.knownAuthorities
});

// MSAL instance
const msalInstance = new msal.PublicClientApplication(msalConfig);

// Authentication requests with appropriate scope for ID tokens
const loginRequest = {
    scopes: ["openid", "profile", "email"],
    // Don't attempt to get access tokens for API access from the client directly
    // This is what's triggering the client_secret requirement
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
            if (!msalConfig.auth.clientId) {
                console.error("Azure B2C client ID is not configured");
                return null;
            }

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

    public async getIdToken(): Promise<string | null> {
        try {
            logger.info("Requesting access token silently...");
            const accounts = msalInstance.getAllAccounts();
            if (accounts.length === 0) return null;

            const silentRequest = {
                ...loginRequest,
                account: accounts[0]
            };

            const result = await msalInstance.acquireTokenSilent(silentRequest);
            logger.info("Access token acquired successfully");  
            logger.debug("Access token details:", {
                accessToken: result.idToken,
            });
            return result.idToken || null;
        } catch (error) {
            console.error("Error getting ID token:", error);
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
