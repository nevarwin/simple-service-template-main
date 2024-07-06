import type {
    APIGatewayProxyStructuredResultV2,
    APIGatewayProxyEventV2,
    Handler,
} from 'aws-lambda';
import { DataTypes, Sequelize } from 'sequelize';

export const handler: Handler = async (
    event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyStructuredResultV2> => {
    const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD } = process.env;
    const { name } = JSON.parse(event.body);

    const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
        host: DB_HOST,
        dialect: 'mysql',
    });

    sequelize.authenticate();

    const users = sequelize.define(
        'Users',
        {
            name: {
                type: DataTypes.STRING,
            },
        },
        {
            tableName: 'users_tb',
            timestamps: false,
        }
    );

    await users.create({
        name,
    });

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: `name: ${name}`,
        }),
    };
};
