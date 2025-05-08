#!/bin/sh -e

target=".env"

if [ ! -f $target ]; then
 echo "Creating '$target' with development environment variables."
 echo "Please check it and populate all missing variables."

 echo '# Created automatically by "scripts/setup-env.sh"
NODE_ENV=development
APP_ID=
DATABASE_NAME=service_template_db
DATABASE_HOST=127.0.0.1
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgrespw
' >$target
else
 echo "It appears you already have a '$target'"
fi
