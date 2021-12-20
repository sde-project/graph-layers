const graph = {
    "/graph": {
        post: {
            tags: ["Graph"],
            description: "Generate graph",
            requestBody: {
                description: "Chart.js graph definition",
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/ChartJs"
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
