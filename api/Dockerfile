FROM php:fpm-alpine as api_php

RUN apk add --no-cache mysql-client
RUN apk add --no-cache --virtual php-build-deps libzip-dev zlib-dev

# Installing php extensions
RUN docker-php-ext-configure zip --with-libzip
RUN docker-php-ext-install pdo_mysql zip

RUN runDeps="$(scanelf --needed --nobanner --format '%n#p' --recursive /usr/local/lib/php/extensions | tr ',' '\n' | sort -u | awk 'system("[ -e /usr/local/lib/" $1 " ]") == 0 { next } { print "so:" $1 }')" \
apk add --no-cache --virtual .api-phpexts-rundeps $runDeps

RUN apk del php-build-deps
# Copying composer binary from composer docker image.
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
ENV COMPOSER_ALLOW_SUPERUSER=1
RUN composer global require "hirak/prestissimo:^0.3" --prefer-dist --no-progress --no-suggest --classmap-authoritative; composer clear-cache

WORKDIR /srv/api

# build for production
ARG APP_ENV=prod

# Installing vendor libraries on running container.
COPY composer.json composer.lock ./
RUN composer install --prefer-dist --no-dev --no-autoloader --no-scripts --no-progress --no-suggest; composer clear-cache

COPY . ./

RUN chmod +x bin/console
COPY docker/entrypoint/docker-entypoint.sh /usr/local/bin/docker-entrypoint
RUN chmod +x /usr/local/bin/docker-entrypoint

ENTRYPOINT ["docker-entrypoint"]
CMD ["php-fpm"]

FROM nginx:alpine as api_nginx

COPY docker/config/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

WORKDIR /srv/api

COPY --from=api_php /srv/api/public public/
