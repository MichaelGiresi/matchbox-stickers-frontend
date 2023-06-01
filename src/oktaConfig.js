export default {
    oidc: {
        clientID: '0oa9siomocTY4nllB5d7',
        issuer: 'https://dev-28096334.okta.com/oauth2/default',
        redirectUri: 'http://localhost:3000/login/callback',
        scopes: ['openid', 'profile', 'email'],
        pkce: true,
    },
};