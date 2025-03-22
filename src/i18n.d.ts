import 'i18next';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: {
        welcome: string;
        description: string;
        button: {
          submit: string;
          cancel: string;
        };
      };
    };
  }
}