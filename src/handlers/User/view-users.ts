import type { APIGatewayProxyStructuredResultV2, Handler } from "aws-lambda";
import { sequelize } from "../../utils/connection";
import User from "../../models/user-model";

export const handler: Handler =
  async (): Promise<APIGatewayProxyStructuredResultV2> => {
    try {
      await sequelize.sync();
      const userList = await User.findAll({});

      if (userList.length === 0) {
        return {
          statusCode: 404,
          body: JSON.stringify({
            message: "User not found",
          }),
        };
      }

      return {
        statusCode: 200,
        body: JSON.stringify({
          data: userList,
          message: "User found",
        }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: error.message,
        }),
      };
    }
  };
