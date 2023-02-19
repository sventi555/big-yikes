interface Environment {
  auth: {
    auth0Audience: string;
    auth0ClientId: string;
    auth0Domain: string;
  };
  hosts: {
    api: string;
  };
}

declare global {
  // eslint-disable-next-line no-var
  var ENV: Environment;
}

/**
 * Extracts config values from process in dev and from the environment.js file in production.
 * Note: Vite will only include variables that are prefixed with CLIENT_ in the built application.
 * Please add any updates to `./server/entrypoint.sh`, `./.env.example`, and here.
 */
const config =
  globalThis.ENV ||
  ({
    auth: {
      auth0Audience:
        import.meta.env.VITE_AUTH0_AUDIENCE || 'https://api.bigyikes.ca',
      auth0ClientId:
        import.meta.env.VITE_AUTH0_CLIENT_ID ||
        'tS3GvrFqCYfvb6sDB3W4TeiJo2UcPIat',
      auth0Domain: import.meta.env.VITE_AUTH0_DOMAIN || 'sventico.auth0.com',
    },
    hosts: {
      api: import.meta.env.VITE_API_HOST || '/api',
    },
  } as Environment);

export default config;
