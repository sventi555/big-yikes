#!/usr/bin/env bash

# Construct an up to date environment.js file
echo "window.ENV = {
  \"auth\": {
    \"auth0Audience\": \"$VITE_AUTH0_AUDIENCE\",
    \"auth0ClientId\": \"$VITE_AUTH0_CLIENT_ID\",
    \"auth0Domain\": \"$VITE_AUTH0_DOMAIN\"
  },
  \"hosts\": {
    \"api\": \"$VITE_API_HOST\";
  }
};" > /usr/share/nginx/html/environment.js;

envsubst '${PORT}' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf

# Transfer control to nginx to begin serving files
nginx -g "daemon off;"
