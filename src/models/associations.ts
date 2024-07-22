import User from "./user-model";
import Project from "./project-model";
import sequelize from "../utils/connection";

User.hasMany(Project);

const db = {
    sequelize,
    User,
    Project,
};

db.sequelize
    .authenticate()
    .then(async () => {
        console.log("Connection has been established successfully.");
        await db.sequelize.sync({ alter: true }); // Use alter: true to update tables to match the models
        console.log("All models were synchronized successfully.");
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });

export default db;
