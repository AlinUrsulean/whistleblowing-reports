export class User {
  id: number;
  email: string;
  name?: string;
  role: 'USER' | 'ADMIN' | 'INVESTIGATOR';
  createdAt: Date;
  updatedAt: Date;
}
