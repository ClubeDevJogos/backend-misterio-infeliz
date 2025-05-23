import { configDotenv } from "dotenv"

configDotenv()

const databaseConfig = {
    username: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    dialect: process.env.DB_DIALECT as 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql',
    schema: process.env.DB_SCHEMA
}

export default databaseConfig