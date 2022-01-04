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
            url: "https://cryptodashboard.it/",
            description: "Production server",
        },
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
            GraphConfiguration: {
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
            Graph: {
                description: "PNG of the graph",
                content: {
                    "binary": {
                        schema: {
                            $ref: "#/components/schemas/Graph"
                        }
                    }
                }
            },
            GraphConfiguration: {
                description: "Chart.js configuration of the graph",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/GraphConfiguration"
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
        },
        parameters: {
            Currency: {
                name: "currency",
                in: "query",
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
            },
            TypeOfExchange: {
                name: "exchange",
                in: "query",
                schema: {
                    type: "array",
                    items: {
                        type: "string"
                    }
                },
            }
        }
    },
    paths: {
        ...graph
    }
}

module.exports = docs;