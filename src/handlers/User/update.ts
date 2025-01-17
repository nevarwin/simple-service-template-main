import type { APIGatewayProxyStructuredResultV2, Handler } from "aws-lambda";
import User from "../../models/user-model";

export const handler: Handler = async (
    event
): Promise<APIGatewayProxyStructuredResultV2> => {
    const id = event.pathParameters.id;
    const { name, email, password } = JSON.parse(event.body);

    try {
        const userList = await User.update(
            { name: name, email: email, password: password },
            {
                where: {
                    id: id,
                },
            }
        );

        if (!userList.length) {
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
                data: `Updated name: ${name}, email: ${email}, password: ${password}`,
                message: "User updated",
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
