# Budget Demo App

Demo budget app that allows us to register daily expenses (with filtering  and more actions), built using AngularJS and Symfony 4.

This demo app is intended to demonstrate the following:

- AngularJs frontend, component based with ES6 support.
- AngularJs Material design implementation with responsive design.
- Symfony 4 backend. 
- mariadb database, with migrations included.
- Authentication (using JWT, and restrinting access to resources with user credentials).
- REST API with JSON based communication between frontend and backend.
- Docker based applications for the frontend (`/client`), backend (`/api`) and database (mariadb image `/db_data`).

---

## How to run

Since the application is using docker-compose, only one command is required to start it.

from the project directory run:

```bash
docker-compose up
```

The project consist of three different services (running on docker containers), and everyone of them can be started separately:

- `client` a AngularJS application running on `nginx:alpine` docker image, built with webpack, and ES6 support through babeljs.
  start command:
  ```bash
  docker-compose up client
  ```
- `api` Symfony 4 based REST API, running on `nginx:alpine`, with a PHP processing through `php:fpm-alpine`.
  start command:
  ```bash
  docker-compose up api
  ```
  - `db-data` (Not included in repository) This directory is used to persist the DB data directory used by `mariadb:latest` running container.
  start command:
  ```bash
  docker-compose up db
  ```

---

## Technical details

The client application will be bounded to port `80` of the host environemnt, and API will be on `8080`, mariadb will be running on port `3306`, those ports should be available as a prerequisitie, before starting the applications.

Bases application requirements:

- Frontend (`/client`):
  - AngularJS (1.7.2)
  - uirouter/AngularJS (^1.0)
  - Angular-Material (^1.1.10)
  - Webpack
  - Babel
  - Docker images:
    - node:8 (build step)
    - nginx:alpine (Server)
  - Ports:
    - 80
  
- Backend (`/api`)
  - Symfony 4
  - Doctrine
  - FOSRestBundle (REST API)
  - JMS/Serializer (Doctrine entities JSON representation)
  - nelmio/cors-bundle
  - lexik/jwt-authentication-bundle (JWT token generation from Doctrine User entity)
  - Docker images:
    - php:fpm-alpine (PHP files processing)
    - doctrine:latets (Used to install dependencies at build time)
    - nginx:alpine (Server)
  - Ports:
    - 8080

- Database (`/db-data`)
  - MariaDB
  - Docker images:
    - mariadb:latest
  - Ports:
    - 3306



  

