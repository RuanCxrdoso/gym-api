import 'dotenv/config'
import z from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string(),
  PORT: z.coerce.number().default(3333),
  NODE_ENV: z.enum(['production', 'development', 'test']).default('production'),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.log('Environment varialbles error :/ ', z.treeifyError(_env.error))

  throw new Error('Environment varialbles error :/ ')
}

export const env = _env.data
