# graph-layers
Generate graphs of news + exchanges

### Adapter Service Layer
The API used to generate the graph images is quickchart.io.
One only route is exposed:
- `/graph`: generate png of the provided graph

The graph configuration must be written following the chart.js specification.

The API documentation can be found under `/api-docs` - port 9100 if run with docker-compose.

### Business Logic Layer
The chart.js configuration for our graph is created based on the provided news and exchanges.
**Two routes** are exposed:
- `/graph/image`: get the png of the graph, given news and exchanges;
- `/graph/configuration`: get the chart.js configuration of the graph, given news and exchanges.

The API documentation can be found under `/api-docs` - port 9101 if run with docker-compose.

### Process Centric Layer
A graph is created based on data taken from the business logics on exchanges and news.
**Two routes** are exposed:
- `/graph/image`: get the png of the graph, given dates, cryptocurrency and source exchanges;
- `/graph/configuration`: get the chart.js configuration of the graph, given dates, cryptocurrency and source exchanges.

The API documentation can be found under `/api-docs` - port 9102 if run with docker-compose.