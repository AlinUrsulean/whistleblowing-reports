import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@whistleblowing.com' },
    update: {},
    create: {
      email: 'admin@whistleblowing.com',
      password: hashedPassword,
      name: 'System Administrator',
      role: 'ADMIN',
    },
  });

  // Create investigator
  const investigator = await prisma.user.upsert({
    where: { email: 'investigator@whistleblowing.com' },
    update: {},
    create: {
      email: 'investigator@whistleblowing.com',
      password: hashedPassword,
      name: 'Chief Investigator',
      role: 'INVESTIGATOR',
    },
  });

  // Create regular user
  const user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      password: hashedPassword,
      name: 'John Doe',
      role: 'USER',
    },
  });

  // Create sample report
  await prisma.report.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'Financial Irregularities in Department X',
      description: 'Observed suspicious transactions and potential misuse of funds in the accounting department.',
      category: 'Financial',
      status: 'PENDING',
      isAnonymous: false,
      reporterId: user.id,
    },
  });

  console.log('Seeding completed successfully!');
  console.log({ admin, investigator, user });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
