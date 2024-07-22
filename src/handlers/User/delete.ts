import type { APIGatewayProxyStructuredResultV2, Handler } from "aws-lambda";
import User from "../../models/user-model";

export const handler: Handler = async (
    event
): Promise<APIGatewayProxyStructuredResultV2> => {
    const id = event.pathParameters.id;

    try {
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
    }
};
