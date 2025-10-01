# Prisma Setup Guide

This project now uses Prisma as the ORM for database operations. Here's how to set it up and use it.

## Setup Steps

### 1. Environment Configuration
Create a `.env` file in your project root with the following content:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/whistleblowing_reports?schema=public"
NODE_ENV="development"
```

Replace `username`, `password`, and database details with your actual PostgreSQL credentials.

### 2. Database Setup
Make sure you have PostgreSQL running, then run:
```bash
# Push the schema to your database (for development)
pnpm prisma:db:push

# OR create and apply a migration (for production)
pnpm prisma:migrate

# Generate Prisma Client
pnpm prisma:generate
```

### 3. Seed the Database (Optional)
To populate your database with initial data:
```bash
pnpm prisma:seed
```

## Available Scripts

- `pnpm prisma:generate` - Generate Prisma Client
- `pnpm prisma:db:push` - Push schema changes to database (development)
- `pnpm prisma:migrate` - Create and apply migrations (production)
- `pnpm prisma:migrate:deploy` - Apply migrations (production deployment)
- `pnpm prisma:studio` - Open Prisma Studio (database browser)
- `pnpm prisma:seed` - Seed the database with initial data

## Database Schema

### User Model
- `id` - Auto-incrementing primary key
- `email` - Unique email address
- `name` - Optional user name
- `role` - USER, ADMIN, or INVESTIGATOR
- `createdAt` - Timestamp when created
- `updatedAt` - Timestamp when last updated
- `reports` - Relation to reports created by this user

### Report Model
- `id` - Auto-incrementing primary key
- `title` - Report title
- `description` - Report description
- `category` - Report category
- `status` - PENDING, UNDER_INVESTIGATION, RESOLVED, or REJECTED
- `isAnonymous` - Whether the report is anonymous
- `createdAt` - Timestamp when created
- `updatedAt` - Timestamp when last updated
- `reporterId` - Foreign key to User (nullable for anonymous reports)
- `reporter` - Relation to the user who created the report

## Usage in Services

The `PrismaService` is available globally and can be injected into any service:

```typescript
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SomeService {
  constructor(private prisma: PrismaService) {}

  async findUsers() {
    return this.prisma.user.findMany();
  }
}
```

## Next Steps

1. Set up your PostgreSQL database
2. Configure your `.env` file
3. Run `pnpm prisma:db:push` to create the database schema
4. Run `pnpm prisma:seed` to populate with initial data
5. Start developing with Prisma!

For more information, visit the [Prisma Documentation](https://www.prisma.io/docs/).
