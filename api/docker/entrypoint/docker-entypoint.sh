#!/bin/sh
set -e

if [ "$1" = 'php-fpm' ] || [ "$1" = 'bin/console' ]; then
    bin/console doctrine:migrations:migrate --no-interaction
fi

exec docker-php-entrypoint "$@"
