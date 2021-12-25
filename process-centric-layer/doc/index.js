const graph = require('./graph/graph');

const docs = {
    openapi: "3.0.3",
    info: {
        title: "Graphs Process Centric Service Layer",
        description: "Graphs Process Centric Service Layer for CryptoDashboard",
        version: "1.0.0",
        contact: {
            name: "Luca De Menego",
            email: "luca.demenego@studenti.unitn.it",
        },
    },
    servers: [
        {
            url: "http://localhost:8000/",
            description: "Local server",
        }
    ],
    security: [
        {
            api_key: []
        }
    ],
    components: {
        schemas: {
            GeneralError: {
                type: "object",
                properties: {
                    error: {
                        type: "string"
                    }
                }
            },
            News: {
                type: "object",
                properties: {
                    title: {
                        type: "string"
                    },
                    content: {
                        type: "string"
                    },
                    publishedAt: {
                        type: "string"
                    },
                    source: {
                        type: "string"
                    },
                    sentiment: {
                        type: "number"
                    },

                }
            },
            ArrayOfNews: {
                type: "array",
                items: {
                    $ref: "#/components/schemas/News"
                }
            }
        },
        responses: {
            NotFound: {
                description: "Entity not found.",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/GeneralError"
                        }
                    }
                }
            },
            IllegalInput: {
                description: "Illegal input for operation.",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/GeneralError"
                        }
                    }
                }
            },
            Unauthorized: {
                description: "Unauthorized to access the resource.",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/GeneralError"
                        }
                    }
                }
            },
            ServerError: {
                description: "Server Error",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/GeneralError"
                        }
                    }
                }
            },
        },
        securitySchemes: {
            api_key: {
                type: "apiKey",
                name: "Authorization",
                in: "header"
            },
        },
        parameters: {
            CurrencyPath: {
                name: "currency",
                in: "path",
                schema: {
                    type: "string"
                }
            },
            FromDate: {
                name: "from",
                in: "query",
                schema: {
                    type: "string"
                },
                required: true
            },
            ToDate: {
                name: "to",
                in: "query",
                schema: {
                    type: "string"
                },
                required: true
            }
        }
    },
    paths: {
        ...graph
    }
}

module.exports = docs;