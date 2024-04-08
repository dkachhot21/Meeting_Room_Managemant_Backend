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
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                        email: { type: 'string', format: "email" },
                        role: { type: 'string' },
                    },
                },
                Meeting: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        title: { type: 'string' },
                        userId: { type: 'string' },
                        email: { type: 'string' },
                        startTime: { type: 'string', format: 'date-time' },
                        endTime: { type: 'string', format: 'date-time' },
                        creatorId: { type: 'string' },
                    },
                    required: ['title', 'userId', 'startTime', 'endTime'],
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
    },
    // security: [
    //     {
    //         bearerAuth: [],
    //     },
    // ],
    apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);

module.exports = { specs, swaggerUi };
