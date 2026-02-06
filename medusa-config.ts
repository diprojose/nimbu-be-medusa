import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

const STORE_CORS = process.env.STORE_CORS || "http://localhost:3000"
const AUTH_CORS = process.env.AUTH_CORS || "http://localhost:3000"
const ADMIN_CORS = process.env.ADMIN_CORS || "http://localhost:9000"

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    // @ts-ignore: Esta propiedad es necesaria para Supabase aunque TS no la reconozca
    database_extra: { 
      ssl: { rejectUnauthorized: false } 
    },
    databaseDriverOptions: {
      connection: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    },
    http: {
      storeCors: STORE_CORS,
      adminCors: ADMIN_CORS,
      authCors: AUTH_CORS,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  },
  modules: [
    {
      resolve: "./modules/blog",
    },
  ],
  admin: {
    disable: true, 
  }
})
