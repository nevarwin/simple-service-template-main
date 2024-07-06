import type { APIGatewayProxyStructuredResultV2, Handler } from "aws-lambda";
import User from "../../models/user-model";
import { sequelize } from "../../utils/connection";

export const handler: Handler = async (
  event
): Promise<APIGatewayProxyStructuredResultV2> => {
  const { id } = event.pathParameters.id;

  try {
    await sequelize.sync();
    const userList = await User.destroy({
      where: {
        id: id,
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        data: userList,
        message: "User deleted",
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: error.message,
      }),
    };
  } finally {
    await sequelize.close();
  }
};
