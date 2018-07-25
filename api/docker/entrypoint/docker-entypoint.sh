#!/bin/sh
set -e

if [ "$1" = 'php-fpm' ] || [ "$1" = 'bin/console' ]; then
    until pg_isready --timeout=0 --dbname="${DATABASE_URL}"; do
		    sleep 1
    done

    bin/console doctrine:migrations:migrate --no-interaction
fi

exec docker-php-entrypoint "$@"
