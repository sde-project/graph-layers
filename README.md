# graph-layers
Generate graphs of news + exchanges

### Adapter Service Layer
The API used to generate the graph images is quickchart.io.
One only route is exposed:
- `/graph`: generate png of the provided graph

The graph configuration must be written following the chart.js specification.

The API documentation can be found under `/api-docs`.

### Business Logic Layer
The chart.js configuration for our graph is created based on the provided news and exchanges.
**Two routes** are exposed:
- `/graph/image`: get the png of the graph;
- `/graph/configuration`: get the chart.js configuration of the graph.

The API documentation can be found under `/api-docs`.