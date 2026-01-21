import 'dotenv/config'
import { prisma } from 'lib/prisma.js'
import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import { type Environment } from 'vitest/environments'

function generateDatabaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable.')
  }

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schema)

  return url.toString()
}

export default <Environment>{
  name: 'prisma',
  viteEnvironment: 'ssr',
  setup() {
    const schema = randomUUID()
    const newDatabaseURL = generateDatabaseURL(schema)

    console.log(newDatabaseURL)

    process.env.DATABASE_URL = newDatabaseURL

    execSync('pnpm dlx prisma db push')

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        )

        await prisma.$disconnect()
      },
    }
  },
}
