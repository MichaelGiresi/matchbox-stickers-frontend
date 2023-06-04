import { OktaAuth } from '@okta/okta-auth-js'


const oktaAuth = new OktaAuth ({

    
    issuer: 'https://dev-28096334.okta.com/oauth2/default',
    clientId: '0oa9siomocTY4nllB5d7',
    redirectUri: 'http://localhost:3000/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    
}) 

export default oktaAuth;