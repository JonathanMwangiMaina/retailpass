import { PrismaClient } from '@prisma/client';
import pg from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new pg.Pool({ connectionString: process.env.SUPABASE_DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const users = await prisma.user.findMany({
  where: {
    email: {
      in: ['admin@retailpass.com', 'vendor@retailpass.com', 'customer@retailpass.com']
    }
  },
  select: {
    id: true,
    email: true,
    name: true,
    role: true,
    emailVerified: true,
    createdAt: true
  },
  orderBy: {
    createdAt: 'asc'
  }
});

console.log('\n=== USERS IN DATABASE ===\n');
users.forEach((user, index) => {
  console.log(`${index + 1}. ${user.role} - ${user.name} (${user.email})`);
  console.log(`   ID: ${user.id}`);
  console.log(`   Created: ${user.createdAt.toISOString()}`);
  console.log(`   Email Verified: ${user.emailVerified}`);
  console.log('');
});

console.log(`Total users: ${users.length}\n`);

await prisma.$disconnect();
await pool.end();
