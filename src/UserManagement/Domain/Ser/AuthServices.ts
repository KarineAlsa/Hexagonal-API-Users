export interface AuthServices {
    generateToken(userId: string): string;
    addToBlacklist(token: string): Promise<void>;
    isTokenRevoked(token: string): Promise<boolean>;
  }