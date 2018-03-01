#!/bin/bash

set -e

case $1 in
    gunicorn)
        python manage.py migrate --noinput
        exec gunicorn main.wsgi -b 0.0.0.0:8000 -w 4
        ;;
    *)
        exec "$@"
        ;;
esac
