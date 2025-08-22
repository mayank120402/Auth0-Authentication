# Auth0 + Vercel (HTML + JS)

## 1) Auth0 ऐप सेटअप
1. Auth0 Dashboard → Applications → Create Application → **Single Page Web App (SPA)**.
2. Settings में URLs set करें:
   - **Allowed Callback URLs**:
     - `http://localhost:3000/callback.html`
     - `https://YOUR-PROJECT.vercel.app/callback.html`
   - **Allowed Logout URLs**:
     - `http://localhost:3000/`
     - `https://YOUR-PROJECT.vercel.app/`
   - **Allowed Web Origins**:
     - `http://localhost:3000`
     - `https://YOUR-PROJECT.vercel.app`
3. Save Changes. (Preview/branch URLs के लिए जरूरत पड़े तो extra URLs add करें.)

Docs: Callback/Logout allow-lists.  
https://auth0.com/docs/quickstart/spa/vanillajs/01-login  
https://auth0.com/docs/authenticate/login/redirect-users-after-login

## 2) Local dev
```bash
# कोई भी static server use कर सकते हैं; Vercel CLI भी चलेगा:
npm i -g vercel
vercel dev  # http://localhost:3000
