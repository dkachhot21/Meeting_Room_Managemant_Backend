const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Meeting Management API",
            version: "1.0.0",
            description: "APIs to manage meetings and users",
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Development server",
            },
        ],
        components: {
            schemas: {
                User: {
                    type: "object",
                    properties: {
                        id: {
                            type: "string",
                            description: "The unique identifier of the user.",
                        },
                        username: {
                            type: "string",
                            description: "The username of the user.",
                        },
                        email: {
                            type: "string",
                            format: "email",
                            description: "The email address of the user.",
                        },
                        role: {
                            type: "string",
                            description: "The role of the user.",
                        },
                    },
                },
            },
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    in: 'header',
                    name: 'Authorization',
                    description: 'Bearer Token',
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        // security: [
        //     {
        //         bearerAuth: [],
        //     },
        // ],
    },
    apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);

module.exports = { specs, swaggerUi };
