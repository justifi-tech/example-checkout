import configJson from './config.json';

export function getConfig() {
  return {
    clientId: configJson.clientId,
    serverDomain: configJson.serverDomain,
    sellerAccountId: configJson.sellerAccountId
  };
}

