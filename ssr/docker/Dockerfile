FROM node:14
MAINTAINER Pereskokov Vladislav (v.pereskokov@ivpa.ru)

ARG BUILD
ARG VERSION

RUN apt-get update -y && \
    apt-get install -y nginx supervisor && \
    chown -R www-data:www-data /var/lib/nginx && \
    rm -rf /var/www/html/* && mkdir -p /var/www/html/ && \
    rm -rf /var/lib/apt/lists/*

COPY ./etc/supervisord/app.conf /etc/supervisor/conf.d/
COPY ./ /var/www/html/

WORKDIR /var/www/html
RUN npm run init && \
    echo "APP_VERSION=${VERSION}" > .env && \
    npm run build:production && \
    echo "${VERSION}" > .version && \
    rm -rf @types client docker etc scripts server webpack www certs && \
