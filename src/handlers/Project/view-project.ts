import type { APIGatewayProxyStructuredResultV2, Handler } from "aws-lambda";
import Project from "../../models/project-model";

export const handler: Handler = async (
    event
): Promise<APIGatewayProxyStructuredResultV2> => {
    const user_id = event.pathParameters.user_id;

    try {
        const projectList = await Project.findAll({
            where: {
                user_id: user_id,
            },
        });

        if (projectList.length === 0) {
            return {
                statusCode: 404,
                body: JSON.stringify({
                    message: "Project not found",
                }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({
                data: projectList,
                message: "Project found",
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
