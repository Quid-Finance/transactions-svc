export interface EnvironmentVariables {
  NODE_ENV: 'development' | 'nonprod' | 'production' | 'test';
  DATABASE_NAME: string;
  DATABASE_HOST: string;
  DATABASE_USERNAME: string;
  DATABASE_PASSWORD: string;
  DATABASE_PORT?: number;
}
