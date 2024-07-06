import type {
  APIGatewayProxyStructuredResultV2,
  APIGatewayProxyEventV2,
  Handler,
} from "aws-lambda";
import User from "../models/user-model";
import { sequelize } from "../utils/connection";

export const handler: Handler = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyStructuredResultV2> => {
  const { name, email, password } = JSON.parse(event.body);

  try {
    await sequelize.sync();
    await User.create({
      name,
      email,
      password,
    });
    return {
      statusCode: 201,
      body: JSON.stringify({
        data: `Created name: ${name}, email: ${email}, password: ${password}`,
        message: "User created successfully",
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
