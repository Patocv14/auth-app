import { hashSync, genSaltSync, compareSync } from 'bcryptjs';

export class BcryptAdapter {
  static hash(password: string): string {
    return hashSync(password);
  }

  static compare(password: string, hash: string): boolean {
    return compareSync(password, hash);
  }
}
