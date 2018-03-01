======================
cookiecutter-django111
======================

Plantilla de `Cookiecutter <https://cookiecutter.readthedocs.io/>`__ para
proyectos con Django 1.11.

Dependencias
------------

* Python 3, pip y `virtualenvwrapper <https://virtualenvwrapper.readthedocs.io/en/latest/>`__
* `Cookiecutter <https://cookiecutter.readthedocs.io/en/latest/installation.html>`__
* Instalar Node LTS y npm mediante `nvm <https://github.com/creationix/nvm#install-script>`__
* Firefox para los test E2E. Hace falta instalar `geckodriver <https://github.com/mozilla/geckodriver/releases>`__ en el PATH (en macOS basta con `brew install geckodriver`).
* `Editorconfig <http://editorconfig.org/#download>`__ para mantener coherencia en el sangrado
  del código.
* Librerías de desarrollo del sistema operativo. Por ejemplo, en Ubuntu, para usar Postgres como
  base de datos hay que tener instalada la librería pyscopg2 ::

    apt-get build-dep pyscopg2

  Con esto se instalará todo lo necesario para compilar pyscopg2 y podremos compilar la extensión
  de python en nuestro entorno virtual. Lo mismo sucede para lxml, etc.

Instalación y puesta en marcha
------------------------------

#. Instalar plantilla ::

    cookiecutter https://gitlab9.dtibcn.cat/plantilles/cookiecutter-django111

#. Preparar virtualenv Python ::

    cd appname
    mkvirtualenv "appname" -p python3 -a ./src
    cd ..
    pip install -r requirements/local.txt


#. Preparar entorno Javascript ::

    npm install


#. Crear configuración local ::

    cd src
    cp app.ini.template app.ini
    # Revisar y modificar app.ini, al menos la sección de base de datos.

#. Crear base de datos ::

    python manage.py migrate
    python manage.py createsuperuser

#. Arancar servidor de desarrollo y tests ::

    python manage.py runserver
    # Con el runserver en marcha, abrir otra terminal en el mismo virtualenv y
    # directorio src y ejecutar.
    pytest
    # Si algún test funcional de Splinter falla se guardará un pantallazo del
    # navegador en src/tests_failures.


=============
Funcionalidad
=============

La mayoría de la funcionalidad se puede deducir leyendo el *app.ini* y el
*settings.py*. A continuación se explica las partes más importantes.


requirements.txt
----------------

Los requirements de Python se han dividido en varios archivos:

* requirements/base.txt
    Dependencias comunes que se necesitan en todos los entornos.
* requirements/production.txt
    Dependencias que solo se necesitan entornos de prod. Incluye base.txt.
* requirements/local.txt
    Dependencias para entornos de desarrollo. Incluye base.txt y tests.txt.
* requirements/test.txt
    Dependencias para ejecutar los tests. No incluye a ningún otro archivo.
* requirements.txt:
    Solo incluye production.txt para mantener compatibilidad con los PaaS.

Conviene repasar las versiones puestas por si ha salido alguna versión nueva con
correcciones de seguridad.


Probar estáticos, compress offline y 404 sin DEBUG
--------------------------------------------------

El proyecto incluye el servidor `WhiteNoise <http://whitenoise.evans.io/>`__
para servir estáticos sin DEBUG. Para usarlo hay que:

#. Modificar el app.ini ::

    DEBUG = False
    COMPRESS_ENABLED = True
    COMPRESS_OFFLINE = True
    ENABLE_WHITENOISE = True

#. Generar estáticos offline (importante ejecutarlos en este orden) ::

    python manage.py compress
    python manage.py collectstatic

#. Arrancar el servidor ::

    python manage.py runserver

En http://localhost:8000 se verá la página con los estáticos comprimidos y en una url
que no exista se verá la página de 404 también con los estáticos comprimidos.

**Es muy importante hacer este paso antes de subir a producción para comprobar
que no falla la generación ni la carga de estáticos offline.**


Less y Babel
------------

El proyecto viene configurado por defecto con soporte para `Less <http://lesscss.org/>`__ y
`Babel <https://babeljs.io/>`__. Las versiones instalades están en el archivo *package.json*.

Para que se procesen los estáticos con Less hay que ponerlos con ``type="text/less"`` y para Babel
con ``type="text/babel"``. Ejemplo::

    <link type="text/less" rel="stylesheet" href="{% static 'main/css/main.less' %}">
    <script type="text/babel" src="{% static 'main/js/main.js' %}"></script>

Babel nos permite usar el `último Javascript <https://babeljs.io/docs/learn-es2015/>`__ sin
preocuparnos de la compatibilidad con los navegadores. Por defecto está configurado para dar
soporte a a las `últimas novedades estables <http://babeljs.io/docs/plugins/preset-latest/>`__
pero se puede cambiar su comportamiento en el arhivo *.babelrc*.

**Nota**: Babel solo es un transpilador, para tener un entorno 100% compatible con es2015 hace
falta un polyfill que implemente algunos métodos que no se pueden emular transpilando.
Para usar el polyfill basta con incluirlo en el template base antes de cualquier otro .js.
https://babeljs.io/docs/usage/polyfill/


Tests
-----

El proyecto viene preparado para hacer tests con `pytest <http://docs.pytest.org/>`__ y
`Splinter <http://splinter.readthedocs.io/>`__. También está configurado para que pase el
`Flake8 <http://flake8.pycqa.org/>`__ y falle si no se cumplen sus reglas básicas.

Toda la configuración de pytest y flake8 está en el archivo *src/main/setup.cfg*.

El proyecto incluye algunos tests básicos de ejemplo en *src/main/tests*.

Ejemplos de ejecución:

* ``pytest`` lanza todos los tests.
* ``pytest -s`` lanza todos los tests y se detendrá si encuentra algún punto de ruptura.
* ``pytest -m unit_test`` ejecuta solo los tests unitarios.
* ``pytest -m integration_test`` ejecuta solo los tests de integración (acceso a APIs, BDs...).
* ``pytest -m functional_test`` ejecuta solo los tests funcionales (abren un navegador).
* ``pytest -m "not functional_test"`` ejecuta todos los tests menos los funcionales.
* ``pytest --markers`` lista todo los markers.

``unit_test``, ``integration_test`` y ``functional_test`` son
`markers <http://doc.pytest.org/en/latest/example/markers.html>`__ definidos en el *setup.cfg* y
usados en los tests.


Base de datos de tests
----------------------

Por defecto la base de datos para los tests es una sqlite en memoria (la opción más rápida).

En el app.ini se encuentra comentada una configuración para usar bases de test::

    TEST_DATABASE_USER      = user
    TEST_DATABASE_ENGINE    = postgresql
    TEST_DATABASE_HOST      = host
    TEST_DATABASE_NAME      = {{cookiecutter.appname}}_test_db
    TEST_DATABASE_PASSWORD  = 1234

En caso de no usar sqlite para los tests, en el setup.cfg está configurado para que se reutilice
la BD sin destruirse y sin ejecutar migraciones (hace autoinspect de modelos para crearla la
primera vez).

Si los requisitos de BD de los tests son muy especiales y no basta con el *app.ini*, al final
del *settings.py* está la clase ``Test`` que permite sobreescribir la conf de BD para los tests.


Emails
------

Django Yubin ya viene configurado de serie. Antes de salir a prod revisar que las direcciones de
envío de emails estén bien configuradas para evitar problemas de bloqueos de spam.


Tareas periódicas con cron
--------------------------

Se configuran en el archivo *src/main/crons.yml*.

Los cron dependen del mecanismo de despliegue, en nuestro caso el *doploy*, la sintaxis de los
comandos se encuentra en el propio archivo.

healtcheck
----------

En `health` se define los health checks que la aplicación debe hacer para mostrar sus estado. Esta librería
permite obtener la información en formato json y html y escribir nuestros propios healtchecks sobreescribiendo
las clases de la librería. Estan activados los healtchecks más básicos de base de datos y caché.

La librería utilizada es *django-health-check*

Uno de los helthchecks básicos instalados es `health_check.cache`. Éste requiere tener un sistema de cache configurado.
En el app.ini viene preconfigurada la cache de redis::

    CACHE_TYPE              = redis
    REDIS_HOST              = localhost
    CACHE_REDIS_DB          = 0
    REDIS_PORT              = 6379
    CACHE_MAX_ENTRIES       = 10000
    CACHE_TIMEOUT           = 3600
    CACHE_PREFIX            = {{cookiecutter.appname}}

En tal caso hay que tener en cuenta que este helthcheck necesita una versión 3.x.y de *redis-server*.


robots.txt
----------

El proyecto viene configurado para que toda la web sea indexable. Se puede cambiar vía admin.


Google Analytics
----------------

Ya viene incluído en el template base. Se puede configurar el tracking code en el django-constance
desde el admin.


Ley de cookies
--------------

El proyecto incluye un banner de aviso de cookies. Se puede cambiar su template creando uno
nuevo en *cookielaw/banner.html* en una aplicación que cargue antes que cookielaw, por ejemplo,
en main.

Actualización y mantenimiento
=============================

Una vez arrancado el proyecto conviene verificar que no haya versiones más modernas de las librerías utilizadas
y de Django. ::

    pip list -o 

En caso que las haya conviene actualizar el cookiecutter con las nuevas librerías.
