import type { APIGatewayProxyStructuredResultV2, Handler } from 'aws-lambda';
import { DataTypes, Sequelize } from 'sequelize';

export const handler: Handler =
    async (): Promise<APIGatewayProxyStructuredResultV2> => {
        const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD } = process.env;
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

        const useLists = await users.findAll({
            where: {
                name: 'Sugoi',
            },
        });

        return {
            statusCode: 200,
            body: JSON.stringify({
                data: useLists,
            }),
        };
    };
