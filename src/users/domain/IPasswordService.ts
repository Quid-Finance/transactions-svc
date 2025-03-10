export const PASSWORD_SERVICE_TOKEN = 'PASSWORD_SERVICE';

export interface IPasswordService {
  hash(password: string): string;
}
