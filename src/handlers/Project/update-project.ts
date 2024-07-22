import type { APIGatewayProxyStructuredResultV2, Handler } from "aws-lambda";
import Project from "../../models/project-model";

export const handler: Handler = async (
    event
): Promise<APIGatewayProxyStructuredResultV2> => {
    const user_id = event.pathParameters.user_id;
    const id = event.pathParameters.id;
    const { title, description } = JSON.parse(event.body);

    try {
        const projectList = await Project.update(
            { title: title, description: description },
            {
                where: {
                    user_id: user_id,
                    id: id,
                },
            }
        );

        if (!projectList.length) {
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
                data: `Updated title: ${title}, description: ${description}`,
                message: "Project successfully updated",
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
