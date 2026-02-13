import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Check if test user exists
  const existingUser = await prisma.user.findUnique({
    where: { email: 'test@example.com' },
  })

  if (!existingUser) {
    const user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        name: 'Test User',
      },
    })
    console.log('✅ Created test user:', user)
  } else {
    console.log('ℹ️ Test user already exists')
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })