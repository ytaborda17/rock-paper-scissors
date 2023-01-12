export const environment = {
  showSideMenu: false,
  production: false,
  firebase: {
    apiKey: process.env['NG_APP_API_KEY'],
    authDomain: process.env['NG_APP_AUTH_DOMAIN'],
    projectId: process.env['NG_APP_PROJECT_ID'],
    storageBucket: process.env['NG_APP_STORAGE_BUCKET'],
    messagingSenderId: process.env['NG_APP_MESSAGING_SENDERID'],
    appId: process.env['NG_APP_APP_ID'],
    measurementId: process.env['NG_APP_MEASUREMENT_ID'],
  }
};