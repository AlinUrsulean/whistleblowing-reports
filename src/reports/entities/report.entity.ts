export class Report {
  id: number;
  title: string;
  description: string;
  category: string;
  status: 'PENDING' | 'UNDER_INVESTIGATION' | 'RESOLVED' | 'REJECTED';
  isAnonymous: boolean;
  createdAt: Date;
  updatedAt: Date;
  reporterId?: number;
}
