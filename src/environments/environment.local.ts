import { KeycloakOptions } from 'keycloak-angular';

const keycloakOptions: KeycloakOptions = {
  config: {
    url: 'http://localhost:8080/auth',
    realm: 'gantry',
    clientId: 'dashboard'
  },
  initOptions: {
    onLoad: 'login-required',
    checkLoginIframe: false
  },
  enableBearerInterceptor: true,
  bearerExcludedUrls: ['/assets']
}

export const environment = {
  production: false,
  keycloakOptions: keycloakOptions,
  userManagementRestApi: 'http://localhost:8081'
};
