<!-- इस स्क्रिप्ट टैग को उन पेजों पर रखें जहाँ auth चाहिए -->
<script src="https://cdn.auth0.com/js/auth0-spa-js/1.13/auth0-spa-js.production.js"></script>
<script>
  // Global auth object
  let auth0Client = null;
  let appConfig = null;

  async function loadConfig() {
    if (appConfig) return appConfig;
    const res = await fetch('/auth_config.json', { cache: 'no-store' });
    appConfig = await res.json();
    return appConfig;
  }

  async function initAuth0() {
    const cfg = await loadConfig();
    auth0Client = await createAuth0Client({
      domain: cfg.domain,
      clientId: cfg.clientId,
      authorizationParams: {
        redirect_uri: cfg.authorizationParams.redirect_uri,
        audience: cfg.authorizationParams.audience, // optional
        scope: cfg.authorizationParams.scope || 'openid profile email'
      },
      cacheLocation: 'memory', // can change to 'localstorage' if needed
      useRefreshTokens: true
    });
    return auth0Client;
  }

  async function login() {
    const cfg = await loadConfig();
    await auth0Client.loginWithRedirect({
      authorizationParams: {
        redirect_uri: cfg.authorizationParams.redirect_uri,
        // आप चाहें तो यहाँ 'appState' के जरिए post-login redirect maintain कर सकते हैं
      }
    });
  }

  async function logout() {
    const cfg = await loadConfig();
    auth0Client.logout({ logoutParams: { returnTo: cfg.logoutParams.returnTo } });
  }

  async function getUser() {
    try {
      return await auth0Client.getUser();
    } catch {
      return null;
    }
  }

  async function isAuthenticated() {
    try {
      return await auth0Client.isAuthenticated();
    } catch {
      return false;
    }
  }

  function isAdmin(user, allowList) {
    const email = (user && user.email || '').toLowerCase();
    return allowList.map(e => e.toLowerCase()).includes(email);
  }

  // Common render helpers (optional)
  function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text || '';
  }
</script>
