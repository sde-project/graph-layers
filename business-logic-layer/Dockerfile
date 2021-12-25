FROM node:12-alpine3.14
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD npm run start
ENV ADAPTER_HOST=http://graph-adapter:9100
EXPOSE 8000