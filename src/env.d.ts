declare namespace NodeJS {
  /** Merge declaration with `process` in order to override the global-scoped env. */
  export interface ProcessEnv {
    /**
     * Built-in environment variable.
     * @see Docs https://github.com/chihab/ngx-env#ng_app_env.
     */
    readonly NG_APP_API_KEY: string;
    readonly NG_APP_AUTH_DOMAIN: string;
    readonly NG_APP_PROJECT_ID: string;
    readonly NG_APP_STORAGE_BUCKET: string;
    readonly NG_APP_MESSAGING_SENDERID: string;
    readonly NG_APP_APP_ID: string;
    readonly NG_APP_MEASUREMENT_ID: string;
    readonly NG_APP_FIREBASE_DB_URL: string;

    // Add your environment variables below
  }
}
