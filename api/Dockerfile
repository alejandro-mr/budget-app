FROM php:fpm-alpine as api_php

RUN apk add --no-cache --virtual libzip-dev zlib-dev

# Installing php extensions
RUN docker-php-ext-configure zip --with-libzip
RUN docker-php-ext-install pdo_mysql zip

# Copying composer binary from composer docker image.
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
ENV COMPOSER_ALLOW_SUPERUSER=1
RUN composer global require "hirak/prestissimo:^0.3" --prefer-dist --no-progress --no-suggest --classmap-authoritative; composer clear-cache

WORKDIR /srv/api

# Installing vendor libraries on running container.
COPY composer.json composer.lock ./
RUN composer install --prefer-dist --no-dev --no-autoloader --no-scripts --no-progress --no-suggest; composer clear-cache

COPY . ./

CMD ["php-fpm"]

FROM nginx:alpine as api_nginx

COPY docker/config/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

WORKDIR /srv/api

COPY --from=api_php /srv/api/public public/
