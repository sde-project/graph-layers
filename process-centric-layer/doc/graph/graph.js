const graph = {
    "/graph": {
        get: {
            tags: ["Graph", "News", "Exchanges"],
            description: "Get graphs",
            parameters: [
                {
                    $ref: "#/components/parameters/Number"
                }
            ],
            responses: {
                200: {
                    $ref: "#/components/responses/xxx"
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
