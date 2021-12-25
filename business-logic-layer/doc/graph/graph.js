const graph = {
    "/graph/image": {
        post: {
            tags: ["Graph"],
            description: "Generate graph png",
            requestBody: {
                description: "Chart.js graph generation",
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/GraphRequest"
                        }
                    }
                }
            },
            responses: {
                200: {
                    $ref: "#/components/responses/GraphResponse"
                },
                400: {
                    $ref: "#/components/responses/IllegalInput"
                },
                401: {
                    $ref: "#/components/responses/Unauthorized"
                },
                500: {
                    $ref: "#/components/responses/ServerError"
                }
            }
        }
    },
    "/graph/configuration": {
        post: {
            tags: ["Graph"],
            description: "Generate graph configuration",
            requestBody: {
                description: "Chart.js graph configuration",
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/GraphRequest"
                        }
                    }
                }
            },
            responses: {
                200: {
                    $ref: "#/components/responses/GraphConfiguration"
                },
                400: {
                    $ref: "#/components/responses/IllegalInput"
                },
                401: {
                    $ref: "#/components/responses/Unauthorized"
                },
                500: {
                    $ref: "#/components/responses/ServerError"
                }
            }
        }
    }
}

module.exports = graph;
