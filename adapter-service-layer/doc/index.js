const graph = require('./graph/graph');

const docs = {
    openapi: "3.0.3",
    info: {
        title: "Graph Adapter Service Layer",
        description: "Graph Adapter Service Layer for CryptoDashboard",
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
            Graph: {
                type: "string",
                format: "binary",
            },
            ChartJs: {
                type: "object",
                properties: {
                    type: {
                        type: "string"
                    },
                    datasets: {
                        type: "array",
                        items: {
                            Dataset: {
                                type: "object",
                                properties: {
                                    type: {
                                        type: "string",
                                    },
                                    label: {
                                        type: "string"
                                    },
                                    data: {
                                        type: "array",
                                    }
                                }
                            }
                        }
                    },
                    options: {
                        type: "object",
                        properties: {
                            plugins: {
                                type: "object",
                                properties: {
                                    annotation: {
                                        type: "object",
                                        properties: {
                                            annotations: {
                                                type: "array",
                                                items: {
                                                    Annotation: {
                                                        type: "object"
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
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
            GraphResponse: {
                description: "Graph retrieved",
                content: {
                    "image/png": {
                        schema: {
                            $ref: "#/components/schemas/Graph"
                        }
                    }
                }
            }
        },
        securitySchemes: {
            api_key: {
                type: "apiKey",
                name: "Authorization",
                in: "header"
            },
        }
    },
    paths: {
        ...graph
    }
}

module.exports = docs;