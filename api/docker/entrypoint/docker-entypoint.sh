#!/bin/sh
set -e

if [ "$1" = 'php-fpm' ] || [ "$1" = 'bin/console' ]; then
    if [ "$APP_ENV" != 'prod' ]; then
        composer install --prefer-dist --no-progress --no-suggest --no-interaction

        >&2 echo "Waiting for MariaDB to be ready..."
        while ! mysqladmin ping -h"$DB_HOST" --silent; do
            sleep 1
        done
        bin/console doctrine:migrations:migrate --no-interaction
    fi
fi

exec docker-php-entrypoint "$@"
