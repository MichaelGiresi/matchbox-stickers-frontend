import React, { useEffect, useRef } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import OktaSignIn from '@okta/okta-signin-widget';

const config = {
  baseUrl: 'https://dev-28096334.okta.com',
  clientId: '0oa9siomocTY4nllB5d7',
  redirectUri: 'http://localhost:3000/login/callback',
  authParams: {
    issuer: 'https://dev-28096334.okta.com/oauth2/default',
    pkce: true,
  },
};

const Login = () => {
  const { oktaAuth } = useOktaAuth();
  const widgetRef = useRef();

  useEffect(() => {
    if (!widgetRef.current) return;

    const widget = new OktaSignIn(config);

    widget.showSignInAndRedirect({
      el: widgetRef.current,
    })
      .catch((err) => {
        throw err;
      });

    return () => widget.remove();
  }, [oktaAuth]);

  return <div ref={widgetRef} />;
};

export default Login;
