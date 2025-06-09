import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const existingAdmin = await prisma.user.findUnique({ where: { email: 'superadmin@example.com' } });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('supersecurepassword', 10);
    await prisma.user.create({
      data: {
        name: 'Super Admin',
        email: 'superadmin@example.com',
        phone: '8859509277',
        password: hashedPassword,
        role: Role.SUPERADMIN,
      },
    });
    console.log('Super Admin user created!');
  } else {
    console.log('Super Admin already exists');
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
