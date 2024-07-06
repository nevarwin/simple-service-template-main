import type { APIGatewayProxyStructuredResultV2, Handler } from 'aws-lambda';
import { DataTypes, Sequelize } from 'sequelize';

export const handler: Handler =
    async (event): Promise<APIGatewayProxyStructuredResultV2> => {
        const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD } = process.env;
        const requestBody = JSON.parse(event.body);
        const {id} = requestBody;
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

        const useLists = await users.destroy({
            where: {
                id: id,
            },
        });

        return {
            statusCode: 200,
            body: JSON.stringify({
                data: useLists,
            }),
        };
    };
