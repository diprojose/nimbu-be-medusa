import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

const STORE_CORS = process.env.STORE_CORS || "http://localhost:8000,http://localhost:3000"

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    // @ts-ignore: Esta propiedad es necesaria para Supabase aunque TS no la reconozca
    database_extra: { 
      ssl: { rejectUnauthorized: false } 
    },
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  },
  modules: [
    {
      resolve: "./modules/blog",
    },
  ],
})
