FROM node:8 AS build

ADD package.json /tmp/package.json
ADD yarn.lock /tmp/yarn.lock
RUN cd /tmp && yarn install
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/

WORKDIR /app
COPY . ./
RUN yarn install
RUN yarn build

FROM nginx:alpine

COPY docker/config/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
