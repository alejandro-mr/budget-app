#!/bin/sh
set -e

if [ "$1" = 'php-fpm' ] || [ "$1" = 'bin/console' ]; then
    >&2 echo "Waiting for MariaDB to be ready..."
    while ! mysqladmin ping -h"$DB_HOST" --silent; do
        sleep 1
    done
    bin/console doctrine:migrations:migrate --no-interaction
fi

exec docker-php-entrypoint "$@"
