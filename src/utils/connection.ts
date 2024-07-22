import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: 5432, // PostgreSQL default port
    dialect: "postgres",
    dialectOptions: {
        prependSearchPath: true,
    },
    define: {
        schema: "testing",
    },
});

export default sequelize;
