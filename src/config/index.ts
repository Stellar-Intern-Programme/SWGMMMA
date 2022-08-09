export const dev: boolean = process.env.NODE_ENV !== 'production';

export const server: string = !dev
  ? 'http://10.0.2.2:9999'
  : 'https://messaging-app-intern.herokuapp.com';
