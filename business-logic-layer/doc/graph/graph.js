const graph = {
    "/graph": {
        post: {
            tags: ["Graph"],
            description: "Generate graph",
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
    }
}

module.exports = graph;
