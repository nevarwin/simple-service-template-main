import type { APIGatewayProxyStructuredResultV2, Handler } from "aws-lambda";
import { sequelize } from "../../utils/connection";
import Project from "../../models/project-model";

export const handler: Handler = async (
  event
): Promise<APIGatewayProxyStructuredResultV2> => {
  const id = event.pathParameters.id;

  try {
    await sequelize.sync();
    const projectList = await Project.destroy({
      where: {
        id: id,
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        data: projectList,
        message: "Project deleted",
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
