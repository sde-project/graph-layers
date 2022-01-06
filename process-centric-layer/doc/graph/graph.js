const graph = {
    "/graph/image": {
        get: {
            tags: ["Graph"],
            description: "Get png of the graph",
            parameters: [
                {
                    $ref: "#/components/parameters/Currency"
                },
                {
                    $ref: "#/components/parameters/FromDate"
                },
                {
                    $ref: "#/components/parameters/ToDate"
                },
                {
                    $ref: "#/components/parameters/Operation"
                },
                {
                    $ref: "#/components/parameters/TypeOfExchange"
                }
            ],
            responses: {
                200: {
                    $ref: "#/components/responses/Graph"
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
        get: {
            tags: ["Graph"],
            description: "Get graph chart.js configuration",
            parameters: [
                {
                    $ref: "#/components/parameters/Currency"
                },
                {
                    $ref: "#/components/parameters/FromDate"
                },
                {
                    $ref: "#/components/parameters/ToDate"
                },
                {
                    $ref: "#/components/parameters/Operation"
                },
                {
                    $ref: "#/components/parameters/TypeOfExchange"
                }
            ],
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
