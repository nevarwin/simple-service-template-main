import type {
    APIGatewayProxyStructuredResultV2,
    APIGatewayProxyEventV2,
    Handler,
} from "aws-lambda";
import Project from "../../models/project-model";

export const handler: Handler = async (
    event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyStructuredResultV2> => {
    const id = event.pathParameters.id;
    const { title, description } = JSON.parse(event.body);

    try {
        await Project.create({
            title,
            description,
            user_id: id,
        });
        return {
            statusCode: 201,
            body: JSON.stringify({
                data: `Project created by: ${id} ,Project title: ${title}, description: ${description}`,
                message: "Project created successfully",
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
