import type { APIGatewayProxyStructuredResultV2, Handler } from "aws-lambda";
import { DataTypes, Sequelize } from "sequelize";

export const handler: Handler = async (
  event
): Promise<APIGatewayProxyStructuredResultV2> => {
  const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD } = process.env;
  const id = event.pathParameters.id;
  //   const name = JSON.parse(event.body);

  const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: "mysql",
  });

  sequelize.authenticate();

  const users = sequelize.define(
    "Users",
    {
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "users_tb",
      timestamps: false,
    }
  );

  const useLists = await users.findAll({
    where: {
      id: id,
      //   name: name,
    },
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      data: useLists,
    }),
  };
};
