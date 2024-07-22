import type { APIGatewayProxyStructuredResultV2, Handler } from "aws-lambda";
import db from "../../models/associations";

export const handler: Handler = async (
    event
): Promise<APIGatewayProxyStructuredResultV2> => {
    const id = event.pathParameters.id;

    try {
        const userList = await db.User.findAll({
            where: {
                id: id,
            },
        });

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
