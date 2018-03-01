#!/bin/bash

set -e

case $1 in
    devel)
        python manage.py migrate --noinput
        exec python manage.py runserver 0.0.0.0:8000
        ;;
    *)
        exec "$@"
        ;;
esac
