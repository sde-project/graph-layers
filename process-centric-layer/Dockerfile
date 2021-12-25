FROM node:12-alpine3.14
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD npm run start
ENV GRAPH_BUSINESS_HOST=http://graph-business-logic:9101
EXPOSE 8000